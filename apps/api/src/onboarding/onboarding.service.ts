import { BadRequestException, Injectable } from '@nestjs/common';
import { type User } from 'src/auth/create-auth';
import { OnboardUserDto } from './dto/onboard-user.dto';
import { ProfileService } from 'src/profile/profile.service';
import { StorageService } from 'src/storage/storage.service';
import { isUserUploadKey } from 'src/storage/utils/is-user-upload-key';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly profileService: ProfileService,
    private readonly storageService: StorageService,
  ) {}

  async onboardUser(user: User, dto: OnboardUserDto) {
    const isOnboarded = user.isOnboarded;

    if (isOnboarded) {
      throw new BadRequestException('User is already onboarded');
    }

    if (!isUserUploadKey(dto.avatarKey, user.id)) {
      throw new BadRequestException('Photo does not belong to current user');
    }

    if (!(await this.storageService.isObjectExist(dto.avatarKey))) {
      throw new BadRequestException('Photo does not exist');
    }

    return this.profileService.onboardUser(user.id, dto);
  }
}
