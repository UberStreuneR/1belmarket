import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
    Rating
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const useStyles = makeStyles({
  itemCard: {
    height: "304px",
    width: "200px",
    borderRadius: "10px !important",
    position: "relative",
  },
});

const image = "https://source.unsplash.com/random";

function TestCard({ card }) {
  const classes = useStyles();
  return (
    <Card className={classes.itemCard}>
      <IconButton
        sx={{ position: "absolute", right: 0, padding: 2 }}
        aria-label="add to favourites"
      >
        <FavoriteBorderIcon sx={{ color: "white" }} />
      </IconButton>
      <CardMedia component="img" height="170" src={image} alt="Just my image" />
      <CardContent>
        <Typography variant="h6">Grass-fed chicken</Typography>
        <Typography variant="body2" color="textSecondary" noWrap>
            Just some random description
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          $200
        </Typography>
          <Rating name="read-only" value={4.5} precision={0.5} size="small" readOnly />
        <IconButton aria-label="add to cart">
          <ShoppingCartOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default TestCard;
