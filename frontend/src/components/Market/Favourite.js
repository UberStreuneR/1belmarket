import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { useSelector, useDispatch } from "react-redux";
import {
  favOpen,
  favClose,
  favSwitch,
  selectFav,
} from "./features/widgets/widgetsSlice";
import { removeItem, selectFavItems } from "./features/widgets/favouriteSlice";

const image = "https://source.unsplash.com/random";
// const faveItems = [
//   { id: 1, title: "Beef", price: 450, description: "Not bad beef, loer" },
//   { id: 2, title: "Chicken", price: 300, description: "Not bad chikin" },
//   { id: 3, title: "Milk", price: 100, description: "Farm milk" },
// ];

function Favourite() {
  const dispatch = useDispatch();
  const open = useSelector(selectFav);
  const faveItems = useSelector((state) => selectFavItems(state));

  const handleClose = () => {
    dispatch(favClose());
  };

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
          Понравившиеся
          <IconButton onClick={() => dispatch(favClose())}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers={true}>
          {faveItems.length > 0 ? (
            <Grid container>
              {faveItems.map((item) => (
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
                      }}
                    >
                      <Typography variant="h5">{item.name}</Typography>
                      <Typography>{item.description}</Typography>
                      <Typography variant="h6">${item.price}</Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", p: 1 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <IconButton>
                          <ShoppingCartOutlinedIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => dispatch(removeItem(item.id))}
                        >
                          <FavoriteBorderOutlinedIcon color={"error"} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant={"h5"}>Uh... It's empty.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Favourite;
