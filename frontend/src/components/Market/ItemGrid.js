import React from "react";
import { Container, Grid, Stack } from "@mui/material";
import ItemCard from "./ItemCard";
import ItemsMenu from "./ItemsMenu";
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

const cardWidth = "250px";

function ItemGrid() {
  return (
    <Container sx={{ my: 3 }}>
      <Stack direction="row" spacing={2}>
        <ItemsMenu />
        <Grid container spacing={2}>
          {items.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <ItemCard card={card} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}

export default ItemGrid;
