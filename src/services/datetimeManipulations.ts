import format from "date-fns/format";
import subDays from "date-fns/subDays";

export const formatToGeneralDate = (date: number | Date): string =>
  format(date, "yyyy-MM-dd");

export const subtractDaysAndFormatDate = (
  date: number | Date,
  daysToSubtract: number
): string => formatToGeneralDate(subDays(date, daysToSubtract));

export const subtractYear = (date: number | Date): number =>
  Date.parse(subDays(date, 365).toUTCString());
