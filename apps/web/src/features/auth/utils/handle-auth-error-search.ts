import { toast } from '@repo/ui/components/sonner';
import { redirect } from '@tanstack/react-router';

import {
  getAuthErrorMessage,
  type AuthErrorCode,
} from '@/features/auth/constants/auth-errors';

type AuthErrorSearch = {
  error?: AuthErrorCode;
};

const handleAuthErrorSearch = ({
  search,
  location,
}: {
  search: AuthErrorSearch;
  location: { pathname: string };
}) => {
  if (!search.error) {
    return;
  }

  toast.error(getAuthErrorMessage(search.error));

  throw redirect({
    to: location.pathname,
    replace: true,
  });
};

export { handleAuthErrorSearch };
export type { AuthErrorSearch };
