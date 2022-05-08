import React from "react";
import { Stack, IconButton, Badge } from "@mui/material";
import { styled } from "@mui/system";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Favourite from "../Market/Favourite";
import Cart from "../Market/Cart";
import { useDispatch, useSelector } from "react-redux";
import { favOpen, cartOpen } from "./features/slices/widgetsSlice";
import { selectCartItems } from "./features/slices/cartSlice";
const RedBadge = styled(Badge)({
  ".css-106c1u2-MuiBadge-badge": { backgroundColor: "red", fontWeight: "bold" },
});

function OptionsList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  return (
    <React.Fragment>
      <Favourite />
      <Cart />
      <Stack spacing={1} direction="row">
        <IconButton sx={{ color: "black" }}>
          <BedtimeIcon />
        </IconButton>
        <IconButton sx={{ color: "black" }}>
          <BedtimeOutlinedIcon />
        </IconButton>
        <IconButton sx={{ color: "black" }} onClick={() => dispatch(favOpen())}>
          <FavoriteBorderOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{ color: "black" }}
          onClick={() => dispatch(cartOpen())}
        >
          {cartItems.length > 0 ? (
            <RedBadge badgeContent={cartItems.length} color="primary">
              <ShoppingCartOutlinedIcon />
            </RedBadge>
          ) : (
            <Badge badgeContent={cartItems.length} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          )}
        </IconButton>
        <IconButton sx={{ color: "black" }}>
          <PersonOutlineOutlinedIcon />
        </IconButton>
      </Stack>
    </React.Fragment>
  );
}

export default OptionsList;
