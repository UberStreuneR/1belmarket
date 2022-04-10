import React from "react";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ItemCard from "./ItemCard";

const items = [
  {
    name: "Beef",
    description: "An amazing beef",
    rating: 4,
    price: 100,
    id: 1,
  },
  {
    name: "Chicken",
    description: "Grass-fed chicken",
    rating: 4.5,
    price: 72,
    id: 2,
  },
  {
    name: "Egg",
    description: "Grass-fed egg",
    rating: 3.5,
    price: 80,
    id: 3,
  },
  {
    name: "Pork",
    description: "Grass-fed pork",
    rating: 5,
    price: 110,
    id: 4,
  },
];

const cardWidth = 250;

function ItemGrid() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const width = matches ? cardWidth * 3 + 32 : cardWidth * 2 + 16;
  return (
    <Grid container spacing={2} sx={{ width: width }}>
      {items.map((card) => (
        <Grid item key={card.id} xs={12} sm={6} md={4}>
          <ItemCard card={card} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ItemGrid;
