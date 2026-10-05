import { Transactional, TransactionHost } from '@nestjs-cls/transactional';
import { Injectable, NotFoundException } from '@nestjs/common';
import { profile } from '@repo/db/schema';
import { User } from 'src/auth/create-auth';
import { type DbAdapter } from 'src/db/database.module';
import { OnboardUserDto } from 'src/onboarding/dto/onboard-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly txHost: TransactionHost<DbAdapter>,
    private readonly usersService: UsersService,
  ) {}

  @Transactional()
  async onboardUser(userId: User['id'], dto: OnboardUserDto) {
    const [user] = await this.usersService.onboardUser(userId);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return await this.txHost.tx
      .insert(profile)
      .values({
        ...dto,
        userId,
      })
      .returning();
  }
}
