import { configureStore } from "@reduxjs/toolkit";
import widgetsReducer from "../features/widgets/widgetsSlice";
import favouriteReducer from "../features/widgets/favouriteSlice";
export default configureStore({
  reducer: {
    widgets: widgetsReducer,
    favourite: favouriteReducer,
  },
});
