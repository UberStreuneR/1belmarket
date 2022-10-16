import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import FavItem from "./FavItem";
import { useSelector, useDispatch } from "react-redux";
import { favClose, selectFavOpen } from "../../redux/slices/widgetsSlice";
import {
  removeItemFromFav,
  selectFavItems,
} from "../../redux/slices/favouriteSlice";

function Favourite() {
  const dispatch = useDispatch();
  const open = useSelector(selectFavOpen);
  const faveItems = useSelector(state => selectFavItems(state));
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
        fullWidth={true}>
        <DialogTitle
          id="alert-dialog-title"
          variant={"h4"}
          sx={{ display: "flex", justifyContent: "space-between" }}>
          Favourite
          <IconButton onClick={() => dispatch(favClose())}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers={true}>
          {faveItems.length > 0 ? (
            <Grid container>
              {faveItems.map(item => (
                <FavItem item={item} />
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
