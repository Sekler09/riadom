import { z } from 'zod';
import { OnboardingSchema } from './onboarding';

const ProfileSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  birthDate: z.iso.date(),
  avatarKey: z.string(),
  avatarUrl: z.url(),
});

type Profile = z.infer<typeof ProfileSchema>;

const EditProfileSchema = OnboardingSchema.pick({
  name: true,
  avatarKey: true,
});

const EditProfileFormSchema = EditProfileSchema.omit({ avatarKey: true });

type EditProfile = z.infer<typeof EditProfileSchema>;
type EditProfileForm = z.infer<typeof EditProfileFormSchema>;

export { ProfileSchema, EditProfileSchema, EditProfileFormSchema };
export type { Profile, EditProfile, EditProfileForm };
