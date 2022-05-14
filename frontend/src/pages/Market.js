import React from "react";
import Items from "../components/Market/Items";
import Drop from "../components/TestComponents/Drop";
import store from "../redux/store";
import { Provider } from "react-redux";
export default function Market() {
    return (
        <Provider store={store}>
            {/* <Drop /> */}
            <Items />
        </Provider>
    );
}
