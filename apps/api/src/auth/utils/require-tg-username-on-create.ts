import { APIError } from 'better-auth';

const requireTgUsernameOnCreate = (user: Record<string, unknown>) => {
  if (!user.tgUsername) {
    throw new APIError('BAD_REQUEST', {
      message: 'telegram_username_required',
    });
  }

  return Promise.resolve();
};

export { requireTgUsernameOnCreate };
