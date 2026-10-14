import { useSignOut } from '@/features/auth/api/use-sign-out';
import { Button } from '@repo/ui/components/button';

export const SignOutButton = () => {
  const { mutate: signOut, isPending } = useSignOut();

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="min-h-11 w-full transition-colors duration-200"
      disabled={isPending}
      onClick={() => signOut()}
    >
      {isPending ? 'Logging out…' : 'Log out'}
    </Button>
  );
};
