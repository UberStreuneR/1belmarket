import React from "react";
import { Stack, IconButton, Badge } from "@mui/material";
import { styled } from "@mui/system";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const RedBadge = styled(Badge)({
  ".css-106c1u2-MuiBadge-badge": { backgroundColor: "red", fontWeight: "bold" },
});

function OptionsList(props) {
  return (
    <Stack spacing={1} direction="row">
      <IconButton sx={{ color: "black" }}>
        <BedtimeIcon />
      </IconButton>
      <IconButton sx={{ color: "black" }}>
        <BedtimeOutlinedIcon />
      </IconButton>
      <IconButton sx={{ color: "black" }}>
        <FavoriteBorderOutlinedIcon />
      </IconButton>
      <IconButton sx={{ color: "black" }}>
        <RedBadge badgeContent={4} color="primary">
          <ShoppingCartOutlinedIcon />
        </RedBadge>
      </IconButton>
      <IconButton sx={{ color: "black" }}>
        <PersonOutlineOutlinedIcon />
      </IconButton>
    </Stack>
  );
}

export default OptionsList;
