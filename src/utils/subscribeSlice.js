import { createSlice } from "@reduxjs/toolkit";

const initialSub = localStorage.getItem("userSubscribers")
  ? JSON.parse(localStorage.getItem("userSubscribers"))
  : [];

const subscribeSlice = createSlice({
  name: "subscribers",
  initialState: { userSubscribers: initialSub },
  reducers: {
    addSubscribe: (state, action) => {
      const channel = action.payload;
      state.userSubscribers.push(channel);
      localStorage.setItem(
        "userSubscribers",
        JSON.stringify(state.userSubscribers)
      );
    },
    removeSubscribe: (state, action) => {
      const channelId = action.payload.id;
      state.userSubscribers = state.userSubscribers.filter(
        (channel) => channel.id !== channelId
      );
      localStorage.setItem(
        "userSubscribers",
        JSON.stringify(state.userSubscribers)
      );
    },
  },
});

export const { addSubscribe, removeSubscribe } = subscribeSlice.actions;

export default subscribeSlice.reducer;
