import { configureStore } from "@reduxjs/toolkit";
import riskReducer from "./riskSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    risk: riskReducer, 
    user: userReducer,
  },
});
