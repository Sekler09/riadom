import { ConfigService } from '@nestjs/config';
import { resolve } from 'node:path';
import { z } from 'zod';

export const envFilePaths = [
  resolve(__dirname, '../../../../.env'),
  resolve(__dirname, '../../.env'),
];

export const ENV_CONFIG = Symbol('ENV_CONFIG');

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
  S3_ENDPOINT: z.string().default('http://localhost:9000'),
  S3_ACCESS_KEY: z.string().min(1),
  S3_SECRET_KEY: z.string().min(1),
  S3_BUCKET: z.string().min(1),
  S3_REGION: z.string().default('us-east-1'),
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
  return Object.fromEntries(
    Object.keys(envSchema.shape).map((key) => [
      key,
      configService.get(key as keyof EnvConfig, { infer: true }),
    ]),
  ) as EnvConfig;
}

export { buildNgrokOrigin, buildTrustedOrigins, resolveBetterAuthUrl };
