import { Input } from '@repo/ui/components/input';

import { FormField } from '@/components/form/form-field';
import { FormLabel } from '@/components/form/form-label';
import {
  OnboardingFieldBlock,
  RequiredMark,
} from '@/features/onboarding/components/onboarding-field-block';

const OnboardingNameField = () => {
  return (
    <FormField
      name="name"
      required
      description="this is the name people see on activities — not your telegram handle."
      errorClassName="min-h-4 text-[11px] leading-4"
      label={
        <OnboardingFieldBlock index="02">
          <FormLabel className="text-label">
            display name
            <RequiredMark />
          </FormLabel>
        </OnboardingFieldBlock>
      }
    >
      {(field, controlProps) => (
        <Input
          {...field}
          {...controlProps}
          type="text"
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

export { OnboardingNameField };
