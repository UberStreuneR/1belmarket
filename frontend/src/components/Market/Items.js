import React from "react";
import { Container, Stack } from "@mui/material";
import ItemMenu from "./ItemMenu";
import ItemGrid from "./ItemGrid";
import ItemHeader from "./ItemHeader";
import Footer from "./Footer";
function Items(props) {
  return (
    <Container sx={{ my: 3 }}>
      <ItemHeader />
      <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
        <ItemMenu />
        <ItemGrid />
      </Stack>
      <Footer />
    </Container>
  );
}

export default Items;
