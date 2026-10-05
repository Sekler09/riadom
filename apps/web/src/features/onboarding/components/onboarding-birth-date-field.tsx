import { FormField } from '@/components/form/form-field';
import { FormLabel } from '@/components/form/form-label';

import { BirthDatePicker } from '@/features/onboarding/components/birth-date-picker';
import {
  OnboardingFieldBlock,
  RequiredMark,
} from '@/features/onboarding/components/onboarding-field-block';
import { dateToIso, isoToDate } from '@/utils/dates';

const OnboardingBirthDateField = () => {
  return (
    <FormField
      name="birthDate"
      required
      description="we show your age on your profile, never the date itself."
      errorClassName="min-h-4 text-[11px] leading-4"
      label={
        <OnboardingFieldBlock index="03">
          <FormLabel className="text-label">
            date of birth
            <RequiredMark />
          </FormLabel>
        </OnboardingFieldBlock>
      }
    >
      {(field, controlProps) => (
        <BirthDatePicker
          {...controlProps}
          value={isoToDate(field.value)}
          onChange={(date) =>
            field.onChange(date ? dateToIso(date) : undefined)
          }
        />
      )}
    </FormField>
  );
};

export { OnboardingBirthDateField };
