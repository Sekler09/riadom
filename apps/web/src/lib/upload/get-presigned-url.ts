import {
  GetPresignedUrlResponse,
  type GetPresignedUrl,
} from '@repo/contracts/upload';
import { apiClient } from '../api-client';

export const getPresignedUrl = async (file: GetPresignedUrl) => {
  const { data } = await apiClient.post<GetPresignedUrlResponse>(
    '/upload/initiate',
    file,
  );

  return data;
};
