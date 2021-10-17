import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextTruncate from "react-text-truncate";

const Item = ({ item }) => {
  const { strMealThumb, strMeal, strArea } = item;

  return (
    <Card>
      <CardHeader title={strMeal} subheader={strArea} />

      <CardMedia
        component="img"
        height="194"
        image={strMealThumb}
        alt={strMeal}
      />

      <CardContent>
        <Typography component="span" variant="body2" color="text.secondary">
          <TextTruncate
            line={3}
            truncateText="…"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
          />
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Typography>&#8369; 500</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton>
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Item;
