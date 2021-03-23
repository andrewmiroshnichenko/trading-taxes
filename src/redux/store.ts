import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/data";
import uiReducer from "./slices/ui";

const rootReducer = combineReducers({ data: dataReducer, ui: uiReducer });
const store = configureStore({ reducer: rootReducer });

export type IRootState = ReturnType<typeof store.getState>;

export default store;
