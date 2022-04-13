import React from 'react';
import {makeStyles} from "@mui/styles";
import {Card, CardMedia, Typography} from "@mui/material";

const image = "https://source.unsplash.com/random";

const useStyles = makeStyles({
  categoryCard: {
    height: "250px",
    width: "250px",
    borderRadius: "10px !important",
    position: "relative",
  },
});


function CategoryCard({ category }) {
    const classes = useStyles();
    return (
        <Card className={classes.categoryCard}>
            <Typography variant="h4" sx={{ color: 'white', position: 'absolute', mt: 2, ml: 2 }}>{category.title}</Typography>
            <CardMedia component="img" height="250" src={image} alt="Category image" />
        </Card>
    );
}

export default CategoryCard;