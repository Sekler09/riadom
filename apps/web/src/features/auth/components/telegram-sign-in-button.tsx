import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';

import { TelegramIcon } from '@/features/auth/components/telegram-icon';

type TelegramSignInButtonProps = {
  className?: string;
};

const TelegramSignInButton = ({ className }: TelegramSignInButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className={cn(
        'w-full justify-start gap-3 normal-case tracking-normal',
        className,
      )}
    >
      <span className="flex size-5 shrink-0 items-center justify-center text-[#229ED9] [&_svg]:size-5">
        <TelegramIcon />
      </span>
      continue with telegram
    </Button>
  );
};

export { TelegramSignInButton };
