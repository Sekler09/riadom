import type { TelegramOIDCClaims } from 'better-auth-telegram';

import { normalizeTgUsername } from './normalize-tg-username';

const mapOidcProfileToUser = (claims: TelegramOIDCClaims) => {
  const tgUsername = normalizeTgUsername(claims.preferred_username);
  const name =
    claims.name?.trim() ||
    claims.given_name?.trim() ||
    (tgUsername ? `@${tgUsername}` : 'Telegram user');

  return {
    name,
    image: undefined,
    ...(tgUsername ? { tgUsername } : {}),
  };
};

export { mapOidcProfileToUser };
