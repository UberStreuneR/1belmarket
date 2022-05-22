import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { Container, Stack } from "@mui/material";
import Search from "./Search";
import ItemMenu from "./ItemMenu";
import ItemGrid from "./ItemGrid";
import ItemHeader from "./ItemHeader";
import Footer from "./Footer";
import {
    useGetItemsQuery,
    selectGetItemsResultData,
} from "../../redux/slices/apiSlice";
import { useSelector } from "react-redux";

const DefaultStack = props => {
    if (props.all) {
        console.log("ALLLLLLLLLLL");
    }
    const search = useParams();
    const searchString = search["*"].replace("/", ";");
    const { data: items, isSuccess } = useGetItemsQuery();
    const selected = useSelector(state =>
        selectGetItemsResultData(state, searchString)
    );
    console.log("Selected: ", selected);

    if (isSuccess) {
        console.log(items);
    }
    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "center", mt: 2 }}>
            <ItemMenu /> {/* TODO: load categories into menu */}
            <ItemGrid items={selected} pagination />
        </Stack>
    );
};

function Items(props) {
    return (
        <Container sx={{ my: 3, position: "relative" }}>
            <ItemHeader />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<DefaultStack all />} />
                    <Route path="items/*" element={<DefaultStack />} />
                    <Route exact path="search/:key" element={<Search />} />
                </Routes>
            </BrowserRouter>

            <Footer />
        </Container>
    );
}

export default Items;
