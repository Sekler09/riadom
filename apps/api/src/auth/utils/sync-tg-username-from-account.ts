import { TELEGRAM_OIDC_PROVIDER_ID } from '../constants/telegram-oidc';
import type {
  AccountHookContext,
  AuthAccountRecord,
} from '../types/account-hook-context';
import { tgUsernameFromIdToken } from './tg-username-from-id-token';

const syncTgUsernameFromAccount = async (
  account: AuthAccountRecord,
  hookContext: AccountHookContext,
) => {
  if (!hookContext) {
    return;
  }

  if (account.providerId !== TELEGRAM_OIDC_PROVIDER_ID || !account.userId) {
    return;
  }

  const tgUsername = tgUsernameFromIdToken(account.idToken);
  await hookContext.context.internalAdapter.updateUser(account.userId, {
    tgUsername,
  });
};

export { syncTgUsernameFromAccount };
