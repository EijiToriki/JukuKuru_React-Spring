import { configureStore } from "@reduxjs/toolkit";
import authorizeReducer from "./authorizeSlice";

export const store = configureStore({
  reducer: {
    authorize: authorizeReducer
  }
})
