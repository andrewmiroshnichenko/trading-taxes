import { GenericDataItem, IGenericParseResult } from "../../types";

const REVOLUT_ROW_PROPERTIES: (keyof GenericDataItem | null)[] = [
  "tradeDate",
  null,
  "currency",
  "activityType",
  null,
  "symbol",
  null,
  "quantity",
  "price",
  "amount",
];
export const revolutTransactionActivities = new Set(["SELL", "BUY"]);
export const revolutDividendActivities = new Set(["DIV", "DIVNRA"]);
const validActivityTypes = new Set([
  ...revolutTransactionActivities,
  ...revolutDividendActivities,
]);

export const mapRevolutCsvRowToGenericObject = (
  acc: GenericDataItem,
  item: string,
  index: number
): GenericDataItem => {
  const key = REVOLUT_ROW_PROPERTIES[index];
  if (key === "amount" || key === "price" || key === "quantity") {
    acc[key] = parseFloat(item);
  } else if (key !== null) {
    acc[key] = item;
  }

  return acc;
};

export const transformRevolutRow = (rowString: string): GenericDataItem =>
  rowString
    .replace(/"/g, "")
    .split(",")
    .reduce(mapRevolutCsvRowToGenericObject, {} as GenericDataItem);

export const transformRevolutCsvToGeneric = (
  text: string
): IGenericParseResult => {
  const allActivities = new Set<string>();

  const items = text
    .split("\n")
    .map(transformRevolutRow)
    .filter((v, index) => {
      return index !== 0 && validActivityTypes.has(v.activityType);
    });

  const excludedOperations = [...allActivities].filter(
    (activity) => !validActivityTypes.has(activity)
  );

  return { excludedOperations, items };
};
