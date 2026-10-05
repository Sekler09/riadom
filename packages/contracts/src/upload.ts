import z from 'zod';

const IMAGE_ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const GetPresignedUrlSchema = z.object({
  contentType: z.string().refine((s) => IMAGE_ACCEPTED_TYPES.includes(s), {
    error: 'File must be an image',
  }),
  size: z.number().max(5000000, { error: 'Max file size is 5MB.' }),
});

export type GetPresignedUrl = z.infer<typeof GetPresignedUrlSchema>;

export const GetPresignedUrlResponseSchema = z.object({
  key: z.string(),
  url: z.url(),
});

export type GetPresignedUrlResponse = z.infer<
  typeof GetPresignedUrlResponseSchema
>;
