import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// items in the "favourite" widget are handled here

const favouriteAdapter = createEntityAdapter();
const initialState = favouriteAdapter.getInitialState();

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addItem: (state, action) => {
      favouriteAdapter.addOne(state, action.payload);
    },
    removeItem: (state, action) => {
      favouriteAdapter.removeOne(state, action.payload);
    },
  },
});

export const { addItem, removeItem } = favouriteSlice.actions;
export const { selectAll: selectFavItems } = favouriteAdapter.getSelectors(
  (state) => state.favourite
);

export default favouriteSlice.reducer;