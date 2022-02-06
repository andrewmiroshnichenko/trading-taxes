import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUiStore } from "../../types/redux";
import { IBrokerTypes } from "../../types/types";

export const BROKERS: Record<string, IBrokerTypes> = {
  EXANTE_ALL: "EXANTE_ALL",
  REVOLUT: "REVOLUT",
};

export const ui = createSlice({
  name: "ui",
  initialState: { broker: BROKERS.EXANTE_ALL } as IUiStore,
  reducers: {
    updateBroker: (state, action: PayloadAction<IBrokerTypes>) => {
      state.broker = action.payload;
    },
  },
});

export const { updateBroker } = ui.actions;

export default ui.reducer;
