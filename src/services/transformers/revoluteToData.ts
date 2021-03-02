const REVOLUT_ROW_PROPERTIES = [
  "tradeDate",
  "settleDate",
  "currency",
  "activityType",
  null,
  "symbol",
  null,
  "quantity",
  "price",
  "amount",
];
const validActivityTypes = new Set(["SELL", "BUY", "DIV", "DIVNRA"]);

// TODO export this interface
interface GenericDataItem {
  [key: string]: string;
}

export const mapCsvRowToRevolutObject = (
  acc: GenericDataItem,
  item: string,
  index: number
): GenericDataItem => {
  const key = REVOLUT_ROW_PROPERTIES[index];
  if (key !== null) {
    acc[key] = item;
  }

  return acc;
};

export const transformRevolutRow = (rowString: string): GenericDataItem =>
  rowString
    .replace(/\\"/g, "")
    .split(",")
    .reduce(mapCsvRowToRevolutObject, {} as GenericDataItem);

export const transformCsvToRevolut = (text: string): GenericDataItem[] =>
  text
    .split("\n")
    .map(transformRevolutRow)
    .filter(
      (v, index) => index !== 0 && validActivityTypes.has(v.activityType)
    );
