import React from "react";
import Items from "../components/Market/Items";
import TestDialog from "../components/TestComponents/TestDialog";
import store from "../components/Market/features/store";
import { Provider } from "react-redux";
export default function Market() {
  // return <TestDialog />;
  return (
    <Provider store={store}>
      <Items />
    </Provider>
  );
}
