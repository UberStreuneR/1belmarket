import { configureStore } from "@reduxjs/toolkit";
import widgetsReducer from "./slices/widgetsSlice";
import favouriteReducer from "./slices/favouriteSlice";
import cartReducer from "./slices/cartSlice";
export default configureStore({
  reducer: {
    widgets: widgetsReducer,
    favourite: favouriteReducer,
    cart: cartReducer,
  },
});
