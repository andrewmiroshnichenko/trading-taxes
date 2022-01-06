import format from "date-fns/format";
import subDays from "date-fns/subDays";
import parse from "date-fns/parse";

export const changeRevolutDateFormat = (date: string): string =>
  format(parse(date, "dd/MM/yyyy", new Date()), "MM/dd/yyyy");

export const changeExanteDateFormat = (date: string): string => {
  return format(parse(date, "dd/MM/yyyy", new Date()), "MM/dd/yyyy");
};

export const formatToGeneralDate = (date: number | Date): string =>
  format(date, "yyyy-MM-dd");

export const subtractDaysAndFormatDate = (
  date: number | Date,
  daysToSubtract: number
): string => formatToGeneralDate(subDays(date, daysToSubtract));

export const subtractYear = (date: number | Date): number =>
  Date.parse(subDays(date, 365).toUTCString());
