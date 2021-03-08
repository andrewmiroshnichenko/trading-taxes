type SupportedCurrencies = "USD";

export interface Rate {
  date: string;
  value: number;
  currencyCode: SupportedCurrencies;
}

export interface NbpResponse {
  code: SupportedCurrencies;
  rates: { mid: number; effectiveDate: string }[];
}

export interface GenericDataItem {
  tradeDate: string;
  currency: string;
  activityType: string;
  symbol: string;
  quantity: number;
  price: number;
  amount: number;
}

export interface DataItemWithPln extends GenericDataItem {
  pricePln: number;
  rate: number;
  amountPln: number;
}

export interface DividendsWithSum {
  dividendRows: DataItemWithPln[];
  totalDividendsPln: number;
  totalTaxesPln: number;
}

export interface TradeWithProfitAndCrossLinks extends DataItemWithPln {
  correspondingTrades?: number[];
  dealProfitPln?: number;
}

export interface TradesWithTotalSum {
  tradesRows: TradeWithProfitAndCrossLinks[];
  totalTradesProfitPln: number;
}
