import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Info from "./pages/Info";
import Market from "./pages/Market";

export default function App() {
    return (
        //<Info />
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Info />} />

                <Route path="/market" element={<Market />} />
            </Routes>
        </BrowserRouter>
    ); // Return react module
}
