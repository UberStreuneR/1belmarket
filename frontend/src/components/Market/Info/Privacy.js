import React from "react";
import { Container, Typography } from "@mui/material";
export default function Privacy() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      maxWidth="sm">
      <Typography variant="h4">Privacy Policies</Typography>
      <Typography variant="p" sx={{ fontSize: "18px", mt: 2 }}>
        Any information or credentials you input on this web application will
        not be stored, distributed or otherwise shared with third-party people.
        Your sensitive data is safely encrypted for database storage.
      </Typography>
    </Container>
  );
}
