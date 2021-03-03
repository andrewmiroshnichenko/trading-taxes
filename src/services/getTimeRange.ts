import format from "date-fns/format";
import { GenericDataItem } from "../types";

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

  const endDate = format(datesMap.get("endDate") as number, "yyyy-MM-dd");
  const startDate = format(datesMap.get("startDate") as number, "yyyy-MM-dd");

  return {
    endDate,
    startDate,
  };
};
