import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { Typography, Link, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/system";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./styles/dropdown.css";
import {
  useGetItemsQuery,
  useGetCategoriesQuery,
  useGetCategoryTreeQuery,
} from "../../redux/slices/apiSlice";
import "./handlers/dropdown-handlers";

const DropdownCategoryLink = props => {
  return (
    <button
      className="dropdown-link"
      onClick={() => props.onClick()}
      type="button">
      {props.children}
      <span className="dropdown-icon-right">{props.iconRight}</span>
    </button>
  );
};

const DropdownCategoryContainer = props => {
  return (
    <div className="dropdown-category-container">
      <Typography variant="h4">{props.category.name}</Typography>
      <Grid container spacing={2} sx={{ mt: 0.5 }}>
        {props.category.children.map(subcategory => (
          <Grid
            item
            xs={4}
            key={subcategory.id}
            sx={{ display: "flex", justifyContent: "center" }}>
            <RouterLink
              to={`/items/${props.category.name}/${subcategory.name}`}
              className="dropdown-subcategory-link">
              {subcategory.name}
            </RouterLink>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export const Dropdown = React.forwardRef((props, ref) => {
  const { data: tree, isSuccess } = useGetCategoryTreeQuery();
  // const { data: categories } = useGetCategoriesQuery();
  const [activeCategory, setActiveCategory] = useState(0);

  const handleLinkClicked = cat => {
    setActiveCategory(tree.children.indexOf(cat));
  };

  return (
    <Paper ref={ref} className="dropdown-paper" elevation={3}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={4} sx={{ display: "flex", flexDirection: "column" }}>
            {tree?.children?.map(category => (
              <DropdownCategoryLink
                key={category.id}
                iconRight={<ChevronRightIcon fontSize="large" />}
                onClick={() => handleLinkClicked(category)}>
                {category.name}
              </DropdownCategoryLink>
            ))}
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            {tree?.children?.[activeCategory] ? (
              <DropdownCategoryContainer
                category={tree.children[activeCategory]}
              />
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
});

export default Dropdown;
