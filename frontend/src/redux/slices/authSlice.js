import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: null };

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            return action.payload;
        },
        clearToken: state => {
            return { token: null };
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;
export const selectToken = state => state.auth;
export default authSlice.reducer;
