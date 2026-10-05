import { Injectable } from '@nestjs/common';
import { GetPresignedUrl } from '@repo/contracts/upload';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class UploadService {
  constructor(private readonly storageService: StorageService) {}

  initiateUpload(userId: string, fileOpts: GetPresignedUrl) {
    return this.storageService.getPresignedUrl(userId, fileOpts);
  }
}
