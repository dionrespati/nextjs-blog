import React from 'react';
import { useAppContext } from "../../context/app";
import {
  shape, string, number
} from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const CartButtonSet = ({ item }) => {
  const { addToCart, login } = useAppContext();
  return (
    <>
      
      {login !== null && (
      <>  
        <Tooltip title="Add to favorite/wishlist">
        <IconButton 
          aria-label="Add to favorite/wishlist" 
          size="medium"
          sx={{border: "1px solid", borderRadius: 1, marginRight: 0.1}}
        >
          <FavoriteIcon sx={{color: "blue"}} />
        </IconButton>
        </Tooltip>  

        <Tooltip title="Add to Cart">
        <IconButton 
          aria-label="Add to Cart" 
          size="medium"
          sx={{ backgroundColor: "green", border: "1px solid", borderRadius: 1, marginRight: 0.1}}
          onClick={() => addToCart(item)}
        >
          <AddShoppingCartIcon sx={{color: "white"}} />
        </IconButton>
        </Tooltip>
       </> 
      )}
      
      <Tooltip title="See Detail">
        <IconButton
          aria-label="See Detail" 
          size="medium"
          sx={{border: "1px solid", borderRadius: 1}}
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

CartButtonSet.propTypes = {
  item: {
    prdcd: "", 
    prdnm: "", 
    qty: 0, 
    price_w: 0, 
    price_e: 0, 
    price_cw: 0,
    price_ce: 0,
    bv: 0, 
    img_url: "",
    weight: 0.0
  }
}  

CartButtonSet.propTypes = {
  item: shape({
    prdcd: string.isRequired, 
    prdnm: string.isRequired, 
    qty: number.isRequired, 
    price_w: number.isRequired, 
    price_e: number.isRequired, 
    price_cw: number.isRequired,
    price_ce: number.isRequired,
    bv: number.isRequired, 
    img_url: string.isRequired,
    weight: number.isRequired
  }).isRequired,
};

export default CartButtonSet;