import { authErrorCodes } from '@repo/contracts/auth-errors';
import { APIError } from 'better-auth';
import { createAuthMiddleware } from 'better-auth/api';

const blockTgUsernameClientUpdate = createAuthMiddleware((ctx) => {
  if (
    ctx.path === '/update-user' &&
    ctx.body &&
    typeof ctx.body === 'object' &&
    'tgUsername' in ctx.body
  ) {
    throw new APIError('BAD_REQUEST', {
      message: authErrorCodes.tgUsernameNotEditable,
    });
  }

  return Promise.resolve();
});

export { blockTgUsernameClientUpdate };
