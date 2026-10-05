import { z } from 'zod';

function maxBirthDateForMinAge(minAge: number, today = new Date()) {
  const y = today.getFullYear() - minAge;
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`; // YYYY-MM-DD
}

export const OnboardingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: 'Display name is required' })
    .max(20, { error: 'Too long' }),
  birthDate: z.iso
    .date()
    .refine((d) => d >= '1900-01-01', { error: 'Too old!' })
    .refine((d) => d <= maxBirthDateForMinAge(16), { error: 'Too young!' }),
  avatarKey: z.string().trim().min(1, { error: 'Photo is required' }),
});

export const OnboardingFormSchema = OnboardingSchema.omit({ avatarKey: true });

export type Onboarding = z.infer<typeof OnboardingSchema>;
export type OnboardingForm = z.infer<typeof OnboardingFormSchema>;
