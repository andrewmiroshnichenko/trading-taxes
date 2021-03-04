import { extendedGenericDataItemWIthPln, GenericDataItem } from "../types";
import { subtractDaysAndFormatDate } from "./datetimeManipulations";

// TODO use reselect here
const getRateForGivenDate = (
  date: string,
  ratesMap: Map<string, number>
): number => {
  if (ratesMap.has(date)) {
    return ratesMap.get(date) as number;
  } else {
    const prevDate = subtractDaysAndFormatDate(Date.parse(date), 1);
    return getRateForGivenDate(prevDate, ratesMap);
  }
};

export const extendGenericDataWithPln = (
  genericData: GenericDataItem[],
  ratesMap: Map<string, number>
): extendedGenericDataItemWIthPln[] =>
  genericData.map((item) => {
    const properRate = getRateForGivenDate(item.tradeDate, ratesMap);
    const pricePln = parseFloat((properRate * item.price).toPrecision(2));
    return { ...item, rate: properRate, pricePln };
  });
