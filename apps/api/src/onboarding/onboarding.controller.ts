import { Body, Controller, Post } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardUserDto } from './dto/onboard-user.dto';
import { type User as AuthenticatedUser } from 'src/auth/create-auth';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post('onboard')
  onboardUser(@Body() dto: OnboardUserDto, @User() user: AuthenticatedUser) {
    return this.onboardingService.onboardUser(user, dto);
  }
}
