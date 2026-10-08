export const takeFirstOrThrow = <T>(
  rows: T[],
  error: Error = new Error('Expected a row'),
): T => {
  const row = rows[0];
  if (row === undefined) throw error;
  return row;
};
