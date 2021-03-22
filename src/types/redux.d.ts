import { CHANGE_BROKER_TYPE } from "../redux/actionTypes";
import { IBrokerTypes } from "./types";

export interface IDataStore {
  trades: string;
  dividends: string;
  dividendsTotal: number;
  tradesTotal: number;
  [k: string]: string | number;
}

export interface IUiStore {
  broker: IBrokerTypes;
}

export interface IRootState {
  data: IDataStore;
}

export interface IUpdateDataAction {
  type: typeof UPDATE_DATA_STORE;
  payload: IDataStore;
}

export type IUpdateUiAction = {
  type: typeof CHANGE_BROKER_TYPE;
  payload: IBrokerTypes;
};
