import React, { useState } from "react";
import {
  Container,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useGetCategoryTreeQuery } from "../../redux/slices/apiSlice";

import { useNavigate, useLocation } from "react-router-dom";

const ItemMenuButton = ({ category }) => {
  const [open, setOpen] = useState(category.open);
  const navigate = useNavigate();

  function navigateToCategory(category) {
    let hierarchy = category.hierarchy.slice(5).toLowerCase();
    let name = category.name.toLowerCase();
    navigate("/items/" + hierarchy + "/" + name);
  }

  return (
    <>
      <ListItemButton
        key={category.id}
        onClick={() => {
          navigate("/items/" + category.name.toLowerCase());
        }}>
        <ListItemText>
          <Typography variant="h6">{category.name}</Typography>
        </ListItemText>
        {open ? (
          <ExpandLess
            fontSize="large"
            onClick={e => {
              e.stopPropagation();
              setOpen(false);
            }}
          />
        ) : (
          <ExpandMore
            fontSize="large"
            onClick={e => {
              e.stopPropagation();
              setOpen(true);
            }}
          />
        )}
      </ListItemButton>
      {category.children ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {category.children.map(subcategory => (
              <ListItemButton
                key={subcategory.id}
                sx={{ pl: 4 }}
                onClick={() => {
                  navigateToCategory(subcategory);
                }}>
                <ListItemText>
                  <Typography variant="body1" color="text.secondary">
                    {subcategory.name}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
};

function ItemMenu(props) {
  const [open, setOpen] = React.useState(false);
  const { data: categoryTree, isSuccess } = useGetCategoryTreeQuery();

  // console.log("Category tree", categoryTree);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper" }}
      component="nav">
      {categoryTree?.children?.map(category => (
        <ItemMenuButton category={category} key={category.id} />
      ))}
    </List>
  );
}

export default ItemMenu;
