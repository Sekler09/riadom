import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import type { EnvConfig } from './config/env';
import { buildTrustedOrigins } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  const configService = app.get(ConfigService<EnvConfig, true>);
  const env = {
    CORS_ORIGIN: configService.get('CORS_ORIGIN', { infer: true }),
    NGROK_DOMAIN: configService.get('NGROK_DOMAIN', { infer: true }),
  };

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: buildTrustedOrigins(env),
    credentials: true,
  });

  await app.listen(configService.get('PORT', { infer: true }));
}

void bootstrap();
