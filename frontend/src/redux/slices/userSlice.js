import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    addUser: (state, action) => {
      return action.payload;
    },
    clearUser: state => {
      return {};
    },
  },
});

export const { setUser, addUser, clearUser } = userSlice.actions;
export const selectUser = state => state.user;
export default userSlice.reducer;
