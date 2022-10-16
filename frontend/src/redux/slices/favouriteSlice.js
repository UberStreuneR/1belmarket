import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// items in the "favourite" widget are handled here

const favouriteAdapter = createEntityAdapter();
const initialState = favouriteAdapter.getInitialState();

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addItemToFav: (state, action) => {
      favouriteAdapter.addOne(state, action.payload);
    },
    removeItemFromFav: (state, action) => {
      favouriteAdapter.removeOne(state, action.payload);
    },
  },
});

export const { addItemToFav, removeItemFromFav } = favouriteSlice.actions;
export const { selectAll: selectFavItems, selectById: selectFavItemById } =
  favouriteAdapter.getSelectors((state) => state.favourite);

export default favouriteSlice.reducer;
