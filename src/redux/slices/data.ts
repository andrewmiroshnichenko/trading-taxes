import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataStore } from "../../types/redux";

const data = createSlice({
  name: "data",
  initialState: {
    parsedData: {
      dividends: "",
      trades: "",
      interests: "",
      dividendsTotal: 0,
      tradesTotal: 0,
      interestsTotal: 0,
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
