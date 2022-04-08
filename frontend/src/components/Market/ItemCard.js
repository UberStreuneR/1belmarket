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
    height: "380px",
    width: "250px",
    borderRadius: "10px !important",
    position: "relative",
  },
});

const image = "https://source.unsplash.com/random";

function ItemCard({ card }) {
  const classes = useStyles();
  return (
    <Card className={classes.itemCard}>
      <IconButton
        sx={{ position: "absolute", right: 0, padding: 3 }}
        aria-label="add to favourites"
      >
        <FavoriteBorderIcon sx={{ color: "white" }} />
      </IconButton>
      <CardMedia component="img" height="240" src={image} alt="Just my image" />
      <CardContent>
        <Typography variant="h5">{card.name}</Typography>
        <Typography variant="body2" color="textSecondary" noWrap>
            {card.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          ${card.price}
        </Typography>
          <Rating name="read-only" value={card.rating} precision={0.5} size="small" readOnly />
        <IconButton aria-label="add to cart">
          <ShoppingCartOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ItemCard;
