import {
  DataItemWithPln,
  TradesWithTotalSum,
  TradeWithProfit,
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
        }) => [
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

export const getTradesWithTotalSum = (
  genericData: DataItemWithPln[]
): TradesWithTotalSum => {
  const dealsMap = new Map() as Map<string, number[]>;
  let totalTradesProfitPln = 0;

  const tradesFilteredAndSorted: TradeWithProfit[] = genericData
    .filter((item) => revolutTransactionActivities.has(item.activityType))
    .map((trade) => {
      if (!dealsMap.has(trade.symbol)) {
        dealsMap.set(trade.symbol, []);
      }

      const arrayOfSharePrices = dealsMap.get(trade.symbol) as number[];
      const arrayOfSharePricesLength = arrayOfSharePrices?.length;

      if (
        arrayOfSharePricesLength === 0 ||
        arrayOfSharePrices[0] * trade.pricePln > 0
      ) {
        const currentArrayOfSharePrices = arrayOfSharePrices.length;
        for (let i = 0; i < trade.quantity; i++) {
          arrayOfSharePrices[currentArrayOfSharePrices + i] = trade.pricePln;
        }
        return trade;
      } else {
        let dealProfitPln = 0;
        const remainedNumberOfTradeShares =
          trade.quantity - arrayOfSharePricesLength;

        const lowestLength =
          remainedNumberOfTradeShares <= 0
            ? trade.quantity
            : arrayOfSharePricesLength;

        for (let i = 0; i < lowestLength; i++) {
          const valueFromArr = arrayOfSharePrices.shift() as number;
          dealProfitPln += trade.pricePln + valueFromArr;
        }
        for (let i = 0; i < remainedNumberOfTradeShares; i++) {
          arrayOfSharePrices[i] = trade.pricePln;
        }

        totalTradesProfitPln += dealProfitPln;
        return {
          ...trade,
          dealProfitPln: Number(dealProfitPln.toFixed(2)),
          numberOfMatchedShares: lowestLength,
        };
      }
    });

  return {
    tradesRows: tradesFilteredAndSorted,
    totalTradesProfitPln: Number(totalTradesProfitPln.toFixed(2)),
  };
};
