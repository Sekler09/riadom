import { AuthForm } from '@/features/auth/components/auth-form';
import { createFileRoute } from '@tanstack/react-router';

const SignUpPage = () => {
  return <AuthForm mode="sign-up" />;
};

export const Route = createFileRoute('/(auth)/_layout/sign-up')({
  component: SignUpPage,
});
