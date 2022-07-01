import React from 'react';
import Grid from '@mui/material/Grid';
import { currency_format } from '../../custom/contoh';




const productList = (props) => {
  
  const {productId, productName, price, img, cart, setCart} = props;
  
  const addToCart = (id, nama, harga, img) => {
    const index = cart.findIndex(el => el.productId === id);
    if(index >= 0) {
      cart[index].qty += 1;
      setCart([...cart]);
    } else {
      setCart([
        ...cart,
        {
          productId: id,
          productName: nama,
          price: harga,
          img: img,
          qty: 1
        }
      ]);
    }
  };
  
  return (
    <Grid item xs={6} md={4}>
        <h2>{productName}</h2>
        <img src={img} alt="" width="25%" height="25%" />
        <p>Harga{currency_format(price)}</p>
    </Grid>
  );
};

export default productList;
