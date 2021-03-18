import { IDataStore, IUpdateDataAction } from "../../types/redux";
import { UPDATE_DATA_STORE } from "../actionTypes";

export const updateDataStore = (data: IDataStore): IUpdateDataAction => ({
  type: UPDATE_DATA_STORE,
  payload: { ...data },
});
