import { AddShoppingCartOutlined, ProductionQuantityLimitsOutlined } from "@mui/icons-material";
import axios from "axios"
import { CircularProgress } from "@mui/material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { config } from "../App";
import React from "react";
import "./ProductCard.css";
import { useSnackbar } from "notistack";

const ProductCard = ({ product, handleAddToCart }) => {

  return (
    <Card className="card">
      <img src={product.image} alt="item"/>
      <p className="card-text">
        {product.name}
        <br/>
        <span className="card-cost"> ${product.cost} </span>
        <br/>
        <Rating name="size-medium" value={product.rating} readOnly/>
        <span>({product.rating})</span>
      </p>
      <Button className="card-button" variant="contained" onClick={handleAddToCart}>
        ADD TO CART
      </Button>
    </Card>           
  )
};

export default ProductCard;
