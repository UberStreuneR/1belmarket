import React from "react";
import { Badge } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { styled } from "@mui/system";
import { red } from '@mui/material/colors';
const RedBadge = styled(Badge, props)({
    customBadge: {
        color: 'white',
        backgroundColor: props => props.color
    }
});


function Test(props) {
  return (
    <React.Fragment>
      <RedBadge badgeContent={4} color="red" sx={{ mx: 5, my: 5 }}>
        <ShoppingCartOutlined fontSize="large" />
      </RedBadge>
    </React.Fragment>
  );
}

export default Test;
