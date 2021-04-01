import { GenericDataItem, IGenericParseResult } from "../../types/types";

export const revolutTransactionActivities = new Set(["SELL", "BUY"]);
export const revolutDividendActivities = new Set(["DIV", "DIVNRA"]);
const validActivityTypes = new Set([
  ...revolutTransactionActivities,
  ...revolutDividendActivities,
]);

export const transformRevolutRow = (rowString: string): GenericDataItem => {
  const params = rowString.replace(/"/g, "").split(",");
  const dealSign = -1 * Math.sign(parseFloat(params[7]));
  const tradeDate = params[0];
  const currency = params[2];
  const amount = dealSign
    ? dealSign * parseFloat(params[9])
    : parseFloat(params[9]);
  const price = dealSign * parseFloat(params[8]);
  const quantity = Math.abs(parseFloat(params[7]));
  const symbol = params[5];
  const activityType = params[3];

  return {
    price,
    tradeDate,
    amount,
    currency,
    quantity,
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
    .map(transformRevolutRow)
    .filter((v, index) => {
      if (index !== 0) {
        allActivities.add(v.activityType);
      }
      return index !== 0 && validActivityTypes.has(v.activityType);
    });

  const excludedOperations = [...allActivities].filter(
    (activity) => !validActivityTypes.has(activity)
  );

  return { excludedOperations, items };
};
