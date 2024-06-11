import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    updateCartItems(state, action) {
      state.items = action.payload;
    },
    updatedCartPrice(state, action) {
      state.totalPrice = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
