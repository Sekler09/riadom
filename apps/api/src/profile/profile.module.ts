import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { StorageModule } from 'src/storage/storage.module';
import { UsersModule } from 'src/users/users.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  providers: [ProfileService],
  exports: [ProfileService],
  imports: [UsersModule, DatabaseModule, StorageModule],
  controllers: [ProfileController],
})
export class ProfileModule {}
