import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    favouriteOpen: false
};

export const widgetsSlice = createSlice({
    name: 'widgets',
    initialState,
    reducers: {
        favClose: (state) => {
            state.favouriteOpen = false;
        },
        favOpen: (state) => {
            state.favouriteOpen = true;
        },
        favSwitch: (state) => {
            state.favouriteOpen = !state.favouriteOpen
        }
    }
});

export const {favClose, favOpen, favSwitch} = widgetsSlice.actions

export const selectFav = (state) => state.widgets.favouriteOpen

export default widgetsSlice.reducer