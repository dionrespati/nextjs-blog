import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAppContext } from "../../context/app";

const CartButtonSet = ({ item }) => {
  const { addToCart } = useAppContext();
  return (
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

export default CartButtonSet;