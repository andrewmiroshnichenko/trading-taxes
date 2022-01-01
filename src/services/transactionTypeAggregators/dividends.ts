import {
  IDividendsWithSum,
  DataItemWithPln,
  IDividendOrCommission,
  GenericDataItem,
} from "../../types/types";
import { revolutDividendActivities } from "../transformers/revoluteToGeneric";

const DIVIDEND_CSV_HEADER = [
  "Date",
  "Symbol",
  "Operation",
  "Sum",
  "Rate",
  "Sum PLN",
  "Currency",
];

export const prepareDividendToCsv = (
  dividends: DataItemWithPln<IDividendOrCommission>[]
): string =>
  [DIVIDEND_CSV_HEADER]
    .concat(
      dividends.map(
        ({
          tradeDate,
          symbol,
          activityType,
          amount,
          rate,
          amountPln,
          currency,
        }) => [
          tradeDate,
          symbol,
          activityType,
          amount.toString(),
          rate.toString(),
          amountPln.toString(),
          currency,
        ]
      )
    )
    .join("\n");

export const getDividendsWithTotalSum = (
  allData: DataItemWithPln<GenericDataItem>[]
): IDividendsWithSum =>
  allData
    .filter((item) => revolutDividendActivities.has(item.activityType))
    .reduce(
      (acc, item, _, array) => {
        // Decision about type of aggregation field
        const key =
          item.activityType === "DIVIDEND"
            ? "totalDividendsPln"
            : "totalTaxesPln";

        return {
          ...acc,
          dividendRows: array,
          [key]: Number(Number(acc[key] + item.amountPln).toFixed(2)),
        };
      },
      {
        dividendRows: [],
        totalDividendsPln: 0,
        totalTaxesPln: 0,
      } as IDividendsWithSum
    );
