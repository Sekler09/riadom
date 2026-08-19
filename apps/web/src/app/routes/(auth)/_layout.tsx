import { paths } from '@/constants/paths';
import { getSession } from '@/features/auth/api/auth-client';
import { AuthLayout } from '@/features/auth/components/auth-layout';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/_layout')({
  component: AuthLayout,
  beforeLoad: async () => {
    const { data } = await getSession();

    if (data?.session) {
      throw redirect({ to: paths.profile });
    }
  },
});
