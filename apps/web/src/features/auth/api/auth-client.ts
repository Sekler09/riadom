import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { telegramClient } from 'better-auth-telegram/client';

const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : '',
  fetchOptions: {
    credentials: 'include',
  },
  plugins: [
    telegramClient(),
    inferAdditionalFields({
      user: {
        tgUsername: {
          type: 'string',
          required: false,
        },
        isOnboarded: {
          type: 'boolean',
        },
      },
    }),
  ],
});

const signInWithTelegramOidc = (
  callbackUrl: string,
  errorCallbackUrl: string,
) =>
  authClient.signInWithTelegramOIDC({
    callbackURL: callbackUrl,
    errorCallbackURL: errorCallbackUrl,
  });

const { useSession, signOut, getSession } = authClient;

export { signInWithTelegramOidc, signOut, useSession, getSession };
