import { Transactional, TransactionHost } from '@nestjs-cls/transactional';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Profile } from '@repo/contracts/profile';
import { profile } from '@repo/db/schema';
import { eq } from 'drizzle-orm';
import { User } from 'src/auth/create-auth';
import { type DbAdapter } from 'src/db/database.module';
import { takeFirstOrThrow } from 'src/db/utils/take-first';
import { EditProfileDto } from 'src/profile/dto/edit-profile.dto';
import { isUserUploadKey } from 'src/storage/utils/is-user-upload-key';
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

    const row = await this.txHost.tx
      .insert(profile)
      .values({
        ...dto,
        userId,
      })
      .returning()
      .then(takeFirstOrThrow);

    return this.mapToProfile(row);
  }

  async getUserProfile(userId: User['id']): Promise<Profile> {
    const [row] = await this.txHost.tx
      .select()
      .from(profile)
      .where(eq(profile.userId, userId));

    if (!row) {
      throw new NotFoundException('profile not found');
    }

    return this.mapToProfile(row);
  }

  async editUserProfile(
    userId: User['id'],
    dto: EditProfileDto,
  ): Promise<Profile> {
    const [row] = await this.txHost.tx
      .select()
      .from(profile)
      .where(eq(profile.userId, userId));

    if (!row) {
      throw new NotFoundException('profile not found');
    }

    const avatarChanged = dto.avatarKey !== row.avatarKey;

    if (avatarChanged) {
      if (!isUserUploadKey(dto.avatarKey, userId)) {
        throw new BadRequestException('Photo does not belong to current user');
      }

      if (!(await this.storageService.isObjectExist(dto.avatarKey))) {
        throw new BadRequestException('Photo does not exist');
      }
    }

    const updated = await this.txHost.tx
      .update(profile)
      .set({ name: dto.name, avatarKey: dto.avatarKey })
      .where(eq(profile.userId, userId))
      .returning()
      .then(takeFirstOrThrow);

    if (avatarChanged) {
      await this.storageService.deleteObject(row.avatarKey);
    }

    return this.mapToProfile(updated);
  }

  private mapToProfile(row: typeof profile.$inferSelect): Profile {
    return {
      id: row.id,
      name: row.name,
      birthDate: row.birthDate,
      avatarKey: row.avatarKey,
      avatarUrl: this.storageService.getPublicReadUrl(row.avatarKey),
    };
  }
}
