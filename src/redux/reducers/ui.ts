import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUiStore, IUpdateUiAction } from "../../types/redux";
import { IBrokerTypes } from "../../types/types";
import { UPDATE_BROKER_TYPE } from "../actionTypes";

export const BROKERS: Record<string, IBrokerTypes> = {
  EXANTE: "EXANTE",
  REVOLUT: "REVOLUT",
};

const defaultState: IUiStore = {
  broker: BROKERS.REVOLUT,
};

export const ui = createSlice({
  name: "ui",
  initialState: { brokerType: BROKERS.REVOLUT },
  reducers: {
    updateBroker: (state, action: PayloadAction<IBrokerTypes>) => {
      state.brokerType = action.payload;
    },
  },
});

export const { updateBroker } = ui.actions;

export default ui.reducer;
