import { randomUUID } from 'crypto';

export const createUploadKey = (userId: string) =>
  `uploads/${userId}/${randomUUID()}`;
