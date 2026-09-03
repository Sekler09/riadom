import { paths } from '@/constants/paths';
import { sessionQueryOptions } from '@/features/auth/api/use-session-query';
import { AuthLayout } from '@/features/auth/components/auth-layout';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/_layout')({
  component: AuthLayout,
  beforeLoad: async ({ context: { queryClient } }) => {
    const sessionData = await queryClient.ensureQueryData(
      sessionQueryOptions(),
    );

    if (sessionData) {
      throw redirect({ to: paths.profile });
    }
  },
});
