import { IDataStore, IUpdateDataAction } from "../../types/redux";
import { UPDATE_DATA_STORE } from "../actionTypes";

const defaultState: IDataStore = {
  dividends: "",
  trades: "",
  interests: "",
  dividendsTotal: 0,
  tradesTotal: 0,
  interestsTotal: 0,
};

export const dataReducer = (
  state = defaultState,
  action: IUpdateDataAction
): IDataStore => {
  if (action.type === UPDATE_DATA_STORE) {
    return action.payload;
  }

  return state;
};
