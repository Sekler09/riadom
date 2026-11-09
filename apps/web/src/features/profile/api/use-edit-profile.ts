import type { EditProfile, Profile } from '@repo/contracts/profile';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { myProfileQueryOptions } from './use-my-profile';

const editMyProfile = (data: EditProfile) =>
  apiClient.put<Profile>('profile/me', data);

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editMyProfile,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(myProfileQueryOptions().queryKey, data);
    },
  });
};
