import React from "react";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromFav } from "../../redux/slices/favouriteSlice";
import {
  addItemToCart,
  removeItemFromCart,
  selectCartItemById,
} from "../../redux/slices/cartSlice";

const image = "https://source.unsplash.com/random";

const FavItem = ({ item }) => {
  console.log(item);
  const dispatch = useDispatch();
  const inCartItem = useSelector(state => selectCartItemById(state, item.id));
  const handleAddToCartClicked = () => {
    dispatch(addItemToCart(item));
  };
  const handleRemoveFromCartClicked = () => {
    dispatch(removeItemFromCart(item.id));
  };
  return (
    <Grid item key={item.id} xs={6}>
      <Card sx={{ display: "flex", m: 1 }}>
        <CardMedia
          component="img"
          sx={{
            height: "150px",
            width: "150px",
            p: 1,
            borderRadius: "5%",
          }}
          image={item.images?.[0]?.url ?? image}
          alt={"My image"}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 1,
            maxWidth: 250,
            flex: "1 1 auto",
          }}>
          <Typography variant="h5">{item.name}</Typography>
          <Typography>{item.description}</Typography>
          <Typography variant="h6">${item.price}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            {inCartItem ? (
              <IconButton
                aria-label="remove from cart"
                onClick={handleRemoveFromCartClicked}>
                <DeleteOutlineIcon />
              </IconButton>
            ) : (
              <IconButton
                aria-label="add to cart"
                onClick={handleAddToCartClicked}>
                <ShoppingCartOutlinedIcon />
              </IconButton>
            )}
            <IconButton onClick={() => dispatch(removeItemFromFav(item.id))}>
              <FavoriteBorderOutlinedIcon color={"error"} />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default FavItem;
