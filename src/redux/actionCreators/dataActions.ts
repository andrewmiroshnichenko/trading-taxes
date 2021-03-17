import { IDataStore } from "../../types";
import { UPDATE_DATA_STORE } from "../actionTypes";

interface IUpdateDataAction {
  type: typeof UPDATE_DATA_STORE;
  payload: IDataStore;
}

export const updateDataStore = (data: IDataStore): IUpdateDataAction => ({
  type: UPDATE_DATA_STORE,
  payload: { ...data },
});
