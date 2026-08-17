import { AuthForm } from '@/features/auth/components/auth-form';
import { createFileRoute } from '@tanstack/react-router';

type SignInSearch = {
  error?: string;
};

const SignInPage = () => {
  const { error } = Route.useSearch();

  return <AuthForm mode="sign-in" authError={error} />;
};

export const Route = createFileRoute('/(auth)/_layout/sign-in')({
  validateSearch: (search: Record<string, unknown>): SignInSearch => ({
    error: typeof search.error === 'string' ? search.error : undefined,
  }),
  component: SignInPage,
});
