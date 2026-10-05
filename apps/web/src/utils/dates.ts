import { format, parse, isValid } from 'date-fns';

const ISO = 'yyyy-MM-dd';

export const isoToDate = (value?: string): Date | undefined => {
  if (!value) return undefined;
  const d = parse(value, ISO, new Date());
  return isValid(d) ? d : undefined;
};

export const dateToIso = (date: Date): string => format(date, ISO);
