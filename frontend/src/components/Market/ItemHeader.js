import React from "react";
import { Stack, Typography } from "@mui/material";
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
      }}
      spacing={2}
    >
      <Typography sx={{ fontSize: "50px" }}>Company</Typography>
      <SearchBar />
      <OptionsList />
    </Stack>
  );
}

export default ItemHeader;
