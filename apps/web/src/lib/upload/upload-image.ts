import { getPresignedUrl } from './get-presigned-url';
import { putFile } from './put-file';

export const uploadImage = async (file: File) => {
  const { url, key } = await getPresignedUrl({
    size: file.size,
    contentType: file.type,
  });

  await putFile(url, file);

  return key;
};
