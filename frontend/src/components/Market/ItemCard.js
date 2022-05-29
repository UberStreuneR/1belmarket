import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Rating,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useDispatch, useSelector } from "react-redux";
import {
  addItemToFav,
  removeItemFromFav,
  selectFavItemById,
} from "../../redux/slices/favouriteSlice";
import {
  addItemToCart,
  removeItemFromCart,
  selectCartItemById,
} from "../../redux/slices/cartSlice";

import { SERVER_SITE_URL } from "../../constants/global";

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
  const dispatch = useDispatch();
  const classes = useStyles();

  // const [inFav, setInFav] = useState(false);
  // const [inCart, setInCart] = useState(false);

  const inFavItem = useSelector(state => selectFavItemById(state, card.id));

  const inCartItem = useSelector(state => selectCartItemById(state, card.id));

  const item = {
    id: card.id,
    name: card.name,
    price: card.price,
    amount: 1,
    images: card.images,
    description: card.description,
  };
  // console.log(card);
  // console.log(item);
  const handleAddToFavClicked = () => {
    dispatch(addItemToFav(item));
  };

  const handleRemoveFromFavClicked = () => {
    dispatch(removeItemFromFav(item.id));
  };

  const handleAddToCartClicked = () => {
    dispatch(addItemToCart(item));
  };

  const handleRemoveFromCartClicked = () => {
    dispatch(removeItemFromCart(item.id));
  };

  return (
    <Card className={classes.itemCard}>
      <IconButton
        sx={{
          position: "absolute",
          right: 0,
          padding: 3,
        }}
        aria-label="add to favourites"
        onClick={
          inFavItem ? handleRemoveFromFavClicked : handleAddToFavClicked
        }>
        {inFavItem ? (
          <FavoriteBorderIcon color={"error"} />
        ) : (
          <FavoriteBorderIcon sx={{ color: "white" }} />
        )}
      </IconButton>
      <CardMedia
        component="img"
        height="240"
        src={card.images[0] ? card.images[0].url : image}
        alt="Just my image"
      />
      <CardContent>
        <Typography noWrap variant="h5">
          {card.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" noWrap>
          {card.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          ${card.price}
        </Typography>
        <Rating
          name="read-only"
          value={card.rating}
          precision={0.5}
          size="small"
          readOnly
        />
        {inCartItem ? (
          <IconButton
            aria-label="remove from cart"
            onClick={handleRemoveFromCartClicked}>
            <DeleteOutlineIcon />
          </IconButton>
        ) : (
          <IconButton aria-label="add to cart" onClick={handleAddToCartClicked}>
            <ShoppingCartOutlinedIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

export default ItemCard;
