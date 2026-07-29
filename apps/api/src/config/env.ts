function readEnv(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

function readPort(key: string, fallback: number): number {
  const value = process.env[key];
  if (value === undefined) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export const env = {
  port: readPort('PORT', 4000),
  corsOrigin: readEnv('CORS_ORIGIN', 'http://localhost:3000'),
} as const;
