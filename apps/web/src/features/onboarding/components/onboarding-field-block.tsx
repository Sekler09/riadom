import { Separator } from '@repo/ui/components/separator';

type OnboardingFieldBlockProps = {
  index: string;
  children: React.ReactNode;
};

const OnboardingFieldBlock = ({
  index,
  children,
}: OnboardingFieldBlockProps) => {
  return (
    <div className="pt-6">
      <Separator className="mb-6 bg-foreground/20" />
      <div className="mb-5 flex items-end justify-between gap-4">
        <span
          className="font-display text-3xl font-medium tracking-[-0.04em] text-foreground/15 sm:text-4xl"
          aria-hidden="true"
        >
          {index}
        </span>
        {children}
      </div>
    </div>
  );
};

const RequiredMark = () => {
  return (
    <>
      <span aria-hidden="true"> *</span>
      <span className="sr-only"> (required)</span>
    </>
  );
};

export { OnboardingFieldBlock, RequiredMark };
