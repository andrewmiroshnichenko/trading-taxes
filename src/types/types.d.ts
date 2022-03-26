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
  activityType: DividendActivities;
  symbol: string;
  quantity: 0;
  price: 0;
};

export type ITrade = GenericDataItemCommonFields & {
  activityType: TradeActivities;
  symbol: string;
  // Number of shares. Should alway be positive
  quantity: number;
  // For SELL price should be positive, because user is receiving money to his acc
  // For BUY price is negative, because user is spending
  price: number;
};

export type IFee = GenericDataItemCommonFields & {
  activityType: FeeActivities;
  symbol: string;
  quantity: 0;
  price: 0;
};

export type GenericDataItem = IDividendOrCommission | ITrade | IFee;

export type DataItemWithPln<T extends GenericDataItem> = T & {
  pricePln: number;
  rate: number;
  amountPln: number;
};

export interface IDividendsWithSum {
  dividendRows: DataItemWithPln[];
  totalDividendsPln: number;
  totalTaxesPln: number;
}

export type TradeWithProfit = DataItemWithPln<ITrade> & {
  dealProfitPln: number;
};

export interface TradesWithTotalSum {
  tradesRows: TradeWithProfit[];
  totalTradesProfitPln: number;
}

export interface IFeeWithSum {
  feeRows: DataItemWithPln<IFee>[];
  totalFeesPln: number;
}

export interface ITimeRange {
  endDate: string;
  startDate: string;
}

interface IGenericParseResult {
  items: GenericDataItem[];
  excludedOperations: string[];
}

export type IBrokerTypes = "EXANTE_ALL" | "REVOLUT" | "EXANTE_TRADES";

export type TradeActivities = "BUY" | "SELL";
export type DividendActivities = "DIVIDEND" | "TAX";
export type FeeActivities = "FEE" | "ROLLOVER" | "INTEREST";
export type UnsupportedActivity = "UNSUPPORTED_ACTIVITY";

export type AllActivities =
  | TradeActivities
  | DividendActivities
  | FeeActivities
  | UnsupportedActivity;
