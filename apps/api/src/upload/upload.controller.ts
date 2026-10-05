import { Body, Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';
import {
  GetPresignedUrlResponse,
  GetPresignedUrlSchema,
} from '@repo/contracts/upload';
import { createZodDto } from 'nestjs-zod';
import { Session } from '@thallesp/nestjs-better-auth';
import { type UserSession } from 'src/auth/create-auth';

class GetPresignedUrlDto extends createZodDto(GetPresignedUrlSchema) {}

@Controller('/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('initiate')
  initiateUpload(
    @Body() file: GetPresignedUrlDto,
    @Session() session: UserSession,
  ): Promise<GetPresignedUrlResponse> {
    return this.uploadService.initiateUpload(session.user.id, file);
  }
}
