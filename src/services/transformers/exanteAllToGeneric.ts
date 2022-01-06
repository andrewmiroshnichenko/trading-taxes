import { GenericDataItem, IGenericParseResult } from "../../types/types";
import { changeExanteDateFormat } from "../datetimeManipulations";

const getActivityType = (type: string): string => {
  if (type === "DIVIDEND") {
    return "DIV";
  } else if (type === "TAX") {
    return "DIVNRA";
  }

  return type;
};

export const transformExanteRow = (row: string): GenericDataItem => {
  const [
    notUsed0,
    notUsed1,
    symbol,
    notUsed3,
    activityType,
    tradeDate,
    amount,
    currency,
  ] = row.split(",");

  return {
    price: 0,
    symbol: symbol === "None" ? "" : symbol,
    currency,
    activityType: getActivityType(activityType),
    quantity: 0,
    amount: Math.abs(parseFloat(amount)),
    tradeDate: changeExanteDateFormat(tradeDate.split(" ")[0]),
  } as GenericDataItem;
};

export const transformExanteCsvToGeneric = (
  text: string
): IGenericParseResult => {
  const allActivities = new Set<string>();

  const [_, ...dataItems] = text.split("\n");

  const items = dataItems
    .reverse()
    .filter((item) => !item.includes("TRADE") && item !== "")
    .map(transformExanteRow);

  const excludedOperations = Object.values(allActivities);

  return { excludedOperations, items };
};
