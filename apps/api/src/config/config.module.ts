import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ENV_CONFIG,
  EnvConfig,
  envFilePaths,
  getEnvConfig,
  validateEnv,
} from './env';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePaths,
      validate: validateEnv,
    }),
  ],
  providers: [
    {
      inject: [ConfigService],
      provide: ENV_CONFIG,
      useFactory: (config: ConfigService<EnvConfig, true>) =>
        getEnvConfig(config),
    },
  ],
  exports: [ENV_CONFIG],
})
export class AppConfigModule {}
