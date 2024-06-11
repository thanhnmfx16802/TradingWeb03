import { configureStore } from "@reduxjs/toolkit";
import popupSlice from "./popup-slice";
import loginSlice from "./userLogin-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    popup: popupSlice.reducer,
    loginUser: loginSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
