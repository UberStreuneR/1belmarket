import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import widgetsReducer from "./slices/widgetsSlice";
import favouriteReducer from "./slices/favouriteSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

const combinedReducers = combineReducers({
    widgets: widgetsReducer,
    favourite: favouriteReducer,
    cart: cartReducer,
    user: userReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["cart", "favourite", "user", "auth"],
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store, persistedReducer);
