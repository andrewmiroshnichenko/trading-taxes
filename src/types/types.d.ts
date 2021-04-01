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

type GenericDataItemCommonFields = {
  // Format mm/dd/yyyy
  tradeDate: string;
  // USD or ?
  currency: string;
  // For trades - total amount of trade (price * quantity), for other activities - amount of received/spent money
  amount: number;
  // activityType: string;
  // symbol: string;
  // quantity: number;
  // price: number;
};

export type IDividendOrCommission = GenericDataItemCommonFields & {
  activityType: "DIV" | "DIVNRA" | "COMMISSION";
  symbol: string;
  quantity: 0;
  price: 0;
};

export type ITrade = GenericDataItemCommonFields & {
  activityType: "BUY" | "SELL";
  symbol: string;
  // Number of shares. Should alway be positive
  quantity: number;
  // For SELL price should be positive, because user is receiving money to his acc
  // For BUY price is negative, because user is spending
  price: number;
};

export type IInterest = GenericDataItemCommonFields & {
  activityType: "INTEREST";
  symbol: "";
  quantity: 0;
  price: 0;
};

export type GenericDataItem = IDividendOrCommission | ITrade | IInterest;

export type DataItemWithPln = GenericDataItem & {
  pricePln: number;
  rate: number;
  amountPln: number;
};

export interface DividendsWithSum {
  dividendRows: DataItemWithPln[];
  totalDividendsPln: number;
  totalTaxesPln: number;
}

export type TradeWithProfit = DataItemWithPln & {
  dealProfitPln?: number;
};

export interface TradesWithTotalSum {
  tradesRows: TradeWithProfit[];
  totalTradesProfitPln: number;
}

export interface ITimeRange {
  endDate: string;
  startDate: string;
}

interface IGenericParseResult {
  items: GenericDataItem[];
  excludedOperations: string[];
}

export type IBrokerTypes = "EXANTE" | "REVOLUT";
