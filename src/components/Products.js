import { useHistory} from "react-router-dom";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  InputAdornment,
  TextField,npm 
} from "@mui/material";
import { Box } from "@mui/system";
import Cart from "./Cart";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import {generateCartItemsFrom} from "./Cart";
import {getTotalCartValue} from "./Cart";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import { OutlinedInput } from "@mui/material";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { ConnectingAirportsOutlined } from "@mui/icons-material";
import {
  ShoppingCart
} from "@mui/icons-material";

let timer;

const Products = () => {
  const {enqueueSnackbar} = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  let arr=[];
  const [cardsData,setCardsData] = useState(arr);
  const [cartData, setCartData] = useState(arr);

  const token = localStorage.getItem("token");

  const performAPICall = async()=>{
    const url = config.endpoint+"/products";
    try{
      const response = await axios.get(url);
      setCardsData(response.data);
    }
    catch (error){
  
        if (error.response) {
          enqueueSnackbar("Error occured",{variant:"error"});
        } else if (error.request) {
          enqueueSnackbar("Error occured",{variant:"error"});
        } else {
          enqueueSnackbar(error.message,{variant:"error"});
        }
    }
    finally{
      setIsLoading(false);
    }
  }

  const performSearch = async (text)=>{
    const url = config.endpoint+"/products/search?value="+text;
    try{
      let response = await axios.get(url);
      setCardsData(response.data);
    }
    catch(error){
        if (error.response.status === 404){
          let arr = [];
          setCardsData(arr);
        }
        else{
          enqueueSnackbar("Error occured while searching", {variant:"error"});
        }
    }
  }

  const debounceSearch = (event)=>{
    if (timer){
      clearTimeout(timer);
    }
    timer = setTimeout(()=>{
    performSearch(event.target.value);
    },500);  
  }

  const fetchCart = async(token)=>{
    if (!token) return;
    try {
      const url = `${config.endpoint}/cart`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      return null;
    }
  }

  const isItemInCart = (productId)=>{
    console.log(cartData);
    for (let i=0; i<cartData.length; i++){
      if (cartData[i]._id === productId){
        return true;
      }
    }
    return false;
  }

  const addToCart = async(obj, productId, quantity, button)=>{
    const url = config.endpoint + "/cart";
    let token = localStorage.getItem("token");
    let authorization = "Bearer "+token;
    const header = {
      headers : {"Authorization": authorization}
    };
    if (!obj.cartButtons){
      if (isItemInCart(productId)){
        enqueueSnackbar( "Item already in cart. Use the cart sidebar to update quantity or remove item.", {variant:"warning"});
        return;
      }
      else{
        const data = {productId:productId, qty:1};
        console.log(data);
        let response = await axios.post(url, data, header);
        let completeCartData = generateCartItemsFrom(response.data,cardsData);
        setCartData(completeCartData);
      }
    }
    else{
      if (button === "add") quantity+=1;
      else quantity-=1;
      const data = {productId:productId, qty:quantity};
      let response = await axios.post(url, data, header);
      let completeCartData = generateCartItemsFrom(response.data,cardsData);
      setCartData(completeCartData);
    }
  }

  useEffect(()=>{
    performAPICall();
  },[]);

  useEffect(() => {
    fetchCart(token)
      .then((cartData) => {
        let cartItems = generateCartItemsFrom(cartData, cardsData)
        setCartData(cartItems);
      })
  }, [cardsData]);
  
  return (
    <div name="products">
      <Header>
      <Box className="search-desktop">
          <TextField
              placeholder="Search for items/categories" 
              id="outlined-end-adornment"
              name="search"
              sx={{m: 1, width:'50vw'}}
              InputProps={{
                endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
              }}
              onChange={(e)=>{
                debounceSearch(e);
              }}
          />
        </Box>
      </Header >
      
      <Box className="search-mobile">
        <TextField
            placeholder="Search for items/categories" 
            id="outlined-end-adornment"
            name="search"
            sx={{ m: 1, width:'70vw'}}
            InputProps={{
              endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
            }}
            onChange={(e)=>{
              debounceSearch(e);
            }}
        />
      </Box>
       <Grid container>
        
         <Grid item className="product-header">
            <Box className="hero" name="header">
              <p className="hero-heading">
                India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
                to your door step
              </p>
            </Box>
          </Grid>

          <Grid item className="products">
            {isLoading ?
              <div className="loading">
                <CircularProgress/>
                <h3>Loading Products</h3>
              </div>
              :
              (cardsData.length>0) ?
                (localStorage.getItem("username")) ?
                  <Grid container>
                    <Grid item md={9}>
                      <Grid container sx={{ mt: '1rem' }} >
                        {
                        cardsData.map((x,idx)=>(
                          <Grid item xs={6} sm={4} md={3} key={idx.toString()}>
                            <ProductCard product={x} handleAddToCart={()=>{
                              if (!localStorage.getItem("username")){
                                enqueueSnackbar("Login to add an item to the Cart", {variant:"warning"});
                              }
                              let obj = {cartButtons:false};
                              addToCart(obj, x._id, 1);
                            }}/>
                          </Grid>
                        ))
                        }
                      </Grid>
                    </Grid>
                    <Grid item md={3}>
                    
                      <Cart products={cardsData} items={cartData} isReadOnly={false} handleQuantity={(event)=>{
                        let obj = {cartButtons:true};
                        let productId = event.target.id;
                        let button = event.currentTarget.id; 
                        
                        let cartItem = cartData.find(x=>{
                          if (x._id === productId){
                            return x;
                          }
                        })

                        addToCart(obj, productId, cartItem.qty, button);
                      }}/>
                       
                    </Grid>
                  </Grid>
                  :
                  <Grid container m={1}>
                    {
                    cardsData.map((x,idx)=>(
                      <Grid item xs={6} sm={4} md={3} key={idx.toString()}>
                        <ProductCard product={x} handleAddToCart={()=>{
                          enqueueSnackbar("Login to add items to Cart", {variant:"warning"});
                        }}/>
                      </Grid>
                    ))
                    }
                  </Grid>
                :
                <div className="no-products">
                  <SentimentDissatisfiedIcon/>
                  <p>No products found</p>
                </div>
            }
          </Grid>
          
       </Grid>
      <Footer />
    </div>
  );
};

export default Products;
