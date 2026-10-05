import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@repo/ui/components/field';
import { Input } from '@repo/ui/components/input';
import type { UseFormRegisterReturn } from 'react-hook-form';

import {
  OnboardingFieldBlock,
  RequiredMark,
} from '@/features/onboarding/components/onboarding-field-block';

type OnboardingNameFieldProps = {
  registration: UseFormRegisterReturn;
  error?: string;
};

const OnboardingNameField = ({
  registration,
  error,
}: OnboardingNameFieldProps) => {
  return (
    <Field data-invalid={!!error}>
      <OnboardingFieldBlock index="02">
        <FieldLabel htmlFor="onboarding-name" className="text-label">
          display name
          <RequiredMark />
        </FieldLabel>
      </OnboardingFieldBlock>

      <Input
        id="onboarding-name"
        type="text"
        autoComplete="nickname"
        autoCapitalize="words"
        spellCheck={false}
        placeholder="how you want to be called"
        aria-required="true"
        aria-invalid={!!error}
        aria-describedby="onboarding-name-hint onboarding-name-error"
        className="h-12 text-base transition-colors duration-200"
        {...registration}
      />
      <FieldDescription id="onboarding-name-hint">
        this is the name people see on activities — not your telegram handle.
      </FieldDescription>
      <FieldError
        id="onboarding-name-error"
        className="min-h-4 text-[11px] leading-4"
      >
        {error}
      </FieldError>
    </Field>
  );
};

export { OnboardingNameField };
