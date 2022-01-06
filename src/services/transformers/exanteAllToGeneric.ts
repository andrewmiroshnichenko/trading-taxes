import {
  GenericDataItem,
  IGenericParseResult,
  AllActivities,
  UnsupportedActivity,
} from "../../types/types";
import { changeExanteDateFormat } from "../datetimeManipulations";
import { filterOutUnsupportedActivities, itemsFromTextString } from "./utils";

const validActivityTypes = new Set([
  "DIVIDEND",
  "COMMISSION",
  "INTEREST",
  "TAX",
  "ROLLOVER",
  "TRADE", // Trade is valid activity, but should be calculated from different source file
]);
const EXANTE_FIELD_DELIMITER = ",";

const getActivityType = (type: string): AllActivities => {
  if (type === "DIVIDEND") {
    return "DIVIDEND";
  } else if (type === "TAX") {
    return "TAX";
  } else if (type === "COMMISSION") {
    return "FEE";
  } else if (type === "INTEREST") {
    return "INTEREST";
  } else if (type === "ROLLOVER") {
    return "ROLLOVER";
  } else if (type === "TRADE") {
    // Trade is valid activity, but should be calculated from different source file
    return "UNSUPPORTED_ACTIVITY";
  }

  return "UNSUPPORTED_ACTIVITY";
};

export const collectExcludedOperations = (transactionString: string[]) =>
  Array.from(
    new Set(
      transactionString
        // Here we rely on a fact, that activityType will remain a fifth item in a Exante csv row
        .map((line) => line.replace(/"/g, "").split(EXANTE_FIELD_DELIMITER)[4])
        .filter((activity) => !validActivityTypes.has(activity))
    )
  );

// This is data structure of Exante csv export as of 01.2022. NOTE: Trades are not included here purposely !!!!
// TransactionID (not used) | AccountID (not used) | SymbolID (not all types) | ISIN (not used)
// Type | DateTime | amount | currency | (other non-used fields)
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
    // Symbol in Exante has format BA.NYSE (second part for exchange name). We need only ticker
    symbol: symbol === "None" ? "" : symbol.split(".")[0],
    currency,
    activityType: getActivityType(activityType),
    quantity: 0,
    amount: Math.abs(parseFloat(amount)),
    // Only date part from DateTime value is needed
    tradeDate: changeExanteDateFormat(tradeDate.split(" ")[0]),
  } as GenericDataItem;
};

export const transformExanteCsvToGeneric = (
  text: string
): IGenericParseResult => {
  const items = itemsFromTextString(text);

  return {
    excludedOperations: collectExcludedOperations(items),
    items: items.map(transformExanteRow).filter(filterOutUnsupportedActivities),
  };
};
