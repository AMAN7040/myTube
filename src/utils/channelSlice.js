import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channelDetails: null,
    channelVideos: null,
  },
  reducers: {
    getChannelDetails: (state, action) => {
      state.channelDetails = action.payload;
    },
    getChannelVideos: (state, action) => {
      state.channelVideos = action.payload;
    },
  },
});

export const { getChannelDetails, getChannelVideos } = channelSlice.actions;

export default channelSlice.reducer;
