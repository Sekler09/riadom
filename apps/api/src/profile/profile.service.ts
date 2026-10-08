import { Transactional, TransactionHost } from '@nestjs-cls/transactional';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { Profile } from '@repo/contracts/profile';
import { profile } from '@repo/db/schema';
import { eq, sql } from 'drizzle-orm';
import { User } from 'src/auth/create-auth';
import { type DbAdapter } from 'src/db/database.module';
import { takeFirstOrThrow } from 'src/db/utils/take-first';
import { OnboardUserDto } from 'src/onboarding/dto/onboard-user.dto';
import { StorageService } from 'src/storage/storage.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly txHost: TransactionHost<DbAdapter>,
    private readonly usersService: UsersService,
    private readonly storageService: StorageService,
  ) {}

  @Transactional()
  async onboardUser(userId: User['id'], dto: OnboardUserDto): Promise<Profile> {
    const [user] = await this.usersService.onboardUser(userId);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const rows = await this.txHost.tx
      .insert(profile)
      .values({
        ...dto,
        userId,
      })
      .returning({
        id: profile.id,
        name: profile.name,
        birthDate: profile.birthDate,
        avatarUrl: sql`${profile.avatarKey}`.mapWith((v: string) =>
          this.storageService.getPublicReadUrl(v),
        ),
      });

    return takeFirstOrThrow(rows);
  }

  async getUserProfile(userId: User['id']): Promise<Profile> {
    const [row] = await this.txHost.tx
      .select()
      .from(profile)
      .where(eq(profile.userId, userId));

    if (!row) {
      throw new NotFoundException('profile not found');
    }

    const avatarUrl = this.storageService.getPublicReadUrl(row.avatarKey);

    return {
      id: row.id,
      name: row.name,
      birthDate: row.birthDate,
      avatarUrl,
    };
  }
}
