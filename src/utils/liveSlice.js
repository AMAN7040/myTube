import { createSlice } from "@reduxjs/toolkit";

const liveSlice = createSlice({
  name: "live",
  initialState: {
    chat: [],
  },
  reducers: {
    getChat(state, action) {
      state.chat = [...state.chat , ...action.payload.slice(-50)]; // Limit to 50 messages
    },
    addChatMessage(state, action) {
      state.chat.push(action.payload);
      state.chat = state.chat.slice(-50); // Limit messages
    },
  },
});

export const { getChat, addChatMessage } = liveSlice.actions;

export default liveSlice.reducer;
