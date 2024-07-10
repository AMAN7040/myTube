import { createSlice } from "@reduxjs/toolkit";

const liveSlice = createSlice({
 name: 'live',
 initialState : {
    chat: null,
 },
 reducers: {
   getChat : (state, action) => {
    state.chat = action.payload;
   },
 }
});

export const {getChat} = liveSlice.actions;

export default liveSlice.reducer;