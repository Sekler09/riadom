import { myProfileQueryOptions } from '@/features/profile/api/use-my-profile';
import { EditProfilePage } from '@/features/profile/pages/edit-profile-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(private)/_private-layout/_onboarded-layout/profile/edit',
)({
  component: EditProfilePage,
  beforeLoad: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(myProfileQueryOptions()),
});
