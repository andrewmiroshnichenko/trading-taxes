import { DataItemWithPln, GenericDataItem } from "../types";
import { subtractDaysAndFormatDate } from "./datetimeManipulations";

// TODO use reselect here
const getRateForGivenDate = (
  date: string,
  ratesMap: Map<string, number>
): number => {
  // According to the Polish laws, rate "need to be taken from the previous working day"
  const prevDate = subtractDaysAndFormatDate(Date.parse(date), 1);
  if (ratesMap.has(prevDate)) {
    return ratesMap.get(prevDate) as number;
  } else {
    return getRateForGivenDate(prevDate, ratesMap);
  }
};

export const extendGenericDataWithPln = (
  genericData: GenericDataItem[],
  ratesMap: Map<string, number>
): DataItemWithPln[] =>
  genericData.map((item) => {
    const properRate = getRateForGivenDate(item.tradeDate, ratesMap);
    const pricePln = parseFloat(
      (parseInt((properRate * item.price * 100).toString()) / 100).toString()
    );
    const amountPln = parseFloat(
      (parseInt((properRate * item.amount * 100).toString()) / 100).toString()
    );
    return { ...item, rate: properRate, pricePln, amountPln };
  });
