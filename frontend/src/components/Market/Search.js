import React from "react";
import ItemGrid from "./ItemGrid";
import { useParams } from "react-router-dom";
import { useSearchItemsQuery } from "../../redux/slices/apiSlice";

function Search(props) {
    const { key } = useParams();
    console.log(key);
    const { data: items, isSuccess } = useSearchItemsQuery(key);
    if (isSuccess) {
        console.log(items);
    }
    return <ItemGrid items={items} />;
}

export default Search;
