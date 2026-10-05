import { apiClient } from '@/lib/api-client';
import { type Onboarding } from '@repo/contracts/onboarding';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sessionQueryOptions } from '@/features/auth/api/use-session-query';

const onboardUser = (data: Onboarding) =>
  apiClient.post('/onboarding/onboard', data);

const useOnboardUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: onboardUser,
    onSuccess: () => {
      queryClient.setQueryData(sessionQueryOptions().queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          user: {
            ...old.user,
            isOnboarded: true,
          },
        };
      });
    },
  });
};

export { useOnboardUser };
