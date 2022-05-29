import React from "react";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import OptionsList from "./OptionsList";
function ItemHeader(props) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        mt: 2,
      }}
      spacing={2}>
      <Link
        to=""
        style={{
          textDecoration: "none",
          underline: "none",
          color: "black",
        }}>
        <Typography sx={{ fontSize: "50px" }}>Company</Typography>
      </Link>
      <SearchBar />
      <OptionsList />
    </Stack>
  );
}

export default ItemHeader;
