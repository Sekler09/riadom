export const isUserUploadKey = (key: string, userId: string) =>
  key.startsWith(`uploads/${userId}/`);
