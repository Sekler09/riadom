import { decodeJwtPayload } from './decode-jwt-payload';
import { normalizeTgUsername } from './normalize-tg-username';

const tgUsernameFromIdToken = (idToken: string | null | undefined) => {
  if (!idToken) {
    return null;
  }

  const claims = decodeJwtPayload(idToken);
  const preferredUsername = claims?.preferred_username;

  return typeof preferredUsername === 'string'
    ? normalizeTgUsername(preferredUsername)
    : null;
};

export { tgUsernameFromIdToken };
