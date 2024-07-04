import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    allVideos: null,
    WatchVideo: null,
    category: null,
    videoCategoryId: 0,
  },
  reducers: {
    getAllVideos: (state, action) => {
      state.allVideos = action.payload;
    },
    getWatchVideo: (state, action) => {
      state.WatchVideo = action.payload;
    },
    getCategory: (state, action) => {
      state.category = action.payload;
    },
    updateCategoryId : (state, action) => {
      state.videoCategoryId = action.payload;
    }
  },
});

export const { getAllVideos, getWatchVideo, getCategory, updateCategoryId } = videoSlice.actions;

export default videoSlice.reducer;
