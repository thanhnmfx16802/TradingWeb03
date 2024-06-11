import { createSlice } from "@reduxjs/toolkit";

const loginAdSlice = createSlice({
  name: "login_user",
  initialState: JSON.parse(localStorage.getItem("loginAdmin"))
    ? JSON.parse(localStorage.getItem("loginAdmin"))
    : {
        isLogin: false,
        userId: "",
        username: "",
        role: "Customer",
      },
  reducers: {
    ON_LOGIN(state, action) {
      state.isLogin = action.payload.isLogin;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
  },
});

export const loginAdActions = loginAdSlice.actions;
export default loginAdSlice;
