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
    }
});


export const {getAllComments,updateToken} = commentSlice.actions;

export default commentSlice.reducer;