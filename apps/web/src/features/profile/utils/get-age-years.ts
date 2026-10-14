import { differenceInYears, parseISO } from 'date-fns';

const getAgeYears = (birthDate: string) =>
  differenceInYears(new Date(), parseISO(birthDate));

export { getAgeYears };
