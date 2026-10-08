import { z } from 'zod';

export const ProfileSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  birthDate: z.iso.date(),
  avatarUrl: z.url(),
});

export type Profile = z.infer<typeof ProfileSchema>;
