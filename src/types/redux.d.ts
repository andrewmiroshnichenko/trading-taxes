import { UPDATE_BROKER_TYPE } from "../redux/actionTypes";
import { IBrokerTypes } from "./types";

export interface IDataStore {
  parsedData: {
    trades: string;
    dividends: string;
    fees: string;
    dividendsTotal: number;
    tradesTotal: number;
    feesTotal: number;
    [k: string]: string | number;
  };
}

export interface IUiStore {
  broker: IBrokerTypes;
}

export interface IRootState {
  data: IDataStore;
  ui: IUiStore;
}

export interface IUpdateDataAction {
  type: typeof UPDATE_DATA_STORE;
  payload: IDataStore;
}

export type IUpdateUiAction = {
  type: typeof UPDATE_BROKER_TYPE;
  payload: IBrokerTypes;
};
