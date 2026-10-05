export const putFile = async (url: string, file: File) => {
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  if (!res.ok) throw new Error('Failed to upload an image. Try again later');
  return res;
};
