import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebarSlice";
import videoSlice from "./videoSlice";
import searchSlice from "./searchSlice";
import subSlice from "./subSlice";

const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
        video: videoSlice,
        search: searchSlice,
        subscribe: subSlice,
    }
});

export default store;