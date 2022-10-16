import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    Paper,
    InputBase,
    Divider,
    IconButton,
    Zoom,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Dropdown from "./Dropdown";
function SearchBar(props) {
    const [value, setValue] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const ref = useRef();
    const handleInputChange = e => {
        setValue(e.target.value);
    };

    const navigate = useNavigate();

    const handleSearchClicked = () => {
        if (value != "") {
            // window.location.pathname = "/search/" + value;
            navigate("/search/" + value);
        }
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
                className="searchbar-paper">
                <Zoom in={dropdownOpen}>
                    <Dropdown ref={ref} />
                </Zoom>
                <IconButton
                    color="inherit"
                    sx={{ p: "10px" }}
                    // onClick={() => setDropdownOpen(!dropdownOpen)}
                    onClick={() => {
                        ref.current.classList.toggle("active");
                    }}>
                    <MenuIcon className="dropdown-menu-icon" />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Поиск"
                    inputProps={{ "aria-label": "search-field" }}
                    onChange={handleInputChange}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                    color="inherit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={handleSearchClicked}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </React.Fragment>
    );
}

export default SearchBar;
