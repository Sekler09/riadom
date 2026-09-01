import { paths } from '@/constants/paths';
import { getSession } from '@/features/auth/api/auth-client';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(private)/_private-layout')({
  component: () => <Outlet />,
  beforeLoad: async () => {
    const { data } = await getSession();

    if (!data?.session) {
      throw redirect({ to: paths.signIn });
    }
  },
});
