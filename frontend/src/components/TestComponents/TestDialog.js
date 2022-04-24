import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


const image = "https://source.unsplash.com/random";
const faveItems = [
  { id: 1, title: "Beef", price: 450, description: "Not bad beef, loer"},
  { id: 2, title: "Chicken", price: 300, description: "Not bad chikin" },
  { id: 3, title: "Milk", price: 100, description: "Farm milk" },
];


export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
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
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h4">
            Понравившиеся
          </Typography>
          <IconButton><CloseIcon onClick={handleClose} /></IconButton>
        </DialogTitle>
        <DialogContent dividers={true}>
          <Grid container>
            {faveItems.map((item) => (
              <Grid item key={item.id} xs={6}>
                <Card sx={{ display: "flex", m: 1 }}>
                  <CardMedia
                    component="img"
                    sx={{ height: "150px", width: "150px", p: 1}}
                    image={image}
                    alt={"My image"}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column", p: 1, maxWidth: 250, flex: '1 1 auto' }}>
                    <Typography variant="h5">{item.title}</Typography>
                    <Typography>{item.description}</Typography>
                    <Typography variant="h6">${item.price}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
                    <Box sx={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                      <IconButton><ShoppingCartOutlinedIcon /></IconButton>
                      <IconButton><FavoriteBorderOutlinedIcon /></IconButton>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
