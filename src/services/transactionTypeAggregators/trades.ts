import {
  DataItemWithPln,
  TradesWithTotalSum,
  TradeWithProfitAndCrossLinks,
} from "../../types";
import { revolutTransactionActivities } from "../transformers/revoluteToGeneric";

interface TradeWithIndex extends DataItemWithPln {
  indexInArray: number;
}

const getOtherActivity = (action: string): string => {
  const keys = Array.from(revolutTransactionActivities);
  return keys.find((value) => value !== action) as string;
};

export const getTradesWithTotalSum = (genericData: DataItemWithPln[]): any => {
  const dealsMap = new Map() as Map<string, Record<string, TradeWithIndex[]>>;

  const tradesFilteredAndSorted = genericData
    .filter((item) => revolutTransactionActivities.has(item.activityType))
    .sort((itemA, itemB) =>
      Date.parse(itemA.tradeDate) > Date.parse(itemB.tradeDate) ? 1 : -1
    )
    .map((trade, index) => {
      const newTrade = {
        ...trade,
        indexInArray: index,
        quantity: Math.abs(trade.quantity),
      };
      if (!dealsMap.has(trade.symbol)) {
        dealsMap.set(trade.symbol, {
          [trade.activityType]: [newTrade],
        });
      } else {
        const existingSymbolData = dealsMap.get(trade.symbol) as Record<
          string,
          TradeWithIndex[]
        >;

        existingSymbolData[trade.activityType] = (
          existingSymbolData[trade.activityType] || []
        ).concat(newTrade);
      }

      return newTrade;
    })
    .map((trade) => {
      const { activityType, symbol } = trade;
      const otherActivityType = getOtherActivity(activityType);
      const symbolData = dealsMap.get(symbol) as Record<
        string,
        TradeWithIndex[]
      >;
      const [boundTrade, ...nextBoundTrades] =
        symbolData[otherActivityType] || [];
      const [currentTrade, ...nextCurrentTrades] =
        symbolData[activityType] || [];

      if (!boundTrade) {
        return currentTrade;
      }
      if (currentTrade.indexInArray < boundTrade.indexInArray) {
        return {
          ...trade,
          correspondingTrades: [],
        };
      }
      const dealProfitPln = calculateDealProfit(
        currentTrade.quantity,
        currentTrade.pricePln,
        boundTrade.quantity,
        boundTrade.pricePln
      );

      if (currentTrade.quantity === boundTrade.quantity) {
        symbolData[otherActivityType] = nextBoundTrades;
        symbolData[activityType] = nextCurrentTrades;
        return {
          ...currentTrade,
          correspondingTrades: [boundTrade.indexInArray],
          dealProfitPln,
        };
      }

      if (currentTrade.quantity < boundTrade.quantity) {
        symbolData[activityType] = nextCurrentTrades;
        boundTrade.quantity = boundTrade.quantity - currentTrade.quantity;

        return {
          ...currentTrade,
          correspondingTrades: [boundTrade.indexInArray],
          dealProfitPln,
        };
      }

      if (currentTrade.quantity > boundTrade.quantity) {
        const { trade: summaryTrade, finalBoundArr } = sumAllBoundTrades({
          trade: currentTrade,
          finalBoundArr: symbolData[otherActivityType],
        });

        symbolData[otherActivityType] = finalBoundArr;
        if (summaryTrade.quantity === 0) {
          symbolData[activityType] = nextCurrentTrades;
        }

        return {
          ...currentTrade,
          correspondingTrades: summaryTrade.correspondingTrades,
          dealProfitPln: summaryTrade.dealProfitPln,
        };
      }
    });

  return tradesFilteredAndSorted;
};
function sumAllBoundTrades({
  finalBoundArr,
  trade,
}: {
  trade: TradeWithProfitAndCrossLinks;
  finalBoundArr: TradeWithIndex[];
}): {
  trade: TradeWithProfitAndCrossLinks;
  finalBoundArr: TradeWithIndex[];
} {
  const [currentBound, ...otherBound] = finalBoundArr;

  if (currentBound.quantity < trade.quantity) {
    trade.quantity = trade.quantity - currentBound.quantity;
    return sumAllBoundTrades({
      finalBoundArr: otherBound,
      trade: {
        ...trade,
        correspondingTrades: [
          ...(trade.correspondingTrades || []),
          currentBound.indexInArray,
        ],
        dealProfitPln: calculateDealProfit(
          currentBound.quantity,
          trade.pricePln,
          currentBound.quantity,
          currentBound.pricePln,
          trade.dealProfitPln
        ),
      },
    });
  } else {
    const isTradeSmallerThanBound = currentBound.quantity > trade.quantity;
    if (isTradeSmallerThanBound) {
      currentBound.quantity = currentBound.quantity - trade.quantity;
    } else {
      currentBound.quantity = 0;
    }
    return {
      finalBoundArr: isTradeSmallerThanBound ? finalBoundArr : otherBound,
      trade: {
        ...trade,
        correspondingTrades: [
          ...(trade.correspondingTrades || []),
          currentBound.indexInArray,
        ],
        dealProfitPln: calculateDealProfit(
          trade.quantity,
          trade.pricePln,
          trade.quantity,
          currentBound.pricePln,
          trade.dealProfitPln
        ),
      },
    };
  }
}

function calculateDealProfit(
  tradeQuantity: number,
  tradePrice: number,
  boundTradeQuantity: number,
  boundTradePrice: number,
  prevProfit = 0
): number {
  return (
    prevProfit +
    tradePrice * tradeQuantity -
    boundTradePrice * boundTradeQuantity
  );
}
