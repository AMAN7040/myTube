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
    }
});

 export const {toggleBar} = sidebarSlice.actions; 

export default sidebarSlice.reducer;