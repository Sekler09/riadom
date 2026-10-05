import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [StorageModule],
})
export class UploadModule {}
