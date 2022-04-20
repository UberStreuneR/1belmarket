import React from "react";
import { Grid } from "@mui/material";
import CategoryCard from "./CategoryCard";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const categories = [
  { title: "Новинки", id: 1 },
  { title: "Популярные", id: 2 },
  { title: "Сыры", id: 3 },
  { title: "Мясо", id: 4 },
  { title: "Молочные продукты", id: 5 },
  { title: "Разное", id: 6 },
];

const cardWidth = 250;

function CategoryGrid() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const width = matches ? cardWidth * 3 + 32 : cardWidth * 2 + 16;
  return (
    <Grid container spacing={2} sx={{ width: width }}>
      {categories.map((category) => (
        <Grid item key={category.id} xs={12} sm={6} md={4}>
          <CategoryCard category={category} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CategoryGrid;
