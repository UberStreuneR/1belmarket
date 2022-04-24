import {configureStore} from "@reduxjs/toolkit";
import widgetsReducer from "../features/widgets/widgetsSlice"
export default configureStore({
    reducer: {
        widgets: widgetsReducer
    }
})