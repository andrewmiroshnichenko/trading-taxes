interface GenericDataItem {
  tradeDate: string;
  currency: string;
  activityType: string;
  symbol: string;
  quantity: string;
  price: string;
  amount: string;
}

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
const validActivityTypes = new Set(["SELL", "BUY", "DIV", "DIVNRA"]);

// TODO export this interface

export const mapRevolutCsvRowToGenericObject = (
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
    .reduce(mapRevolutCsvRowToGenericObject, {} as GenericDataItem);

export const transformRevolutCsvToGeneric = (text: string): GenericDataItem[] =>
  text
    .split("\n")
    .map(transformRevolutRow)
    .filter(
      (v, index) => index !== 0 && validActivityTypes.has(v.activityType)
    );
