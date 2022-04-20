import * as React from "react";
import {
  Card,
  CardMedia,
  CardActions,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Checkbox,
  Collapse,
} from "@mui/material";
import {
  DeleteOutlined,
  Favorite,
  FavoriteBorder,
  Share,
  Bookmark,
  BookmarkBorder,
  ExpandMore,
} from "@mui/icons-material";
import { styled } from "@mui/system";
const image = "https://source.unsplash.com/random";

const GreenBookmark = styled(Bookmark)({
  fill: "#11ad32",
});

// const Expand = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function NoteCard({ note, handleDelete }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card elevation={1} sx={{ height: "100%" }}>
      <CardHeader
        action={
          <IconButton onClick={() => handleDelete(note.id)}>
            <DeleteOutlined />
          </IconButton>
        }
        title={note.title}
        subheader={note.category}
      />
      <CardMedia component="img" height="194" src={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {note.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
        <Checkbox icon={<BookmarkBorder />} checkedIcon={<GreenBookmark />} />
        {/*<Expand*/}
        {/*  expand={expanded}*/}
        {/*  onClick={handleExpandClick}*/}
        {/*  aria-expanded={expanded}*/}
        {/*  aria-label="show more"*/}
        {/*>*/}
        {/*  <ExpandMore />*/}
        {/*</Expand>*/}
      </CardActions>
      {/*<Collapse in={expanded} timeout="auto" unmountOnExit>*/}
      {/*  <CardContent>*/}
      {/*    <Typography paragraph>Method:</Typography>*/}
      {/*    <Typography paragraph>*/}
      {/*      Heat 1/2 cup of the broth in a pot until simmering, add saffron and*/}
      {/*      set aside for 10 minutes.*/}
      {/*    </Typography>*/}
      {/*    <Typography paragraph>*/}
      {/*      Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet*/}
      {/*      over medium-high heat. Add chicken, shrimp and chorizo, and cook,*/}
      {/*      stirring occasionally until lightly browned, 6 to 8 minutes.*/}
      {/*      Transfer shrimp to a large plate and set aside, leaving chicken and*/}
      {/*      chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,*/}
      {/*      onion, salt and pepper, and cook, stirring often until thickened and*/}
      {/*      fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2*/}
      {/*      cups chicken broth; bring to a boil.*/}
      {/*    </Typography>*/}
      {/*    <Typography paragraph>*/}
      {/*      Add rice and stir very gently to distribute. Top with artichokes and*/}
      {/*      peppers, and cook without stirring, until most of the liquid is*/}
      {/*      absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved*/}
      {/*      shrimp and mussels, tucking them down into the rice, and cook again*/}
      {/*      without stirring, until mussels have opened and rice is just tender,*/}
      {/*      5 to 7 minutes more. (Discard any mussels that don’t open.)*/}
      {/*    </Typography>*/}
      {/*    <Typography>*/}
      {/*      Set aside off of the heat to let rest for 10 minutes, and then*/}
      {/*      serve.*/}
      {/*    </Typography>*/}
      {/*  </CardContent>*/}
      {/*</Collapse>*/}
    </Card>
  );
}
