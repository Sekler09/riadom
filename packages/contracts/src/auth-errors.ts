import { z } from 'zod';

export const authErrorCodes = {
  telegramUsernameRequired: 'telegram_username_required',
  tgUsernameNotEditable: 'tg_username_not_editable',
} as const;

export const AuthErrorCodeSchema = z.enum([
  authErrorCodes.telegramUsernameRequired,
  authErrorCodes.tgUsernameNotEditable,
]);

export type AuthErrorCode = z.infer<typeof AuthErrorCodeSchema>;
