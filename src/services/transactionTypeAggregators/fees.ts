import {
  DataItemWithPln,
  IFeeWithSum,
  IFee,
  GenericDataItem,
} from "../../types/types";

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
const isFeeActivity = (
  item: DataItemWithPln<GenericDataItem>
): item is DataItemWithPln<IFee> => feeActivities.has(item.activityType);

export const prepareFeeToCsv = (fees: DataItemWithPln<IFee>[]): string =>
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
        }): Array<string> => [
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

export const getFeesWithTotalSum = (
  allData: DataItemWithPln<GenericDataItem>[]
): IFeeWithSum =>
  allData.filter(isFeeActivity).reduce(
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
