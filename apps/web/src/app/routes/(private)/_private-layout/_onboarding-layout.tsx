import { paths } from '@/constants/paths';
import { sessionQueryOptions } from '@/features/auth/api/use-session-query';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(private)/_private-layout/_onboarding-layout',
)({
  component: Outlet,
  beforeLoad: async ({ context: { queryClient } }) => {
    const sessionData = await queryClient.ensureQueryData(
      sessionQueryOptions(),
    );

    if (sessionData?.user?.isOnboarded) {
      throw redirect({ to: paths.profile });
    }
  },
});
