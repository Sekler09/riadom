import { ProfilePage } from '@/features/profile/pages/profile-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(private)/_private-layout/_onboarded-layout/profile',
)({
  component: ProfilePage,
});
