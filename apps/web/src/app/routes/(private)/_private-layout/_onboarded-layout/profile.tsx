import { ProfilePage } from '@/features/auth/pages/profile-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(private)/_private-layout/_onboarded-layout/profile')({
  component: ProfilePage,
});
