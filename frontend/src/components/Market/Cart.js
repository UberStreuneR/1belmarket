import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { cartClose, selectCartOpen } from "./features/slices/widgetsSlice";
import {
  removeItemFromCart,
  selectCartItems,
  incrementItemAmount,
  decrementItemAmount,
  clearCart,
} from "./features/slices/cartSlice";

const image = "https://source.unsplash.com/random";

function Cart(props) {
  const dispatch = useDispatch();
  const open = useSelector(selectCartOpen);
  const handleClose = () => {
    dispatch(cartClose());
  };
  const cartItems = useSelector(selectCartItems);
  const sum = cartItems.reduce(
    (previousValue, currentItem) =>
      previousValue + currentItem.price * currentItem.amount,
    0
  );
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle
          id="alert-dialog-title"
          variant={"h4"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          Cart
          <IconButton onClick={() => dispatch(cartClose())}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers={true} sx={{ display: "flex" }}>
          {cartItems.length > 0 ? (
            <Box sx={{ display: "flex", flexGrow: "1" }}>
              <Grid container sx={{ width: "70%" }}>
                {cartItems.map((item) => (
                  <Grid item key={item.id} xs={12}>
                    <Card sx={{ display: "flex", m: 1 }}>
                      <CardMedia
                        component="img"
                        sx={{
                          height: "100px",
                          width: "100px",
                          p: 1,
                          borderRadius: "10%",
                        }}
                        image={item.images?.[0]?.url ?? image}
                        alt={"My image"}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          p: 1,
                          flexGrow: "1",
                        }}
                      >
                        <Typography variant="h5">{item.name}</Typography>
                        <Typography variant="subtitle2">
                          {item.description}
                        </Typography>
                        <Typography variant="h5">${item.price}</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {item.amount > 1 ? (
                            <IconButton
                              onClick={() =>
                                dispatch(decrementItemAmount(item.id))
                              }
                            >
                              <RemoveIcon />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() =>
                                dispatch(removeItemFromCart(item.id))
                              }
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          )}

                          <Typography variant={"h5"} sx={{ p: 1 }}>
                            {item.amount}
                          </Typography>
                          <IconButton
                            onClick={() =>
                              dispatch(incrementItemAmount(item.id))
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                        <Typography
                          variant={"h5"}
                          sx={{ mx: 2, width: "80px" }}
                        >
                          ${item.price * item.amount}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <Typography variant={"h6"}>
                  Amount of items: {cartItems.length}
                </Typography>
                <Typography variant={"h6"} sx={{ my: 1 }}>
                  Order sum: <b>${sum}</b>
                </Typography>
                <Button
                  variant={"contained"}
                  onClick={() => {
                    dispatch(clearCart());
                    handleClose();
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography variant={"h5"}>Uh... It's empty.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Cart;
