import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log("payload: ", action.payload);
            return action.payload;
        },
        addUser: (state, action) => {
            console.log("payload: ", action.payload);
            const { username, email } = action.payload;
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
