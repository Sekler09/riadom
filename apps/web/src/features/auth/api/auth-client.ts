import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { telegramClient } from 'better-auth-telegram/client';

import { paths } from '@/constants/paths';

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
      },
    }),
  ],
});

const signInWithTelegramOidc = (
  callbackUrl: string,
  errorCallbackUrl: string = paths.signIn,
) =>
  authClient.signInWithTelegramOIDC({
    callbackURL: callbackUrl,
    errorCallbackURL: errorCallbackUrl,
  });

const { useSession, signOut, getSession } = authClient;

export { signInWithTelegramOidc, signOut, useSession, getSession };
