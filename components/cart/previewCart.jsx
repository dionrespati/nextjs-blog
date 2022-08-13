import React from 'react';
import {
  number, shape, string,
} from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { currency_format } from '../../custom/contoh';

const PreviewCart = ({isiCart, pricecode, login}) => {

  let totalQty = 0;
  let totalPrice = 0;
  let totalBv = 0;

  return (
      <List
        sx={{
          width: '100%',
          maxWidth: 600,
          bgcolor: 'background.paper',
        }}
      >
        {isiCart && isiCart.map((item) => {
          const {prdcd, prdnm, qty, price_w, price_e, price_cw, price_ce, bv, img_url} = item;
          const isiJumlah = `Jumlah : ${qty}`;
          totalQty += qty;
          totalBv += qty * bv;
          
          if(login !== null && pricecode == "12W4") {
            totalPrice += qty * price_w;
          }

          if(login !== null && pricecode == "12E4") {
            totalPrice += qty * price_e;
          }

          if(login === null && pricecode == "12W4") {
            totalPrice += qty * price_cw;
          }

          if(login === null && pricecode == "12E4") {
            totalPrice += qty * price_ce;
          }
          return (           
            <ListItem key={prdcd} divider>
              <ListItemAvatar>
                <Avatar 
                  src={img_url} 
                  variant="square"
                />
              </ListItemAvatar>
              <ListItemText primary={prdnm} secondary={isiJumlah} />
            </ListItem>
          );      
        })}
        <ListItem key="total" >
          <ListItemAvatar>
            <ShoppingCartCheckoutIcon></ShoppingCartCheckoutIcon>
          </ListItemAvatar>
          <ListItemText primary={`Total Qty : ${totalQty}`} secondary={`Total Harga : Rp ${currency_format(totalPrice)}`} />
        </ListItem>
      </List>

  )
}

PreviewCart.defaultProps = {
  login: null
};

PreviewCart.propTypes = {
  isiCart: shape({
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

  pricecode: string, 
  
  login: shape({
    userlogin: string,
    loginname: string
  }) 
};

export default PreviewCart;