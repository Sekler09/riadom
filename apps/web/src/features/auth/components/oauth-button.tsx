import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';

type OAuthProvider = 'google' | 'apple';

type OAuthButtonProps = {
  provider: OAuthProvider;
  icon: React.ReactNode;
  className?: string;
};

const providerLabels: Record<OAuthProvider, string> = {
  google: 'continue with google',
  apple: 'continue with apple',
};

const OAuthButton = ({ provider, icon, className }: OAuthButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className={cn('w-full justify-start gap-3 normal-case tracking-normal', className)}
    >
      <span className="flex size-5 shrink-0 items-center justify-center [&_svg]:size-5">
        {icon}
      </span>
      {providerLabels[provider]}
    </Button>
  );
};

export { OAuthButton };
