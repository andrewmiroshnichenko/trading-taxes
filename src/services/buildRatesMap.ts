import { Rate } from "../types/types";

export const buildRatesMap = (rates: Rate[]): Map<string, number> => {
  return rates.reduce((acc, rate) => {
    acc.set(rate.date, rate.value);

    return acc;
  }, new Map<string, number>());
};
