import type { Profile } from '@repo/contracts/profile';
import { queryOptions, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { profileKeys } from './keys';

const getMyProfile = async (): Promise<Profile> => {
  const { data } = await apiClient.get<Profile>('profile/me');
  return data;
};

export const myProfileQueryOptions = () =>
  queryOptions({
    queryFn: getMyProfile,
    queryKey: profileKeys.me(),
  });

export const useMyProfile = () => useQuery(myProfileQueryOptions());
