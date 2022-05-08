import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// items in the "cart" widget are handled here

const cartAdapter = createEntityAdapter();
const initialState = cartAdapter.getInitialState();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      cartAdapter.addOne(state, action.payload);
    },
    removeItemFromCart: (state, action) => {
      cartAdapter.removeOne(state, action.payload);
    },
    incrementItemAmount: (state, action) => {
      state.entities[action.payload].amount += 1;
    },
    decrementItemAmount: (state, action) => {
      state.entities[action.payload].amount -= 1;
    },
    clearCart: (state) => {
      cartAdapter.removeAll(state);
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  incrementItemAmount,
  decrementItemAmount,
  clearCart,
} = cartSlice.actions;
export const { selectAll: selectCartItems, selectById: selectCartItemById } =
  cartAdapter.getSelectors((state) => state.cart);

export default cartSlice.reducer;
