import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
    name: 'video',
    initialState: {
        allVideos: null,
    },
    reducers: {
        getAllVideos: (state, action) => {
            state.allVideos = action.payload;
        }
    }
});

export const {getAllVideos} = videoSlice.actions; 

export default videoSlice.reducer;