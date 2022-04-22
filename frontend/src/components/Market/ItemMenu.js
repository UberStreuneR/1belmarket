import React from "react";
import {
  Container,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const categories = [
  { title: "Пасха", id: 1 },
  { title: "Молоко, яйца и молочная продукция", id: 2 },
  { title: "Сыры", id: 3 },
  { title: "Мясо, птица, кролик", id: 4 },
];

function ItemMenu(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper" }}
      component="nav"
    >
      {categories
        .filter((category) => category.id !== 4)
        .map((category) => (
          <ListItemButton key={category.id}>
            <ListItemText>
              <Typography variant="body1">{category.title}</Typography>
            </ListItemText>
          </ListItemButton>
        ))}
      <ListItemButton key={categories[3].id} onClick={handleClick}>
        <ListItemText>
          <Typography variant="body1">{categories[3].title}</Typography>
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton key={categories[2].id} sx={{ pl: 4 }} onClick>
            <ListItemText>
              <Typography variant="subtitle2" color="text.secondary">Говядина</Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton key={categories[2].id} sx={{ pl: 4 }} onClick>
            <ListItemText>
              <Typography variant="subtitle2" color="text.secondary">Бекон</Typography>
            </ListItemText>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

export default ItemMenu;
