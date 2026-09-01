import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { createDb, schema } from '@repo/db';
import { betterAuth } from 'better-auth';
import { telegram } from 'better-auth-telegram';

import type { EnvConfig } from '../config/env';
import { buildTrustedOrigins, resolveBetterAuthUrl } from '../config/env';
import type { AccountHookContext } from './types/account-hook-context';
import { blockTgUsernameClientUpdate } from './utils/block-tg-username-client-update';
import { mapOidcProfileToUser } from './utils/map-oidc-profile-to-user';
import { requireTgUsernameOnCreate } from './utils/require-tg-username-on-create';
import { syncTgUsernameFromAccount } from './utils/sync-tg-username-from-account';

function createAuth(env: EnvConfig) {
  const db = createDb(env.DATABASE_URL);

  return betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    baseURL: resolveBetterAuthUrl(env),
    trustedOrigins: buildTrustedOrigins(env),
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema,
    }),
    user: {
      additionalFields: {
        tgUsername: {
          type: 'string',
          required: false,
          input: true,
          returned: true,
        },
        isOnboarded: {
          type: 'boolean',
          defaultValue: false,
          required: true,
          returned: true,
        },
      },
    },
    databaseHooks: {
      user: {
        create: {
          before: requireTgUsernameOnCreate,
        },
      },
      account: {
        create: {
          after: async (account, context) => {
            await syncTgUsernameFromAccount(
              account,
              context as AccountHookContext,
            );
          },
        },
        update: {
          after: async (account, context) => {
            await syncTgUsernameFromAccount(
              account,
              context as AccountHookContext,
            );
          },
        },
      },
    },
    hooks: {
      before: blockTgUsernameClientUpdate,
    },
    plugins: [
      telegram({
        loginWidget: false,
        botToken: env.TELEGRAM_BOT_TOKEN,
        botUsername: env.TELEGRAM_BOT_NAME,
        miniApp: {
          enabled: false,
        },
        oidc: {
          enabled: true,
          clientId: env.TELEGRAM_OIDC_CLIENT_ID,
          clientSecret: env.TELEGRAM_OIDC_CLIENT_SECRET,
          requestPhone: true,
          requestBotAccess: true,
          mapOIDCProfileToUser: mapOidcProfileToUser,
        },
      }),
    ],
    advanced: {
      cookiePrefix: 'riadom',
    },
  });
}

export { createAuth };
