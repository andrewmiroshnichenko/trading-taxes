import {
  AllActivities,
  UnsupportedActivity,
  GenericDataItem,
  IGenericParseResult,
} from "../../types/types";
import {
  parseFloatWithFallbackToZero,
  parseFloatWithDealSign,
} from "../../utils/number";
import { changeRevolutDateFormat } from "../datetimeManipulations";
import { filterOutUnsupportedActivities, itemsFromTextString } from "./utils";

export const revolutTransactionActivities = new Set(["SELL", "BUY"]);
export const revolutDividendActivities = new Set(["DIV", "DIVNRA"]);

const validActivityTypes = new Set(["SELL", "BUY", "DIVIDEND", "CUSTODY_FEE"]);
const REVOLUT_FIELD_DELIMITER = ",";

// Helper functions section

export const collectExcludedOperations = (transactionString: string[]) =>
  transactionString
    // Here we rely on a fact, that activityType will remain a third item in a Revolut csv row
    .map((line) => line.replace(/"/g, "").split(REVOLUT_FIELD_DELIMITER)[2])
    .filter((activity) => !validActivityTypes.has(activity));

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

// Helper functions sections ends

// This is data structure of Revolut csv export as of 01.2022
// date | symbol ((SELL/BUY/DIVIDEND) | type | quantity (number of shares, SELL/BUY) | price (BUY/SELL) | amount | currency

export const transformRevolutRow = (
  rowString: string
): GenericDataItem | { activityType: UnsupportedActivity } => {
  const [tradeDate, symbol, activityType, quantity, price, amount, currency] =
    rowString.replace(/"/g, "").split(REVOLUT_FIELD_DELIMITER);
  // If deal is a BUY, than account loses money, and deal sign should be negative
  // Otherwise, we don't do anything, because other transaction types have proper signs.
  const dealSign = activityType === "BUY" ? -1 : 0;

  return {
    price: parseFloatWithDealSign(price, dealSign),
    tradeDate: changeRevolutDateFormat(tradeDate.split(" ")[0]), // first item is a date, because tradeDate initially is in dateTime "01/01/2020 11:11:11"
    amount: parseFloatWithDealSign(amount, dealSign),
    currency,
    quantity: Math.abs(parseFloatWithFallbackToZero(quantity)),
    symbol,
    activityType: mapRevolutToGenericActivity(activityType),
  } as GenericDataItem;
};

export const transformRevolutCsvToGeneric = (
  text: string
): IGenericParseResult => {
  const items = itemsFromTextString(text);

  return {
    excludedOperations: collectExcludedOperations(items),
    items: items
      .map(transformRevolutRow)
      .filter(filterOutUnsupportedActivities),
  };
};
