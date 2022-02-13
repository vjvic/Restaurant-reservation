import React, { useEffect } from "react";
import {
  Box,
  Typography,
  /*  FormControl,
  InputLabel,
  Select,
  MenuItem, */
  Stack,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
/* import DeleteIcon from "@mui/icons-material/Delete"; */
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/actions/cartAction";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CartItem, CartItemImg, CartItemContent } from "./styles";

const Item = ({ item }) => {
  const { image, name, price, countInStock, meal, qty } = item;

  const dispatch = useDispatch();

  useEffect(() => {
    if (qty === 0 || countInStock === 0) {
      dispatch(removeFromCart(meal));
    }
  }, [dispatch, qty, meal, countInStock]);

  return (
    <CartItem /* sx={{ display: "flex", alignItems: "center", marginY: 2 }} */>
      <CartItemImg
        component="img"
        /* sx={{ width: 151, height: 100 }} */
        image={image}
        alt={name}
      />

      <CartItemContent>
        <div>
          <Typography component="h3" variant="h5">
            {name}
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold" component="div">
            &#8369; {price}
          </Typography>
        </div>
        <Box sx={{ flexGrow: 1 }} />
        {countInStock === 0 && (
          <Typography sx={{ color: "red" }}>out of stock</Typography>
        )}
        {countInStock > 0 && (
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              onClick={() => dispatch(addToCart(meal, qty - 1))}
              disabled={qty === 0}
            >
              <RemoveIcon />
            </IconButton>

            <div>{qty}</div>

            <IconButton
              variant="contained"
              onClick={() => dispatch(addToCart(meal, qty + 1))}
              disabled={qty >= countInStock}
            >
              <AddIcon />
            </IconButton>
          </Stack>
        )}
      </CartItemContent>
      {/* <Box sx={{ flex: 1 }} /> */}
      {/*  <FormControl sx={{ marginX: 2 }} color="secondary">
        <InputLabel>Qty</InputLabel>
        <Select
          value={qty}
          onChange={(e) => dispatch(addToCart(meal, Number(e.target.value)))}
          label="Qty"
        >
          {[...Array(countInStock).keys()].map((x) => (
            <MenuItem key={x + 1} value={x + 1}>
              {x + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

      {/* <IconButton
        sx={{ marginRight: 2 }}
        onClick={() => dispatch(removeFromCart(meal))}
      >
        <DeleteIcon />
      </IconButton> */}
    </CartItem>
  );
};

export default Item;
