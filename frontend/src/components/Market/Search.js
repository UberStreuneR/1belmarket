import React from "react";
import ItemGrid from "./ItemGrid";
import { useParams } from "react-router-dom";
import { useSearchItemsQuery } from "../../redux/slices/apiSlice";

function Search(props) {
    const { key, key2 } = useParams();
    console.log(key, key2);
    const { data: items, isSuccess } = useSearchItemsQuery(key);
    if (isSuccess) {
        console.log(items);
    }
    return <ItemGrid />;
}

export default Search;
