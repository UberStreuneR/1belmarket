import React from "react";
import ItemHeader from "../components/Market/ItemHeader";
import Footer from "../components/Market/Footer";
import Items from "../components/Market/Items";
import Info from "../components/Market/Info/Info";
// import Drop from "../components/TestComponents/Drop";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
export default function Market() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ItemHeader />
          <Items />
          <Info />
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
