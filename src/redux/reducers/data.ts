import { IDataStore } from "../../types/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const data = createSlice({
  name: "data",
  initialState: {
    dividends: "",
    trades: "",
    interests: "",
    dividendsTotal: 0,
    tradesTotal: 0,
    interestsTotal: 0,
  },
  reducers: {
    updateData(state, action: PayloadAction<IDataStore>) {
      state = action.payload;
    },
  },
});

export default data.reducer;

export const { updateData } = data.actions;
