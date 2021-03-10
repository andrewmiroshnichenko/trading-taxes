import {
  DataItemWithPln,
  TradesWithTotalSum,
  TradeWithProfitAndCrossLinks,
} from "../../types";
import { revolutTransactionActivities } from "../transformers/revoluteToGeneric";

const getOtherActivity = (action: string): string => {
  const keys = Array.from(revolutTransactionActivities);
  return keys.find((value) => value !== action) as string;
};

export const getTradesWithTotalSum = (genericData: DataItemWithPln[]): any => {
  const dealsMap = new Map() as Map<string, number[]>;

  const tradesFilteredAndSorted = genericData
    .filter((item) => revolutTransactionActivities.has(item.activityType))
    .sort((itemA, itemB) =>
      Date.parse(itemA.tradeDate) > Date.parse(itemB.tradeDate) ? 1 : -1
    )
    .map((trade) => {
      if (!dealsMap.has(trade.symbol)) {
        dealsMap.set(trade.symbol, []);
      }

      const arrayOfSharePrices = dealsMap.get(trade.symbol) as number[];
      const tradeSign = Math.sign(trade.quantity);
      const arrayOfSharePricesLength = arrayOfSharePrices?.length;

      if (
        arrayOfSharePricesLength === 0 ||
        arrayOfSharePrices[0] * trade.quantity > 0
      ) {
        const currentArrayOfSharePrices = arrayOfSharePrices.length;
        for (let i = 0; i < tradeSign * trade.quantity; i++) {
          arrayOfSharePrices[currentArrayOfSharePrices + i] =
            trade.pricePln * tradeSign;
        }
        return trade;
      } else {
        let dealProfitPln = 0;
        const remainedNumberOfTradeShares =
          tradeSign * trade.quantity - arrayOfSharePricesLength;

        const lowestLength =
          remainedNumberOfTradeShares <= 0
            ? tradeSign * trade.quantity
            : arrayOfSharePricesLength;

        for (let i = 0; i < lowestLength; i++) {
          dealProfitPln +=
            trade.pricePln * tradeSign + (arrayOfSharePrices.shift() as number);
        }
        for (let i = 0; i < remainedNumberOfTradeShares; i++) {
          arrayOfSharePrices[i] = trade.pricePln * tradeSign;
        }
        return { ...trade, dealProfitPln, numberOfMatchedShares: lowestLength };
      }
    });

  return tradesFilteredAndSorted;
};
