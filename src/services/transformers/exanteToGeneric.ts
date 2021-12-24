import { GenericDataItem, IGenericParseResult } from "../../types/types";
import { changeExanteDateFormat } from "../datetimeManipulations";

const getActivityType = (type: string): string => {
  if (type === "DIVIDEND") {
    return "DIV";
  } else if (type === "TAX") {
    return "DIVNRA";
  }

  return type;
};

export const transformExanteRow = (row: string | string[]): GenericDataItem => {
  if (typeof row === "string") {
    const params = row.split(",");
    const symbol = params[2] === "None" ? "" : params[2];
    const tradeDate = changeExanteDateFormat(params[5].split(" ")[0]);
    const activityType = getActivityType(params[4]);
    const currency = params[7];
    const amount = Math.abs(parseFloat(params[6]));

    const quantity = 0;
    const price = 0;

    return {
      price,
      symbol,
      currency,
      activityType,
      quantity,
      amount,
      tradeDate,
    } as GenericDataItem;
  } else {
    const amountContainingPart = row[0].includes(",None,") ? row[0] : row[1];
    const quantityContainingPart = row[0].includes(",None,") ? row[1] : row[0];
    const params = amountContainingPart.split(",");
    const symbol = params[2];
    const tradeDate = changeExanteDateFormat(params[5].split(" ")[0]);

    const amount = parseFloat(params[6]);
    const quantity = Math.abs(parseFloat(quantityContainingPart.split(",")[6]));
    const currency = params[7];
    const activityType = amount < 0 ? "BUY" : "SELL";

    const price = Math.round((amount / quantity) * 10000) / 10000;

    return {
      price,
      symbol,
      currency,
      activityType,
      quantity,
      amount,
      tradeDate,
    } as GenericDataItem;
  }
};

export const transformExanteCsvToGeneric = (
  text: string
): IGenericParseResult => {
  const allActivities = new Set<string>();

  const [_, ...dataItems] = text.split("\n");

  const items = dataItems
    .reverse()
    .reduce((acc, item) => {
      if (item === '') return acc;
      const accLength = acc.length;
      const lastItemInAcc = acc[accLength - 1];
      if (!item.includes("COMMISSION") && !item.includes("TRADE")) {
        acc.push(item);
      } else if (
        item.includes("COMMISSION") &&
        (typeof lastItemInAcc === "object" || accLength === 0)
      ) {
        acc.splice(accLength - 2, 0, item);
      } else if (
        item.includes("COMMISSION") &&
        (typeof lastItemInAcc === "string" || accLength === 0)
      ) {
        acc.push(item);
        acc.push([]);
      } else {
        if (
          typeof lastItemInAcc === "string" ||
          (typeof lastItemInAcc === "object" && lastItemInAcc.length === 2) ||
          accLength === 0
        ) {
          acc.push([item]);
        } else {
          lastItemInAcc.push(item);
        }
      }

      return acc;
    }, [] as (string | string[])[])
    .map(transformExanteRow);

  const excludedOperations = Object.values(allActivities);

  return { excludedOperations, items };
};
