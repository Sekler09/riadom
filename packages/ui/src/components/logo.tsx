import { cn } from '../lib/utils.js';

type LogoProps = {
  className?: string;
};

function Logo({ className }: LogoProps) {
  return (
    <span
      className={cn(
        'font-brand text-[1.35rem] font-medium tracking-[var(--tracking-brand)] lowercase',
        className,
      )}
    >
      riadom
    </span>
  );
}

export { Logo };
