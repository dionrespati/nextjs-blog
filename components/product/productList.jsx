import React, {memo} from 'react';
import {
  func, shape, string, number
} from 'prop-types';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

/* import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchIcon from '@mui/icons-material/Search'; */

import AddReduceButton from '../cart/addReduceButton';
import CartButtonSet from '../cart/cartButtonSet';
import { currency_format } from '../../custom/contoh';

const ProductList = memo(({ item, login }) => {
  /*const { login } = useAppContext(); 
  const cart = {
    data: []
  };
  const { data:isiCart = [] } = cart;
  */
  
  
  const { prdcd, prdnm, price_w, price_e, img_url, price_ce, price_cw } = item;
  const infoHargaA = login !== null ? `Rp ${currency_format(price_w)}` : `Rp ${currency_format(price_cw)}`;
  const infoHargaB = login !== null ? `Rp ${currency_format(price_e)}` : `Rp ${currency_format(price_ce)}`;

  let variantSize = "h6";
  const panjang = prdnm.length;
  if(panjang > 15 && panjang <= 20) {
    variantSize = "subtitle1";
  } else if(panjang > 20) {
    variantSize = "subtitle2";
  }

  /* const ifPrdInCart =  isiCart.filter(c => c.prdcd === prdcd); 
  const isiQty = ifPrdInCart.length > 0 ? ifPrdInCart[0].qty : 0;
  const itemCart = ifPrdInCart[0]; */

  const isiQty = 0;

  /* useEffect(() => {
    console.log(`Komponen productList invoked..`);
  }); */

  console.log(`Komponen productList invoked..`);

  /* const addToCart = (item) => {
    
    const { data } = cart;
    //console.log({dataPrd});
    const index = data.filter(el => el.prdcd === item.prdcd);
    if(index.length === 1) return alert("Produk sudah ada dalam keranjang..");

    const newItem = {...item, qty: 1};
    const newArr = [ ...data, newItem ];
    setCart({ ...cart, data: newArr });
    alert(`Produk ${item.prdnm} sudah dimasukkan ke dalam keranjang`);
    //window.localStorage.setItem("cart_content", JSON.stringify(cart));
  };
   */
  return (
    <Grid item xs={12} md={3} justifyContent="space-between">
      <Card variant="outlined" sx={{ maxWidth: 320, mb: 3 }}>
        <CardContent>
          <Typography sx={{textAlign: "center"}} variant={variantSize} color="text.secondary">
           <b>{prdnm}</b>
          </Typography>  
        </CardContent>
        <CardMedia
          component="img"
          image={img_url}
          alt="Paella dish"
          sx={{width:"100", height:"50"}}
        />
        <CardContent>  
          <Grid container spacing={0.05} sx={{textAlign: "center"}}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Wilayah A
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {infoHargaA}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="text.secondary">
               Wilayah B
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {infoHargaB}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        
        {isiQty === 0 && (
        <CardActions>
          <CartButtonSet 
            item={item}
          />
        </CardActions>
        )} 

        {isiQty > 0 && (
        <CardActions disableSpacing>
          <AddReduceButton 
            item={item}  
            qty={isiQty}
          />
        </CardActions>
        )}

      </Card>
    </Grid>
  );
});

ProductList.propTypes = {
  item: shape({
    prdcd: string,
    prdnm: string,
    price_w: number,
    img_url: string,
  }).isRequired
};

export default ProductList;
