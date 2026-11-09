import { FormField } from '@/components/form/form-field';
import { FieldLabel } from '@repo/ui/components/field';
import { Input } from '@repo/ui/components/input';
import { Separator } from '@repo/ui/components/separator';

type DisplayNameInputProps = {
  disabled?: boolean;
};

const DisplayNameInput = ({ disabled = false }: DisplayNameInputProps) => {
  return (
    <FormField
      name="name"
      description="this is the name people see on activities — not your telegram handle."
      label={
        <div className="pt-2">
          <Separator className="mb-6 bg-foreground/20" />
          <div className="mb-5 flex items-end justify-between gap-4">
            <span
              className="font-display text-3xl font-medium tracking-[-0.04em] text-foreground/15 sm:text-4xl"
              aria-hidden="true"
            >
              02
            </span>
            <FieldLabel htmlFor="edit-profile-name" className="text-label">
              display name
            </FieldLabel>
          </div>
        </div>
      }
    >
      {(field, controlProps) => (
        <Input
          {...field}
          {...controlProps}
          disabled={disabled}
          autoComplete="nickname"
          autoCapitalize="words"
          spellCheck={false}
          placeholder="how you want to be called"
          className="h-12 text-base transition-colors duration-200"
        />
      )}
    </FormField>
  );
};

export { DisplayNameInput };
