import {
  GenericDataItem,
  IGenericParseResult,
  AllActivities,
  UnsupportedActivity,
} from "../../types/types";
import { changeExanteDateFormat } from "../datetimeManipulations";
import { filterOutUnsupportedActivities } from "./utils";

const validActivityTypes = new Set([
  "DIVIDEND",
  "COMMISSION",
  "INTEREST",
  "TAX",
]);
const EXANTE_FIELD_DELIMITER = " ";

const getActivityType = (type: string): AllActivities => {
  if (type === "DIVIDEND") {
    return "DIVIDEND";
  } else if (type === "TAX") {
    return "TAX";
  }

  return "UNSUPPORTED_ACTIVITY";
};

export const collectExcludedOperations = (transactionString: string[]) =>
  transactionString
    // Here we rely on a fact, that activityType will remain a fifth item in a Exante csv row
    .map((line) => line.replace(/"/g, "").split(EXANTE_FIELD_DELIMITER)[4])
    .filter((activity) => !validActivityTypes.has(activity));

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
  ] = row.split(EXANTE_FIELD_DELIMITER);

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
  const items = text
    .split("\n")
    .reverse()
    .filter((item) => !item.includes("TRADE") && item !== "");

  return {
    excludedOperations: collectExcludedOperations(items),
    items: items.map(transformExanteRow).filter(filterOutUnsupportedActivities),
  };
};
