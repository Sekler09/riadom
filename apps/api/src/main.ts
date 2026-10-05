import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { buildTrustedOrigins, getEnvConfig } from './config/env';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  const env = getEnvConfig(app.get(ConfigService));

  app.useGlobalPipes(new ZodValidationPipe());

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: buildTrustedOrigins(env),
    credentials: true,
  });

  await app.listen(env.PORT);
}

void bootstrap();
