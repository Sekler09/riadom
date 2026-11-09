import { Body, Controller, Get, Put } from '@nestjs/common';
import { ProfileSchema } from '@repo/contracts/profile';
import { createZodDto } from 'nestjs-zod';
import { User as AuthenticatedUser } from 'src/auth/create-auth';
import { User } from 'src/auth/decorators/user.decorator';
import { EditProfileDto } from './dto/edit-profile.dto';
import { ProfileService } from './profile.service';

class ProfileResponseDto extends createZodDto(ProfileSchema) {}

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  getUserProfile(
    @User('id') userId: AuthenticatedUser['id'],
  ): Promise<ProfileResponseDto> {
    return this.profileService.getUserProfile(userId);
  }

  @Put('me')
  editUserProfile(
    @User('id') userId: AuthenticatedUser['id'],
    @Body() dto: EditProfileDto,
  ): Promise<ProfileResponseDto> {
    return this.profileService.editUserProfile(userId, dto);
  }
}
