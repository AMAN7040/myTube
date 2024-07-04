import { createSlice } from "@reduxjs/toolkit";


const initialUserInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;


export const userSlice = createSlice({
  name: "user",
  initialState:{
    userInfo: initialUserInfo,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));   
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
