import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQuery: "",
    suggestions: null,
    toggleSuggestion: false,
    searchResults: null,
    cache: {},
  },
  reducers: {
    updateQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    getSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    clearSuggestion: (state, action) => {
      return null;
    },
    setToggleSuggestion: (state, action) => {
      state.toggleSuggestion = !state.toggleSuggestion;
    },
    setCache: (state, action) => {
      state.cache = { ...state.cache, ...action.payload };
    },
    getSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const {
  updateQuery,
  getSuggestions,
  setToggleSuggestion,
  clearSuggestion,
  setCache,
  getSearchResults,
} = searchSlice.actions;

export default searchSlice.reducer;
