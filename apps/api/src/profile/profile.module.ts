import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  providers: [ProfileService],
  exports: [ProfileService],
  imports: [UsersModule, DatabaseModule],
})
export class ProfileModule {}
