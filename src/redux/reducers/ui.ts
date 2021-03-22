import { IUiStore, IUpdateUiAction } from "../../types/redux";
import { IBrokerTypes } from "../../types/types";
import { CHANGE_BROKER_TYPE } from "../actionTypes";

export const BROKERS: Record<string, IBrokerTypes> = {
  EXANTE: "EXANTE",
  REVOLUT: "REVOLUT",
};

const defaultState: IUiStore = {
  broker: BROKERS.REVOLUT,
};

export const uiReducer = (
  state = defaultState,
  action: IUpdateUiAction
): IUiStore => {
  if (action.type === CHANGE_BROKER_TYPE) {
    return { ...state, broker: action.payload };
  }

  return state;
};
