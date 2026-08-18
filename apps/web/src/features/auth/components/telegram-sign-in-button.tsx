import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';

import { paths } from '@/constants/paths';
import { signInWithTelegramOidc } from '@/features/auth/api/auth-client';
import { TelegramIcon } from '@/features/auth/components/telegram-icon';

type TelegramSignInButtonProps = {
  className?: string;
  callbackUrl?: string;
  errorCallbackUrl: string;
};

const TelegramSignInButton = ({
  className,
  callbackUrl = paths.profile,
  errorCallbackUrl,
}: TelegramSignInButtonProps) => {
  const handleClick = () => {
    void signInWithTelegramOidc(callbackUrl, errorCallbackUrl);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className={cn(
        'w-full justify-start gap-3 normal-case tracking-normal',
        className,
      )}
      onClick={handleClick}
    >
      <span className="flex size-5 shrink-0 items-center justify-center text-[#229ED9] [&_svg]:size-5">
        <TelegramIcon />
      </span>
      continue with telegram
    </Button>
  );
};

export { TelegramSignInButton };
