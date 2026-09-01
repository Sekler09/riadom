import { paths } from '@/constants/paths';
import { getSession } from '@/features/auth/api/auth-client';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(private)/_private-layout/_onboarded-layout',
)({
  component: Outlet,
  beforeLoad: async () => {
    const { data } = await getSession();

    if (!data?.user?.isOnboarded) {
      throw redirect({ to: paths.onboarding });
    }
  },
});
