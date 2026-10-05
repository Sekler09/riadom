import { Button } from '@repo/ui/components/button';
import { Loader2 } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';

type SubmitButtonProps = Omit<ComponentProps<typeof Button>, 'type'>;

const SubmitButton = ({ children, disabled, ...props }: SubmitButtonProps) => {
  const { control } = useFormContext();
  const { isSubmitting } = useFormState({ control });

  return (
    <Button
      type="submit"
      disabled={disabled || isSubmitting}
      data-pending={isSubmitting ? '' : undefined}
      aria-busy={isSubmitting || undefined}
      {...props}
    >
      {isSubmitting ? (
        <Loader2
          data-icon="inline-start"
          className="animate-spin"
          aria-hidden="true"
        />
      ) : null}
      {children}
    </Button>
  );
};

export { SubmitButton };
export type { SubmitButtonProps };
