import React from "react";
import Items from "../components/Market/Items";
// import Drop from "../components/TestComponents/Drop";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
export default function Market() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {/* <Drop /> */}
                <Items />
            </PersistGate>
        </Provider>
    );
}
