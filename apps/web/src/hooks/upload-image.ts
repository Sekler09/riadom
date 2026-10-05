import { uploadImage } from '@/lib/upload/upload-image';
import { useMutation } from '@tanstack/react-query';

export const useUploadImage = () =>
  useMutation({
    mutationFn: uploadImage,
  });
