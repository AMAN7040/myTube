import { createSlice } from "@reduxjs/toolkit";

const initialLike = localStorage.getItem("likeVideo")
  ? JSON.parse(localStorage.getItem("likeVideo"))
  : [];

const likeVideoSlice = createSlice({
  name: "likeUnlike",
  initialState: { likeVideo: initialLike },
  reducers: {
    addLike: (state, action) => {
      const video = action.payload;
      state.likeVideo.push(video);
      localStorage.setItem(
        "likeVideo",
        JSON.stringify(state.likeVideo)
      );
    },
    removeLike: (state, action) => {
      const videoId = action.payload.id;
      state.likeVideo = state.likeVideo.filter(
        (video) => video.id !== videoId
      );
      localStorage.setItem(
        "likeVideo",
        JSON.stringify(state.likeVideo)
      );
    },
  },
});

export const { addLike, removeLike } = likeVideoSlice.actions;

export default likeVideoSlice.reducer;
