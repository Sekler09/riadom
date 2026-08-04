import { AuthForm } from '@/features/auth/components/auth-form';
import { createFileRoute } from '@tanstack/react-router';

const SignInPage = () => {
  return <AuthForm mode="sign-in" />;
};

export const Route = createFileRoute('/(auth)/_layout/sign-in')({
  component: SignInPage,
});
