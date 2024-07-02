import { createSlice } from "@reduxjs/toolkit";

const subSlice = createSlice({
  name: "subscribe",
  initialState: {
    subDetail: null,
  },
  reducers: {
    getSubDetail: (state, action) => {
      state.subDetail = action.payload;
    },
  },
});

export const { getSubDetail } = subSlice.actions;
export default subSlice.reducer;
