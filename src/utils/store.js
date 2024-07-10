import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebarSlice";
import videoSlice from "./videoSlice";
import searchSlice from "./searchSlice";
import subSlice from "./subSlice";
import commentSlice from "./commentSlice";
import userSlice from "./userSlice";
import liveSlice from "./liveSlice";

const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
        video: videoSlice,
        search: searchSlice,
        subscribe: subSlice,
        comment: commentSlice,
        user: userSlice,
        live: liveSlice,
    }
});

export default store;