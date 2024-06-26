import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState:{
        searchQuery : '',
        suggestions: null,
        toggleSuggestion: false,
        cache: {},
    },
    reducers: {
        updateQuery: (state,action) => {
            state.searchQuery = action.payload;
        },
        getSuggestions: (state, action) => {
            state.suggestions = action.payload;
        },
        setToggleSuggestion: (state, action) => {
            state.toggleSuggestion = ! state.toggleSuggestion;
        },
        setCache: (state, action) => {
            state.cache = { ...state.cache, ...action.payload };
        },
    }
});

export const {updateQuery, getSuggestions, setToggleSuggestion, setCache} = searchSlice.actions;

export default searchSlice.reducer;