import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        allComments: [],
        pageToken: '',
    },
    reducers: {
        getAllComments: (state, action) => {
            state.allComments = [...state.allComments, ...action.payload];
        },
        updateToken: (state, action) => {
            state.pageToken = action.payload;
        },
        resetComments: (state) => {
            state.allComments = []; // Clear all comments
        },
    }
});

export const { getAllComments, updateToken, resetComments } = commentSlice.actions;

export default commentSlice.reducer;
