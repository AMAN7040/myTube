import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    allVideos: null,
    WatchVideo: null,
  },
  reducers: {
    getAllVideos: (state, action) => {
      state.allVideos = action.payload;
    },
    getWatchVideo: (state, action) => {
      state.WatchVideo = action.payload;
    },
  },
});

export const { getAllVideos, getWatchVideo } = videoSlice.actions;

export default videoSlice.reducer;
