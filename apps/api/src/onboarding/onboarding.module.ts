import { Module } from '@nestjs/common';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { ProfileModule } from 'src/profile/profile.module';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  controllers: [OnboardingController],
  providers: [OnboardingService],
  imports: [ProfileModule, StorageModule],
})
export class OnboardingModule {}
