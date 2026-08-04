import { AuthLayout } from '@/features/auth/components/auth-layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/_layout')({
  component: AuthLayout,
});
