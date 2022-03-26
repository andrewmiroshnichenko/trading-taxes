import {
  DataItemWithPln,
  TradesWithTotalSum,
  TradeWithProfit,
  ITrade,
  GenericDataItem,
} from "../../types/types";
import { revolutTransactionActivities } from "../transformers/revoluteToGeneric";

const TRADE_CSV_HEADER = [
  "Date",
  "Symbol",
  "Operation",
  "Quantity",
  "Price",
  "Rate",
  "Price PLN",
  "Currency",
  "Deal profit",
];
const isTradeActivity = (
  item: DataItemWithPln<GenericDataItem>
): item is DataItemWithPln<ITrade> =>
  revolutTransactionActivities.has(item.activityType);

export const prepareTradesToCsv = (trades: TradeWithProfit[]): string =>
  [TRADE_CSV_HEADER]
    .concat(
      trades.map(
        ({
          tradeDate,
          symbol,
          activityType,
          quantity,
          price,
          rate,
          pricePln,
          currency,
          dealProfitPln = 0,
        }): Array<string> => [
          tradeDate,
          symbol,
          activityType,
          quantity.toString(),
          price.toString(),
          rate.toString(),
          pricePln.toString(),
          currency,
          dealProfitPln.toString(),
        ]
      )
    )
    .join("\n");

export const doTradeCalculation =
  (dealsMap = new Map<string, number[]>()) =>
  (trade: DataItemWithPln<ITrade>) => {
    if (!dealsMap.has(trade.symbol)) {
      dealsMap.set(trade.symbol, []);
    }

    const arrayOfSharePrices = dealsMap.get(trade.symbol) as number[];
    const arrayOfSharePricesLength = arrayOfSharePrices?.length;
    let dealProfitPln = 0;

    if (
      arrayOfSharePricesLength === 0 ||
      arrayOfSharePrices[0] * trade.pricePln > 0
    ) {
      for (let i = 0; i < trade.quantity; i++) {
        arrayOfSharePrices[arrayOfSharePricesLength + i] = trade.pricePln;
      }
      return {
        ...trade,
        dealProfitPln,
      };
    } else {
      const remainedNumberOfTradeShares =
        trade.quantity - arrayOfSharePricesLength;

      const lowestLength =
        remainedNumberOfTradeShares <= 0
          ? trade.quantity
          : arrayOfSharePricesLength;

      for (let i = 0; i < lowestLength; i++) {
        dealProfitPln +=
          trade.pricePln + (arrayOfSharePrices.shift() as number);
      }
      for (let i = 0; i < remainedNumberOfTradeShares; i++) {
        arrayOfSharePrices[i] = trade.pricePln;
      }

      return {
        ...trade,
        dealProfitPln: Number(dealProfitPln.toFixed(2)),
        numberOfMatchedShares: lowestLength,
      };
    }
  };

export const filterByTimeRange =
  (customStartTimestamp?: string, customEndTimestamp?: string) =>
  (item: Pick<DataItemWithPln<ITrade>, "tradeDate">) => {
    const isGreaterThan = customStartTimestamp
      ? Date.parse(item.tradeDate) > Date.parse(customStartTimestamp)
      : true;
    const isSmallerThen = customEndTimestamp
      ? Date.parse(item.tradeDate) < Date.parse(customEndTimestamp)
      : true;

    return isGreaterThan && isSmallerThen;
  };

export const getTradesWithTotalSum = (
  genericData: DataItemWithPln<GenericDataItem>[],
  customStartTimestamp?: string,
  customEndTimestamp?: string
): TradesWithTotalSum => {
  const tradesFilteredAndSorted: TradeWithProfit[] = genericData
    .filter(isTradeActivity)
    .sort((a, b) =>
      Date.parse(a.tradeDate) > Date.parse(b.tradeDate) ? 1 : -1
    )
    .map(doTradeCalculation())
    .filter(filterByTimeRange(customStartTimestamp, customEndTimestamp));

  return {
    tradesRows: tradesFilteredAndSorted,
    totalTradesProfitPln: Number(
      tradesFilteredAndSorted
        .reduce((acc, item) => acc + item.dealProfitPln, 0)
        .toFixed(2)
    ),
  };
};
