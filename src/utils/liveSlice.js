import { createSlice } from "@reduxjs/toolkit";

const liveSlice = createSlice({
 name: 'live',
 initialState : {
    chat: [],
 },
 reducers: {
   getChat : (state, action) => {
    state.chat.splice(25,1);
    state.chat = [...state.chat, ...action.payload];
   },
 }
});

export const {getChat} = liveSlice.actions;

export default liveSlice.reducer;