import { apiClient } from '@/lib/api-client';
import { type Onboarding } from '@repo/contracts/onboarding';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sessionQueryOptions } from '@/features/auth/api/use-session-query';
import { Profile } from '@repo/contracts/profile';
import { myProfileQueryOptions } from '@/features/profile/api/use-my-profile';

const onboardUser = (data: Onboarding) =>
  apiClient.post<Profile>('/onboarding/onboard', data);

const useOnboardUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: onboardUser,
    onSuccess: ({ data }) => {
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
      queryClient.setQueryData(myProfileQueryOptions().queryKey, data);
    },
  });
};

export { useOnboardUser };
