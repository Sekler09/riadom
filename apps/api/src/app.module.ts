import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';

import { createAuth } from './auth/create-auth';
import {
  envFilePaths,
  getEnvConfig,
  type EnvConfig,
  validateEnv,
} from './config/env';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePaths,
      validate: validateEnv,
    }),
    AuthModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvConfig, true>) => ({
        auth: createAuth(getEnvConfig(configService)),
        bodyParser: {
          json: { limit: '2mb' },
          urlencoded: { limit: '2mb', extended: true },
        },
      }),
    }),
    HealthModule,
  ],
})
export class AppModule {}
