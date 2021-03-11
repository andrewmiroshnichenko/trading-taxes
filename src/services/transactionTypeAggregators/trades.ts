import {
  DataItemWithPln,
  TradesWithTotalSum,
  TradeWithProfit,
} from "../../types";
import { revolutTransactionActivities } from "../transformers/revoluteToGeneric";

// Because of inverted BUY/SELL prices (which means that on BUY operation we have pricePln +10, on SELL it can be -15,
// and total will result in -5, but in fact this deal is closed with profit of 5) we need to invert sign of computed amount
const PROFIT_SIGN_INVERSION = -1;

export const getTradesWithTotalSum = (
  genericData: DataItemWithPln[]
): TradesWithTotalSum => {
  const dealsMap = new Map() as Map<string, number[]>;
  let totalTradesProfitPln = 0;

  const tradesFilteredAndSorted: TradeWithProfit[] = genericData
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
            (trade.pricePln * tradeSign +
              (arrayOfSharePrices.shift() as number)) *
            PROFIT_SIGN_INVERSION;
        }
        for (let i = 0; i < remainedNumberOfTradeShares; i++) {
          arrayOfSharePrices[i] = trade.pricePln * tradeSign;
        }
        totalTradesProfitPln += dealProfitPln;
        return { ...trade, dealProfitPln, numberOfMatchedShares: lowestLength };
      }
    });

  return { tradesRows: tradesFilteredAndSorted, totalTradesProfitPln };
};
