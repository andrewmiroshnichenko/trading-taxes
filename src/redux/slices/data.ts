import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataStore } from "../../types/redux";

const data = createSlice({
  name: "data",
  initialState: {
    startDate: "",
    endDate: "",
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
    updateRange(
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
  },
});

export default data.reducer;

export const { updateData, updateRange } = data.actions;
