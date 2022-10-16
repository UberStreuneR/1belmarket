import React from "react";
import ItemGrid from "./ItemGrid";
import { useParams } from "react-router-dom";
import { useSearchItemsQuery } from "../../redux/slices/apiSlice";

function Search(props) {
  const { key } = useParams();
  const { data: items, isSuccess } = useSearchItemsQuery(key);

  return <ItemGrid items={items} />;
}

export default Search;
