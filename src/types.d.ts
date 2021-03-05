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

export interface ExtendedGenericDataItemWithPln extends GenericDataItem {
  pricePln: number;
  rate: number;
  amountPln: number;
}

export interface DividendsWithSum {
  dividendRows: ExtendedGenericDataItemWithPln[];
  totalDividendsPln: number;
  totalTaxesPln: number;
}
