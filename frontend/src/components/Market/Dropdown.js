import React from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import "./styles/dropdown.css";
import {
    useGetItemsQuery,
    useGetCategoriesQuery,
} from "../../redux/slices/apiSlice";

export const Dropdown = React.forwardRef((props, ref) => {
    const { data: categories, isSuccess } = useGetCategoriesQuery();

    console.log(isSuccess, categories);
    return (
        <Paper ref={ref} className="dropdown-paper" elevation={3}>
            {categories?.map(category => (
                <Typography sx={{ p: 1 }}>{category.name}</Typography>
            ))}
        </Paper>
    );
});

export default Dropdown;
