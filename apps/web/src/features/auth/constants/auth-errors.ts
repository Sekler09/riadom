import {
  AuthErrorCodeSchema,
  type AuthErrorCode,
} from '@repo/contracts/auth-errors';

const authErrorCopy: Record<AuthErrorCode, string> = {
  telegram_username_required:
    'Set a Telegram username in Telegram Settings, then try again.',
  tg_username_not_editable: "Telegram username can't be changed here.",
};

const DEFAULT_AUTH_ERROR_MESSAGE =
  'Something went wrong signing in. Please try again.';

const isAuthErrorCode = (value: string): value is AuthErrorCode =>
  AuthErrorCodeSchema.safeParse(value).success;

const getAuthErrorMessage = (error: string): string =>
  isAuthErrorCode(error) ? authErrorCopy[error] : DEFAULT_AUTH_ERROR_MESSAGE;

export { getAuthErrorMessage, isAuthErrorCode };
export type { AuthErrorCode };
