import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { data: null },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    logoutUser: (state) => {
      state.data = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
