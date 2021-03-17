import { IDataStore } from "../../types";
import { IUpdateDataAction } from "../actionCreators/dataActions";
import { UPDATE_DATA_STORE } from "../actionTypes";

const defaultState: IDataStore = {
  dividends: "",
  trades: "",
  dividendsTotal: 0,
  tradesTotal: 0,
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
