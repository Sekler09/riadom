import { config } from 'dotenv';
import { resolve } from 'node:path';
import { createHash, randomBytes, webcrypto } from 'node:crypto';
import { eq, like } from 'drizzle-orm';

import { createDb } from './index.js';
import { account, profile, session, user } from './db/schema.js';

config({ path: resolve(process.cwd(), '../../.env') });

const SEED_EMAIL_DOMAIN = 'seed.riadom.local';
const COOKIE_PREFIX = 'riadom';
const SESSION_DAYS = 30;
const TELEGRAM_OIDC_PROVIDER_ID = 'telegram-oidc';

/**
 * Better Auth adds `__Secure-` when baseURL is https.
 * Our API resolves baseURL to https://$NGROK_DOMAIN when that env is set.
 */
function resolveSessionCookieName(): string {
  const ngrokDomain = process.env.NGROK_DOMAIN?.trim();
  const betterAuthUrl =
    ngrokDomain && ngrokDomain.length > 0
      ? `https://${ngrokDomain}`
      : (process.env.BETTER_AUTH_URL ?? 'http://localhost:4000');
  const useSecureCookies = betterAuthUrl.startsWith('https://');
  const name = `${COOKIE_PREFIX}.session_token`;
  return useSecureCookies ? `__Secure-${name}` : name;
}

type SeedUser = {
  id: string;
  name: string;
  email: string;
  tgUsername: string;
  isOnboarded: boolean;
  profile?: {
    name: string;
    birthDate: string;
    avatarKey: string;
  };
};

const seedUsers: SeedUser[] = [
  {
    id: 'seed_user_alice',
    name: 'Alice Seed',
    email: `alice@${SEED_EMAIL_DOMAIN}`,
    tgUsername: 'seed_alice',
    isOnboarded: false,
  },
  {
    id: 'seed_user_bob',
    name: 'Bob Seed',
    email: `bob@${SEED_EMAIL_DOMAIN}`,
    tgUsername: 'seed_bob',
    isOnboarded: false,
  },
  {
    id: 'seed_user_carol',
    name: 'Carol Seed',
    email: `carol@${SEED_EMAIL_DOMAIN}`,
    tgUsername: 'seed_carol',
    isOnboarded: true,
    profile: {
      name: 'Carol',
      birthDate: '1998-04-12',
      avatarKey: 'seed/avatars/carol.jpg',
    },
  },
  {
    id: 'seed_user_dave',
    name: 'Dave Seed',
    email: `dave@${SEED_EMAIL_DOMAIN}`,
    tgUsername: 'seed_dave',
    isOnboarded: true,
    profile: {
      name: 'Dave',
      birthDate: '2001-11-03',
      avatarKey: 'seed/avatars/dave.jpg',
    },
  },
  {
    id: 'seed_user_erin',
    name: 'Erin Seed',
    email: `erin@${SEED_EMAIL_DOMAIN}`,
    tgUsername: 'seed_erin',
    isOnboarded: false,
  },
];

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function createId(prefix: string): string {
  return `${prefix}_${randomBytes(12).toString('hex')}`;
}

function createSessionToken(): string {
  return randomBytes(24).toString('base64url');
}

async function signCookieValue(value: string, secret: string): Promise<string> {
  const key = await webcrypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await webcrypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(value),
  );
  const signatureB64 = Buffer.from(signature).toString('base64');
  return encodeURIComponent(`${value}.${signatureB64}`);
}

async function seed() {
  const databaseUrl = requireEnv('DATABASE_URL');
  const authSecret = requireEnv('BETTER_AUTH_SECRET');
  const cookieName = resolveSessionCookieName();
  const db = createDb(databaseUrl);

  console.log('Session cookie name: %s', cookieName);
  console.log('Clearing previous @%s seed users…', SEED_EMAIL_DOMAIN);
  await db.delete(user).where(like(user.email, `%@${SEED_EMAIL_DOMAIN}`));

  const now = new Date();
  const expiresAt = new Date(
    now.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000,
  );

  const printedSessions: Array<{
    email: string;
    tgUsername: string;
    isOnboarded: boolean;
    cookie: string;
  }> = [];

  for (const seedUser of seedUsers) {
    await db.insert(user).values({
      id: seedUser.id,
      name: seedUser.name,
      email: seedUser.email,
      emailVerified: true,
      image: null,
      tgUsername: seedUser.tgUsername,
      isOnboarded: seedUser.isOnboarded,
      createdAt: now,
      updatedAt: now,
    });

    await db.insert(account).values({
      id: createId('seed_acc'),
      accountId: createHash('sha256')
        .update(seedUser.tgUsername)
        .digest('hex')
        .slice(0, 16),
      providerId: TELEGRAM_OIDC_PROVIDER_ID,
      userId: seedUser.id,
      createdAt: now,
      updatedAt: now,
    });

    if (seedUser.profile) {
      await db.insert(profile).values({
        name: seedUser.profile.name,
        birthDate: seedUser.profile.birthDate,
        avatarKey: seedUser.profile.avatarKey,
        userId: seedUser.id,
        createdAt: now,
        updatedAt: now,
      });
    }

    const token = createSessionToken();
    await db.insert(session).values({
      id: createId('seed_sess'),
      token,
      userId: seedUser.id,
      expiresAt,
      createdAt: now,
      updatedAt: now,
      ipAddress: '127.0.0.1',
      userAgent: 'riadom-db-seed',
    });

    const signed = await signCookieValue(token, authSecret);
    printedSessions.push({
      email: seedUser.email,
      tgUsername: seedUser.tgUsername,
      isOnboarded: seedUser.isOnboarded,
      cookie: `${cookieName}=${signed}`,
    });
  }

  const count = await db.query.user.findMany({
    where: eq(user.email, seedUsers[0]!.email),
  });
  if (count.length !== 1) {
    throw new Error('Seed verification failed');
  }

  console.log(
    '\nSeeded %d users (%d not onboarded, %d onboarded).',
    seedUsers.length,
    seedUsers.filter((u) => !u.isOnboarded).length,
    seedUsers.filter((u) => u.isOnboarded).length,
  );
  console.log('Sessions expire in %d days.\n', SESSION_DAYS);
  console.log('Postman: set header Cookie to one of these values\n');

  for (const row of printedSessions) {
    console.log(
      '- %s (@%s) onboarded=%s\n  Cookie: %s\n',
      row.email,
      row.tgUsername,
      row.isOnboarded,
      row.cookie,
    );
  }

  console.log('Try onboarding with Alice/Bob/Erin:');
  console.log('  POST http://localhost:4000/api/onboarding/onboard');
  console.log(
    '  Body: { "name": "Alice", "birthDate": "2000-01-15", "avatarKey": "seed/avatars/alice.jpg" }',
  );
  console.log(
    '\nNote: if NGROK_DOMAIN is set, cookie name must be __Secure-riadom.session_token',
  );

  await db.$client.end({ timeout: 5 });
}

seed().catch(async (error: unknown) => {
  console.error('Seed failed:', error);
  process.exitCode = 1;
  process.exit(1);
});
