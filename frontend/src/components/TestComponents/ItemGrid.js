import * as React from "react";

import { Grid, Container } from "@mui/material";
import NoteCard from "./NoteCard";
import {
  Link,
  AppBar,
  Typography,
  CssBaseline,
  GlobalStyles,
  Toolbar,
} from "@mui/material";
export default function ItemGrid() {
  const [notes, setNotes] = React.useState([
    {
      title: "What do we have for dinner?",
      category: "Food",
      description: "Cheeze, meat, poultry, etc.",
      id: 1,
    },
    {
      title: "When should I go to visit my friend?",
      category: "People",
      description: "10.04.2022, at 8 am on the bridge",
      id: 2,
    },
    {
      title: "Books to read",
      category: "Education",
      description: "Mastery, The Laws of Human Nature",
      id: 3,
    },
      {
      title: "Things to do:",
      category: "Practicality",
      description: "Figure out Material-UI, start designing the market page, then I'd actually prefer to finish the audiobook, so that I can rationally keep mastering my field",
      id: 4,
    },
  ]);

  const handleDelete = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        elevation={0}
        color="default"
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar>
          <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Company name
            </Typography>
          <nav>
            <Link
              variant="button"
              href="#"
              color="text.primary"
              sx={{ my: 1, mx: 1.5 }}
            >
              Home
            </Link>
            <Link
              variant="button"
              href="#"
              color="text.primary"
              sx={{ my: 1, mx: 1.5 }}
            >
              Features
            </Link>
            <Link
              variant="button"
              href="#"
              color="text.primary"
              sx={{ my: 1, mx: 1.5 }}
            >
              Support
            </Link>
            <Link
              variant="button"
              href="#"
              color="text.primary"
              sx={{ my: 1, mx: 1.5 }}
            >
              Cart
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      <Container sx={{ pt: 8, pb: 6 }}>
        <Grid container spacing={2} alignItems="stretch">
          {notes.map((note) => (
            <Grid item key={note.id} xs={3}>
              <NoteCard note={note} handleDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
