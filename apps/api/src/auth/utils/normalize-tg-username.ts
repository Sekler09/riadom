const normalizeTgUsername = (
  value: string | null | undefined,
): string | null => {
  if (!value) {
    return null;
  }

  const normalized = value.trim().replace(/^@/, '').toLowerCase();
  return normalized.length > 0 ? normalized : null;
};

export { normalizeTgUsername };
