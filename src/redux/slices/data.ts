import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataStore } from "../../types/redux";

const data = createSlice({
  name: "data",
  initialState: {
    parsedData: {
      dividends: "",
      trades: "",
      fees: "",
      dividendsTotal: 0,
      tradesTotal: 0,
      feesTotal: 0,
    },
  } as IDataStore,
  reducers: {
    updateData(state, action: PayloadAction<IDataStore["parsedData"]>) {
      state.parsedData = action.payload;
    },
  },
});

export default data.reducer;

export const { updateData } = data.actions;
