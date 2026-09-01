import { OnboardingPage } from '@/features/profile/pages/onboarding-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(private)/_private-layout/_onboarding-layout/onboarding')({
  component: OnboardingPage,
});
