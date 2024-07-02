import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isBarOpen: false,
    },
    reducers:{
        toggleBar: (state) => {
            state.isBarOpen = !state.isBarOpen;
        },
        removeBar: (state) => {
            state.isBarOpen = false;
        }
    }
});

export const {toggleBar, removeBar} = sidebarSlice.actions; 

export default sidebarSlice.reducer;