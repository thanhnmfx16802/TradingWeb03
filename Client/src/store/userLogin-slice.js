import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login_user",
  initialState: {
    isLogin: false,
    username: "",
    userId: "",
  },
  reducers: {
    ON_LOGIN(state, action) {
      state.isLogin = action.payload.isLogin;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
    },
    ON_LOGOUT(state, action) {
      state.isLogin = action.payload.isLogin;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice;
