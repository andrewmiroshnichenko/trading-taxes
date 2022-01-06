import {
  GenericDataItem,
  IGenericParseResult,
  AllActivities,
  UnsupportedActivity,
} from "../../types/types";
import { changeExanteDateFormat } from "../datetimeManipulations";
import { filterOutUnsupportedActivities } from "./utils";

const getActivityType = (type: string): AllActivities => {
  if (type === "DIVIDEND") {
    return "DIVIDEND";
  } else if (type === "TAX") {
    return "TAX";
  }

  return "UNSUPPORTED_ACTIVITY";
};

export const transformExanteRow = (
  row: string
): GenericDataItem | { activityType: UnsupportedActivity } => {
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

  const items = text
    .split("\n")
    .reverse()
    .filter((item) => !item.includes("TRADE") && item !== "");

  const excludedOperations = Object.values(allActivities);

  return {
    excludedOperations,
    items: items.map(transformExanteRow).filter(filterOutUnsupportedActivities),
  };
};
