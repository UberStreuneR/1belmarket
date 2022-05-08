import { createSlice } from "@reduxjs/toolkit";

// open/closed slices' state are handled here

const initialState = {
  favouriteOpen: false,
  cartOpen: false,
  //profile, cart, theme go here, favourite/cart items don't go here
};

export const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    favClose: (state) => {
      state.favouriteOpen = false;
    },
    favOpen: (state) => {
      state.favouriteOpen = true;
    },
    cartClose: (state) => {
      state.cartOpen = false;
    },
    cartOpen: (state) => {
      state.cartOpen = true;
    },
  },
});

export const { favClose, favOpen, cartClose, cartOpen } = widgetsSlice.actions;

export const selectFavOpen = (state) => state.widgets.favouriteOpen;
export const selectCartOpen = (state) => state.widgets.cartOpen;

export default widgetsSlice.reducer;
