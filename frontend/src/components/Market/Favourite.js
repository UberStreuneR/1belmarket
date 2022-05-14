import React from "react";
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
import { favClose, selectFavOpen } from "../../redux/slices/widgetsSlice";
import {
  removeItemFromFav,
  selectFavItems,
} from "../../redux/slices/favouriteSlice";

const image = "https://source.unsplash.com/random";

function Favourite() {
  const dispatch = useDispatch();
  const open = useSelector(selectFavOpen);
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
          Favourite
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
                          onClick={() => dispatch(removeItemFromFav(item.id))}
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
