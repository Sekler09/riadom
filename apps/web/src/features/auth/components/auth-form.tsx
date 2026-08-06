import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';
import { Link } from '@tanstack/react-router';

import { TelegramSignInButton } from '@/features/auth/components/telegram-sign-in-button';
import { authCopy, type AuthMode } from '@/features/auth/constants/auth-copy';

type AuthFormProps = {
  mode: AuthMode;
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const copy = authCopy[mode];

  return (
    <div className="mx-auto w-full max-w-sm">
      <div
        className="animate-fade-up space-y-3"
        style={{ animationDelay: '0.1s' }}
      >
        <p className="text-label">{copy.label}</p>
        <h1 className="type-display-lg">{copy.title}</h1>
        <p className="text-body-lg">{copy.subtitle}</p>
      </div>

      <div
        className="animate-fade-up mt-10"
        style={{ animationDelay: '0.25s' }}
      >
        <TelegramSignInButton />
        <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
          we use telegram so people can reach you after approval — no in-app
          chat needed.
        </p>
      </div>

      <p
        className="animate-fade-up mt-8 text-center text-[11px] leading-relaxed text-muted-foreground"
        style={{ animationDelay: '0.35s' }}
      >
        by continuing, you agree to our{' '}
        <a
          href="#"
          className="underline underline-offset-2 transition-colors hover:text-foreground"
        >
          terms
        </a>{' '}
        and{' '}
        <a
          href="#"
          className="underline underline-offset-2 transition-colors hover:text-foreground"
        >
          privacy policy
        </a>
        .
      </p>

      <p
        className={cn('animate-fade-up text-kicker mt-8 text-center')}
        style={{ animationDelay: '0.45s' }}
      >
        {copy.crossLinkPrompt}{' '}
        <Button
          variant="link"
          size="sm"
          className="h-auto p-0 text-[11px] tracking-caps uppercase"
          nativeButton={false}
          render={<Link to={copy.crossLinkTo} />}
        >
          {copy.crossLinkLabel}
        </Button>
      </p>
    </div>
  );
};

export { AuthForm };
