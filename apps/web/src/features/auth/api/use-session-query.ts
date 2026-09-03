import { queryOptions, useQuery } from '@tanstack/react-query';

import { getSession } from '@/features/auth/api/auth-client';
import { authKeys } from '@/features/auth/api/keys';

const fetchSession = async () => {
  const { data, error } = await getSession();

  if (error) {
    throw new Error(error.message ?? 'Failed to fetch session');
  }

  return data;
};

const sessionQueryOptions = () =>
  queryOptions({
    queryKey: authKeys.session(),
    queryFn: fetchSession,
    staleTime: 0,
    retry: 1,
  });

const useSessionQuery = () => useQuery(sessionQueryOptions());

export { sessionQueryOptions, useSessionQuery };
