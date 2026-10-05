import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@repo/ui/components/field';

import { BirthDatePicker } from '@/features/onboarding/components/birth-date-picker';
import {
  OnboardingFieldBlock,
  RequiredMark,
} from '@/features/onboarding/components/onboarding-field-block';
import { dateToIso, isoToDate } from '@/utils/dates';

type OnboardingBirthDateFieldProps = {
  value?: string;
  onChange: (value: string | undefined) => void;
  error?: string;
};

const OnboardingBirthDateField = ({
  value,
  onChange,
  error,
}: OnboardingBirthDateFieldProps) => {
  return (
    <Field data-invalid={!!error}>
      <OnboardingFieldBlock index="03">
        <FieldLabel htmlFor="onboarding-birth-date" className="text-label">
          date of birth
          <RequiredMark />
        </FieldLabel>
      </OnboardingFieldBlock>

      <BirthDatePicker
        id="onboarding-birth-date"
        value={isoToDate(value)}
        onChange={(date) => onChange(date ? dateToIso(date) : undefined)}
        aria-invalid={!!error}
        aria-describedby="onboarding-birth-date-hint onboarding-birth-date-error"
      />
      <FieldDescription id="onboarding-birth-date-hint">
        we show your age on your profile, never the date itself.
      </FieldDescription>
      <FieldError
        id="onboarding-birth-date-error"
        className="min-h-4 text-[11px] leading-4"
      >
        {error}
      </FieldError>
    </Field>
  );
};

export { OnboardingBirthDateField };
