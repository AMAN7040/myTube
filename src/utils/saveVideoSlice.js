// src/utils/saveVideoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialSave = localStorage.getItem("savedVideos")
  ? JSON.parse(localStorage.getItem("savedVideos"))
  : [];

const saveVideoSlice = createSlice({
  name: "save",
  initialState: {
    savedVideos: initialSave,
  },
  reducers: {
    addSave: (state, action) => {
      state.savedVideos.push(action.payload);
      localStorage.setItem(
        "savedVideos",
        JSON.stringify(state.savedVideos)
      );
    },
    removeSave: (state, action) => {
      state.savedVideos = state.savedVideos.filter(
        (video) => video.id !== action.payload.id
      );
      localStorage.setItem(
        "savedVideos",
        JSON.stringify(state.savedVideos)
      );
    },
  },
});

export const { addSave, removeSave } = saveVideoSlice.actions;
export default saveVideoSlice.reducer;
