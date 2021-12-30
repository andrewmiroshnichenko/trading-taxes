import { GenericDataItem, IGenericParseResult } from "../../types/types";
import { changeRevolutDateFormat } from "../datetimeManipulations";

export const revolutTransactionActivities = new Set(["SELL", "BUY"]);
export const revolutDividendActivities = new Set(["DIV", "DIVNRA"]);
const validActivityTypes = new Set([
  ...revolutTransactionActivities,
  ...revolutDividendActivities,
]);

// date | symbol ((SELL/BUY/DIVIDEND) | type | quantity (number of shares, SELL/BUY) | price (BUY/SELL) | amount | currency

export const transformRevolutRow = (rowString: string): GenericDataItem => {
  const [
    tradeDate,
    symbol,
    activityType,
    quantity,
    price,
    amount,
    currency,
  ] = rowString.replace(/"/g, "").split(",");
  const dealSign = -1 * Math.sign(parseFloat(quantity));

  return {
    price: dealSign * parseFloat(price),
    tradeDate: changeRevolutDateFormat(tradeDate.split(" ")[0]),
    amount: dealSign ? dealSign * parseFloat(amount) : parseFloat(amount),
    currency,
    quantity: Math.abs(parseFloat(quantity)),
    symbol,
    activityType,
  } as GenericDataItem;
};

export const transformRevolutCsvToGeneric = (
  text: string
): IGenericParseResult => {
  const allActivities = new Set<string>();

  const items = text
    .split("\n")
    .filter((item) => !isNaN(parseInt(item, 10)))
    .map(transformRevolutRow)
    .filter((v) => {
      allActivities.add(v.activityType);

      return validActivityTypes.has(v.activityType);
    });

  const excludedOperations = [...allActivities].filter(
    (activity) => !validActivityTypes.has(activity)
  );

  return { excludedOperations, items };
};
