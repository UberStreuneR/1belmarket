import React from "react";
import { Container, Typography, Stack } from "@mui/material";
export default function Team() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Developers
      </Typography>
      <Stack>
        <Typography variant="h6">Олег Стецюк</Typography>
        <Typography variant="h6">Михаил Истратенков</Typography>
        <Typography variant="h6">Никита Ухин</Typography>
      </Stack>
    </Container>
  );
}
