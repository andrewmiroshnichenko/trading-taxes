import { DataItemWithPln, IFeeWithSum, IFee } from "../../types/types";

const FEE_CSV_HEADER = [
  "Date",
  "Symbol",
  "Operation",
  "Sum",
  "Rate",
  "Sum PLN",
  "Currency",
];

const feeActivities = new Set(["ROLLOVER", "COMMISSION", "INTEREST"]);

export const prepareFeeToCsv = (fees: DataItemWithPln[]): string =>
  [FEE_CSV_HEADER]
    .concat(
      fees.map(
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

export const getFeesWithTotalSum = (allData: DataItemWithPln[]): IFeeWithSum =>
  allData
    .filter((item) => feeActivities.has(item.activityType))
    .reduce(
      (acc, item, _, array) => {
        return {
          feeRows: array,
          totalFeesPln: Number(
            Number(acc.totalFeesPln + item.amountPln).toFixed(2)
          ),
        };
      },
      {
        feeRows: [],
        totalFeesPln: 0,
      } as IFeeWithSum
    );
