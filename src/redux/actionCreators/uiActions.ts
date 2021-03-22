import { IUpdateUiAction } from "../../types/redux";
import { IBrokerTypes } from "../../types/types";
import { UPDATE_BROKER_TYPE } from "../actionTypes";

export const updateBrokerType = (type: IBrokerTypes): IUpdateUiAction => ({
  type: UPDATE_BROKER_TYPE,
  payload: type,
});
