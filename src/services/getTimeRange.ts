import { GenericDataItem } from "../types";
import {
  formatToGeneralDate,
  subtractDaysAndFormatDate,
} from "./datetimeManipulations";

// We want to shift start date back for few days.
// This is done to ensure that if trade happened in Polish holiday
// If so - rate from previous business day should be picked up
const SAFE_TIME_RANGE = 5;

export const getTimeRange = (
  tradeEntries = [] as GenericDataItem[]
): { endDate: string; startDate: string } => {
  const freshMap = new Map([
    ["startDate", Date.now()],
    ["endDate", 0],
  ]);
  const datesMap = tradeEntries.reduce((acc, item) => {
    const timeStamp = Date.parse(item.tradeDate);
    const currentEndDate = acc.get("endDate");
    const currentStartDate = acc.get("startDate");
    if (!currentEndDate || currentEndDate < timeStamp) {
      acc.set("endDate", timeStamp);
    }

    if (!currentStartDate || currentStartDate > timeStamp) {
      acc.set("startDate", timeStamp);
    }

    return acc;
  }, freshMap);

  const endDate = formatToGeneralDate(datesMap.get("endDate") as number);
  const startDate = subtractDaysAndFormatDate(
    datesMap.get("startDate") as number,
    SAFE_TIME_RANGE
  );

  return {
    endDate,
    startDate,
  };
};
