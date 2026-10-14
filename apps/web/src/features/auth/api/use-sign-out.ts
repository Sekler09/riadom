import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signOut } from './auth-client';
import { sessionQueryOptions } from './use-session-query';
import { myProfileQueryOptions } from '@/features/profile/api/use-my-profile';
import { useNavigate } from '@tanstack/react-router';
import { paths } from '@/constants/paths';

const signOutWithThrow = async () => {
  const { data, error } = await signOut();

  if (error) {
    throw new Error(error.message ?? 'Failed to sign out');
  }

  return data;
};

const useSignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => signOutWithThrow(),
    onSuccess: () => {
      queryClient.removeQueries(sessionQueryOptions());
      queryClient.removeQueries(myProfileQueryOptions());
      navigate({ to: paths.signIn });
    },
  });
};

export { useSignOut };
