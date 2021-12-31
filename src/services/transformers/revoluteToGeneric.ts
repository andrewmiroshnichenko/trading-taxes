import {
  AllActivities,
  UnsupportedActivity,
  GenericDataItem,
  IGenericParseResult,
} from "../../types/types";
import { changeRevolutDateFormat } from "../datetimeManipulations";

export const revolutTransactionActivities = new Set(["SELL", "BUY"]);
export const revolutDividendActivities = new Set(["DIV", "DIVNRA"]);

const validActivityTypes = new Set(["SELL", "BUY", "DIVIDEND", "CUSTODY_FEE"]);

// date | symbol ((SELL/BUY/DIVIDEND) | type | quantity (number of shares, SELL/BUY) | price (BUY/SELL) | amount | currency

export function mapRevolutToGenericActivity(
  activityType: string
): AllActivities {
  switch (activityType) {
    case "SELL":
      return "SELL";
    case "BUY":
      return "BUY";
    case "DIVIDEND":
      return "DIVIDEND";
    case "CUSTODY_FEE":
      return "FEE";
    default:
      return "UNSUPPORTED_ACTIVITY";
  }
}

export const transformRevolutRow = (
  rowString: string
): GenericDataItem | { activityType: UnsupportedActivity } => {
  const [
    tradeDate,
    symbol,
    activityType,
    quantity,
    price,
    amount,
    currency,
  ] = rowString.replace(/"/g, "").split(",");
  // If deal is a BUY, than account loses money, and deal sign should be negative
  // Otherwise, we don't do anything, because other transaction types have proper signs.
  const dealSign = activityType === "BUY" ? -1 : 0;

  return {
    price: dealSign ? dealSign * parseFloat(price) : parseFloat(price),
    tradeDate: changeRevolutDateFormat(tradeDate.split(" ")[0]), // first item is a date, because tradeDate initially is in dateTime "01/01/2020 11:11:11"
    amount: dealSign ? dealSign * parseFloat(amount) : parseFloat(amount),
    currency,
    quantity: Math.abs(parseFloat(quantity)),
    symbol,
    activityType: mapRevolutToGenericActivity(activityType),
  } as GenericDataItem;
};

export const transformRevolutCsvToGeneric = (
  text: string
): IGenericParseResult => {
  const validLines = text
    .split("\n")
    .filter((item) => !isNaN(parseInt(item, 10)));

  return {
    excludedOperations: validLines
      // Here we rely on a fact, that activityType will remain a third item in a Revolut csv row
      .map((line) => line.replace(/"/g, "").split(",")[2])
      .filter((activity) => !validActivityTypes.has(activity)),
    items: validLines
      .map(transformRevolutRow)
      .filter(
        (item) => item.activityType !== "UNSUPPORTED_ACTIVITY"
      ) as GenericDataItem[],
  };
};
