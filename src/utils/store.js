import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebarSlice";
import videoSlice from "./videoSlice";
import searchSlice from "./searchSlice";
import subSlice from "./subSlice";
import commentSlice from "./commentSlice";

const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
        video: videoSlice,
        search: searchSlice,
        subscribe: subSlice,
        comment: commentSlice,
    }
});

export default store;