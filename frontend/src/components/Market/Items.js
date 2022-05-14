import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Stack } from "@mui/material";
import Search from "./Search";
import ItemMenu from "./ItemMenu";
import ItemGrid from "./ItemGrid";
import ItemHeader from "./ItemHeader";
import Footer from "./Footer";

const DefaultStack = () => {
    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "center", mt: 2 }}>
            <ItemMenu />
            <ItemGrid pagination />
        </Stack>
    );
};

function Items(props) {
    return (
        <Container sx={{ my: 3, position: "relative" }}>
            <ItemHeader />
            <BrowserRouter>
                <Routes>
                    <Route path=":category" element={<DefaultStack />}>
                        <Route path=":subcategory" element={<DefaultStack />} />
                    </Route>
                    <Route exact path="search/:key" element={<Search />} />
                </Routes>
            </BrowserRouter>

            <Footer />
        </Container>
    );
}

export default Items;
