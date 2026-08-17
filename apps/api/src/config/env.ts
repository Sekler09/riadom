import { ConfigService } from '@nestjs/config';
import { resolve } from 'node:path';
import { z } from 'zod';

export const envFilePaths = [
  resolve(__dirname, '../../../../.env'),
  resolve(__dirname, '../../.env'),
];

export const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  DATABASE_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.string().default('http://localhost:4000'),
  BETTER_AUTH_API_KEY: z
    .string()
    .trim()
    .min(1, 'BETTER_AUTH_API_KEY is required for Better Auth Infrastructure'),
  TELEGRAM_BOT_TOKEN: z.string().default(''),
  TELEGRAM_OIDC_CLIENT_ID: z.string().default(''),
  TELEGRAM_OIDC_CLIENT_SECRET: z.string().default(''),
  TELEGRAM_BOT_NAME: z.string().default(''),
  NGROK_DOMAIN: z.string().optional(),
});

export type EnvConfig = z.infer<typeof envSchema>;

function buildNgrokOrigin(domain: string): string {
  return `https://${domain}`;
}

function buildTrustedOrigins(
  env: Pick<EnvConfig, 'CORS_ORIGIN' | 'NGROK_DOMAIN'>,
): string[] {
  const origins = new Set<string>([env.CORS_ORIGIN]);

  if (env.NGROK_DOMAIN) {
    origins.add(buildNgrokOrigin(env.NGROK_DOMAIN));
  }

  return [...origins];
}

function resolveBetterAuthUrl(env: EnvConfig): string {
  if (env.NGROK_DOMAIN) {
    return buildNgrokOrigin(env.NGROK_DOMAIN);
  }

  return env.BETTER_AUTH_URL;
}

export function validateEnv(config: Record<string, unknown>): EnvConfig {
  return envSchema.parse(config);
}

export function getEnvConfig(
  configService: ConfigService<EnvConfig, true>,
): EnvConfig {
  return {
    PORT: configService.get('PORT', { infer: true }),
    CORS_ORIGIN: configService.get('CORS_ORIGIN', { infer: true }),
    DATABASE_URL: configService.get('DATABASE_URL', { infer: true }),
    BETTER_AUTH_SECRET: configService.get('BETTER_AUTH_SECRET', {
      infer: true,
    }),
    BETTER_AUTH_URL: configService.get('BETTER_AUTH_URL', { infer: true }),
    BETTER_AUTH_API_KEY: configService.get('BETTER_AUTH_API_KEY', {
      infer: true,
    }),
    TELEGRAM_BOT_TOKEN: configService.get('TELEGRAM_BOT_TOKEN', {
      infer: true,
    }),
    TELEGRAM_BOT_NAME: configService.get('TELEGRAM_BOT_NAME', {
      infer: true,
    }),
    TELEGRAM_OIDC_CLIENT_ID: configService.get('TELEGRAM_OIDC_CLIENT_ID', {
      infer: true,
    }),
    TELEGRAM_OIDC_CLIENT_SECRET: configService.get(
      'TELEGRAM_OIDC_CLIENT_SECRET',
      {
        infer: true,
      },
    ),
    NGROK_DOMAIN: configService.get('NGROK_DOMAIN', { infer: true }),
  };
}

export { buildNgrokOrigin, buildTrustedOrigins, resolveBetterAuthUrl };
