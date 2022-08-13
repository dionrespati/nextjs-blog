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

import AddReduceButton from '../cart/addReduceButton';
import CartButtonSet from '../cart/cartButtonSet';
import { currency_format } from '../../custom/contoh';

const ProductList = memo(({ item, login }) => {
  
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

  const isiQty = 0;
  console.log(`Komponen productList invoked..`);

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
