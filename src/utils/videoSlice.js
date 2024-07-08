import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    allVideos: [],
    watchVideo: null, // Changed to camelCase for consistency
    category: null,
    videoCategoryId: 0,
    nextPageToken: '', // Initialized nextPageToken
    relatedVideos: null,
  },
  reducers: {
    getAllVideos: (state, action) => {
      // Concatenate new videos to existing ones
      state.allVideos = [...state.allVideos, ...action.payload.videos];
      state.nextPageToken = action.payload.nextPageToken; // Update nextPageToken
    },
    getWatchVideo: (state, action) => {
      state.watchVideo = action.payload; // Set the watched video
    },
    getCategory: (state, action) => {
      state.category = action.payload; // Set the selected category
    },
    updateCategoryId: (state, action) => {
      state.videoCategoryId = action.payload; // Update the video category ID
      state.allVideos = []; // Reset videos when category changes
      state.nextPageToken = ''; // Reset nextPageToken when category changes
    },
    fetchRelated: (state, action) => {
      state.relatedVideos = action.payload;
    },
    clearRelated: (state,action) => {
      state.relatedVideos =action.payload;
    }
  },
});

export const {
  getAllVideos,
  getWatchVideo,
  getCategory,
  updateCategoryId,
  fetchRelated,
  clearRelated,
} = videoSlice.actions;

export default videoSlice.reducer;
