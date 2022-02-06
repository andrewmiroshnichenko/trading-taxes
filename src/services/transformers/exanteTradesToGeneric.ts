import {
  GenericDataItem,
  IGenericParseResult,
  AllActivities,
  UnsupportedActivity,
  ITrade,
} from "../../types/types";
import { parseFloatWithDealSign } from "../../utils/number";
import {
  changeExanteDateFormat,
  changeExanteTradeDateFormat,
} from "../datetimeManipulations";
import { filterOutUnsupportedActivities, itemsFromTextString } from "./utils";

const EXANTE_FIELD_DELIMITER = ",";

const validActivityTypes = new Set(["SELL", "BUY"]);

const getActivityType = (type: string): AllActivities => {
  if (type === "sell") {
    return "SELL";
  } else if (type === "buy") {
    return "BUY";
  }

  return "UNSUPPORTED_ACTIVITY";
};

export const collectExcludedOperations = (transactionString: string[]) =>
  Array.from(
    new Set(
      transactionString
        // Here we rely on a fact, that activityType will remain a third item in a Exante trade report csv row
        .map((line) => line.replace(/"/g, "").split(EXANTE_FIELD_DELIMITER)[2])
        .filter((activity) => !validActivityTypes.has(activity.toUpperCase()))
    )
  );

// This is data structure of Exante trades csv export as of 01.2022. NOTE: All other operations are derived from other report!
// DateTime | AccountID (not used) | Side(transaction type) | Symbol ID | ISIN (not used) | Type(type of security, not used)
// Price | Currency | Quantity (of shares) | Commission | Commission Currency (not used) | P&L (not used) | Amount | Other fields
export const transformExanteRow = (
  row: string
): ITrade | { activityType: UnsupportedActivity } => {
  const [
    tradeDate,
    accountId,
    activityType,
    symbol,
    isin,
    securityType,
    price,
    currency,
    quantity,
    commission,
    commissionCurrency,
    profLoss,
    amount,
  ] = row.split(EXANTE_FIELD_DELIMITER);

  const dealSign = activityType.toUpperCase() === "BUY" ? -1 : 0;

  return {
    tradeDate: changeExanteTradeDateFormat(tradeDate.split(" ")[0]),
    currency,
    amount: parseFloatWithDealSign(amount, dealSign),
    activityType: getActivityType(activityType),
    // Symbol in Exante has format BA.NYSE (second part for exchange name). We need only ticker
    symbol: symbol.split(".")[0],
    quantity: parseInt(quantity, 10),
    price: parseFloatWithDealSign(amount, dealSign),
    // Only date part from DateTime value is needed
  } as ITrade;
};

export const transformExanteTradesCsvToGeneric = (
  text: string
): IGenericParseResult => {
  const items = itemsFromTextString(text);

  return {
    excludedOperations: collectExcludedOperations(items),
    items: items
      .map(transformExanteRow)
      .filter(filterOutUnsupportedActivities) as GenericDataItem[],
  };
};
