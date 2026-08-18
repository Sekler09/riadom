import { Button } from '@repo/ui/components/button';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import { signOut, useSession } from '@/features/auth/api/auth-client';
import { paths } from '@/constants/paths';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { data, isPending } = useSession();
  const user = data?.user;

  useEffect(() => {
    if (!isPending && !user) {
      void navigate({ to: paths.signIn });
    }
  }, [isPending, user, navigate]);

  if (isPending || !user) {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-md items-center justify-center px-6">
        <p className="text-muted-foreground text-sm">
          {isPending ? 'Loading session…' : 'Redirecting to sign in…'}
        </p>
      </main>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    void navigate({ to: paths.signIn });
  };

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-8 px-6 py-12">
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs tracking-wide uppercase">
          Temp profile
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          {user.name || 'Signed in'}
        </h1>
      </div>

      <dl className="space-y-3 text-sm">
        <div className="flex justify-between gap-4 border-b border-border py-2">
          <dt className="text-muted-foreground">ID</dt>
          <dd className="truncate font-mono text-xs">{user.id}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-border py-2">
          <dt className="text-muted-foreground">Email</dt>
          <dd className="truncate">{user.email || '—'}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-border py-2">
          <dt className="text-muted-foreground">Name</dt>
          <dd className="truncate">{user.name || '—'}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-border py-2">
          <dt className="text-muted-foreground">Telegram</dt>
          <dd className="truncate">
            {user.tgUsername
              ? `@${user.tgUsername}`
              : 'Set a Telegram username'}
          </dd>
        </div>
        {user.image ? (
          <div className="flex items-center justify-between gap-4 border-b border-border py-2">
            <dt className="text-muted-foreground">Avatar</dt>
            <dd>
              <img
                src={user.image}
                alt=""
                className="size-10 rounded-full object-cover"
              />
            </dd>
          </div>
        ) : null}
      </dl>

      <Button type="button" variant="outline" onClick={() => void handleSignOut()}>
        Log out
      </Button>
    </main>
  );
};

export { ProfilePage };
