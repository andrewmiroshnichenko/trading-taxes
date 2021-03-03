type SupportedCurrencies = "USD";

export interface Rate {
  date: string;
  rate: number;
  currencyCode: SupportedCurrencies;
}

export interface NbpResponse {
  code: SupportedCurrencies;
  rates: Omit<Rate, "currencyCode">[];
}

export interface GenericDataItem {
  tradeDate: string;
  currency: string;
  activityType: string;
  symbol: string;
  quantity: string;
  price: string;
  amount: string;
}
