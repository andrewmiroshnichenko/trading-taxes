import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBrokerTypes } from "../../types/types";

export const BROKERS: Record<string, IBrokerTypes> = {
  EXANTE: "EXANTE",
  REVOLUT: "REVOLUT",
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
