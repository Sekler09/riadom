import { authErrorCodes } from '@repo/contracts/auth-errors';
import { APIError } from 'better-auth';

const requireTgUsernameOnCreate = (user: Record<string, unknown>) => {
  if (!user.tgUsername) {
    throw new APIError('BAD_REQUEST', {
      message: authErrorCodes.telegramUsernameRequired,
    });
  }

  return Promise.resolve();
};

export { requireTgUsernameOnCreate };
