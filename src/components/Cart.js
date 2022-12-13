import { SignalCellularConnectedNoInternet4Bar } from "@mui/icons-material";
import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
// {id, }

export const generateCartItemsFrom = (cartData, productsData) => {
  if (!cartData) {
    let arr = [];
    return arr;
  }
  let completeCartData = [];
  for (let i=0; i<cartData.length; i++){
    let item = productsData.find((x)=>{
      let product;
      if (x._id === cartData[i].productId) {
        product = x;
        product.qty = cartData[i].qty;
      }
      return product;
    });
    if (item)
    {
      completeCartData.push(item);
    }

  } 
  return completeCartData;
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  let cartValue = 0;
  for (let i=0; i<items.length; i++){
    let qty = items[i].qty;
    let cost = items[i].cost;
    let totalCost = qty*cost;
    cartValue += totalCost;
  }

  return cartValue;
}

export const getTotalItems = (items = [])=>{
  let cartQuantity = 0;
  for (let i=0; i<items.length; i++){
    let qty = items[i].qty;
    cartQuantity += qty;
  }
  return cartQuantity;
}

/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * 
 */
const ItemQuantity = ({
  value,
  productId,
  handleAdd,
  handleDelete,
  readOnly
}) => {
  
  return (
    (!readOnly)?
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" id="remove" onClick={handleDelete}>
        <RemoveOutlined id={productId}/>
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" id="add" onClick={handleAdd}> 
        <AddOutlined id={productId}/>
      </IconButton>
    </Stack>
    :
    <Stack direction="row" alignItems="center">
      <Typography>Qty: {value}</Typography>
    </Stack>

  );
}

/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 * 
 */
const Cart = ({
  isReadOnly,
  products,
  items = [],
  handleQuantity,
}) => {
  const history = useHistory();

  return (
    <>
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        {
          (items.length === 0) ?
            <Box className="cart empty">
              <ShoppingCartOutlined className="empty-cart-icon" />
              <Box color="#aaa" textAlign="center">
                Cart is empty. Add more items to the cart to checkout.
              </Box>
            </Box>
            :
            <Box>
            {
              items.map((cartItem, idx)=>(
              <Box display="flex" alignItems="flex-start" padding="1rem" key={idx.toString()}> 
                <Box className="image-container">
                  <img
                    // Add product image
                    src={cartItem.image}
                    // Add product name as alt eext
                    alt={cartItem.name}
                    width="100%"
                    height="100%"
                  />
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height="6rem"
                    paddingX="1rem"
                >
                    <div>{cartItem.name}</div>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                    {
                      (isReadOnly === true)?
                      <ItemQuantity
                      // Add required props by checking implementation
                      value={cartItem.qty} productId={cartItem._id} handleAdd={handleQuantity} handleDelete = {handleQuantity} readOnly={true}
                      />
                      :
                      <ItemQuantity
                      // Add required props by checking implementation
                      value={cartItem.qty} productId={cartItem._id} handleAdd={handleQuantity} handleDelete = {handleQuantity} readOnly={false}
                      />
                    }
                    <Box padding="0.5rem" fontWeight="700">
                        ${cartItem.cost}
                    </Box>
                    </Box>
                </Box>        
            </Box>))
            }
            <Box
              padding="1rem"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
            <Box color="#3C3C3C" alignSelf="center">
              Order total
            </Box>
            <Box
              color="#3C3C3C"
              fontWeight="700"
              fontSize="1.5rem"
              alignSelf="center"
              data-testid="cart-total"
            >
              {"$" + getTotalCartValue(items)}
            </Box>
            </Box>
          
            <Box display="flex" justifyContent="flex-end" className="cart-footer">
              {
                (isReadOnly === false) && 
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  className="checkout-btn"
                  onClick={()=>
                    {history.push("/checkout",{from:"/"})}
                  }
                >
                  Checkout
                </Button>
              }
            </Box>
      
              </Box>
          }
          
        </Box>
      </>
    
  );
};

export default Cart;
