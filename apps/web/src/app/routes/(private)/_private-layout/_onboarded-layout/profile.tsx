import { myProfileQueryOptions } from '@/features/profile/api/use-my-profile';
import { ProfilePage } from '@/features/profile/pages/profile-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(private)/_private-layout/_onboarded-layout/profile',
)({
  component: ProfilePage,
  beforeLoad: async ({ context: { queryClient } }) => {
    queryClient.ensureQueryData({ queryKey: myProfileQueryOptions().queryKey });
  },
});
