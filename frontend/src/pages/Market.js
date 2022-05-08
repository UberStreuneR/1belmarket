import React from "react";
import Items from "../components/Market/Items";
import store from "../components/Market/features/store";
import { Provider } from "react-redux";
export default function Market() {
  return (
    <Provider store={store}>
      <Items />
    </Provider>
  );
}
