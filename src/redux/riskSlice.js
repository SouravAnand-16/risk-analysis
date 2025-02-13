import { createSlice } from "@reduxjs/toolkit";

const riskSlice = createSlice({
  name: "risk",
  initialState: { data: null }, 
  reducers: {
    setRiskData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setRiskData } = riskSlice.actions;
export default riskSlice.reducer;
