import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';

import { createAuth } from './auth/create-auth';
import { ENV_CONFIG, type EnvConfig } from './config/env';
import { HealthModule } from './health/health.module';
import { AppConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { DatabaseModule, DB } from './db/database.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { ClsModule } from 'nestjs-cls';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterDrizzleOrm } from '@nestjs-cls/transactional-adapter-drizzle-orm';

@Module({
  imports: [
    AppConfigModule,
    AuthModule.forRootAsync({
      inject: [ENV_CONFIG],
      useFactory: (config: EnvConfig) => ({
        auth: createAuth(config),
        bodyParser: {
          json: { limit: '2mb' },
          urlencoded: { limit: '2mb', extended: true },
        },
      }),
    }),
    ClsModule.forRoot({
      global: true,
      plugins: [
        new ClsPluginTransactional({
          imports: [DatabaseModule],
          adapter: new TransactionalAdapterDrizzleOrm({
            drizzleInstanceToken: DB,
            defaultTxOptions: { isolationLevel: 'read committed' },
          }),
        }),
      ],
    }),
    DatabaseModule,
    HealthModule,
    UploadModule,
    OnboardingModule,
    UsersModule,
    ProfileModule,
  ],
})
export class AppModule {}
