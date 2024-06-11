import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isOpen: false,
    name: "",
    price: "",
    img1: "",
    short_desc: "",
  },
  reducers: {
    show_popup(state, action) {
      state.isOpen = true;
      state.name = action.payload.name;
      state.price = action.payload.price;
      state.img1 = action.payload.img1;
      state.short_desc = action.payload.short_desc;
    },
    hide_popup(state) {
      state.isOpen = false;
      state.name = "";
      state.price = "";
      state.img1 = "";
      state.short_desc = "";
    },
  },
});

export const popupActions = popupSlice.actions;
export default popupSlice;
