export interface IDataStore {
  trades: string;
  dividends: string;
  dividendsTotal: number;
  tradesTotal: number;
  [k: string]: string | number;
}

export interface IRootState {
  data: IDataStore;
}

export interface IUpdateDataAction {
  type: typeof UPDATE_DATA_STORE;
  payload: IDataStore;
}
