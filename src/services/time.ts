import { GenericDataItem, ITimeRange } from "../types/types";
import {
  formatToGeneralDate,
  subtractDaysAndFormatDate,
  subtractYear,
} from "./datetimeManipulations";

// We want to shift start date back for few days.
// This is done to ensure that if trade happened in Polish holiday
// If so - rate from previous business day should be picked up
const SAFE_TIME_RANGE = 5;

export const getTimeRange = (
  tradeEntries = [] as GenericDataItem[]
): ITimeRange => {
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

// NBP has limitation of 367 date range, when querying rates
// Here we're splitting time range, derived from user's file, to have 1-year ranges
export const splitTimeRangeIfNecessary = ({
  endDate,
  startDate,
}: ITimeRange): ITimeRange[] => {
  const ranges = [];
  const originalStartDate = Date.parse(startDate);
  let tempEndDate = Date.parse(endDate);
  do {
    const yearAgoDate = subtractYear(tempEndDate);
    const isBigEnoughRange = originalStartDate < yearAgoDate;
    const tempStartDate = isBigEnoughRange ? yearAgoDate : originalStartDate;
    ranges.push({
      endDate: formatToGeneralDate(tempEndDate),
      startDate: formatToGeneralDate(tempStartDate),
    });
    tempEndDate = yearAgoDate;
  } while (originalStartDate < tempEndDate);

  return ranges;
};
