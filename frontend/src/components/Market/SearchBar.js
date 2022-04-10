import React, { useState } from "react";
import { Paper, InputBase, Divider, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
function SearchBar(props) {
  const [value, setValue] = useState("");
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <React.Fragment>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          m: 2,
        }}
      >
        <IconButton color="inherit" sx={{ p: "10px" }} aria-label="search">
          <MenuIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Поиск"
          inputProps={{ "aria-label": "search-field" }}
          onChange={handleInputChange}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="inherit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </React.Fragment>
  );
}

export default SearchBar;
