import { AuthErrorCodeSchema } from '@repo/contracts/auth-errors';
import { SignInPage } from '@/features/auth/pages/sign-in-page';
import {
  handleAuthErrorSearch,
  type AuthErrorSearch,
} from '@/features/auth/utils/handle-auth-error-search';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/_layout/sign-in')({
  validateSearch: (search: Record<string, unknown>): AuthErrorSearch => {
    const parsed = AuthErrorCodeSchema.safeParse(search.error);

    return {
      error: parsed.success ? parsed.data : undefined,
    };
  },
  beforeLoad: handleAuthErrorSearch,
  component: SignInPage,
});
