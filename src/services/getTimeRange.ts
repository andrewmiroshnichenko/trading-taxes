import { GenericDataItem } from "../types";

export const getTimeRange = (
  tradeEntries = [] as GenericDataItem[]
): { endDate?: string; startDate?: string } => {
  const emptyMap = new Map([
    ["endDate", Date.now()],
    ["startDate", 0],
  ]);
  const datesMap = tradeEntries.reduce((acc, item) => {
    const timeStamp = Date.parse(item.tradeDate);
    const currentEndDate = acc.get("endDate");
    const currentStartDate = acc.get("startDate");
    if (!currentEndDate || currentEndDate > timeStamp) {
      acc.set("endDate", timeStamp);
    }

    if (!currentStartDate || currentStartDate < timeStamp) {
      acc.set("startDate", timeStamp);
    }

    return acc;
  }, emptyMap);

  return {
    endDate: datesMap.get("endDate")?.toString(),
    startDate: datesMap.get("startDate")?.toString(),
  };
};
