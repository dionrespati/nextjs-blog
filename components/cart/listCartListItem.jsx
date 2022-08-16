import React from 'react';
import {
  func, number
} from 'prop-types';
import { currency_format } from '../../custom/contoh';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TitleForm from '../layout/titleForm'; '../layout/titleForm';

import { useAppContext } from '../../context/app';
import AddReduceButton from './addReduceButton';
import MemberBV from './memberBV';
import RekapTransaksi from './rekapTransaksi';

const ListCartListItem = ({setStep}) => {

  const { cart, login} = useAppContext();

  const  {data:isiCart, pricecode } = cart;
  const buttonStyle = {textTransform: 'capitalize', fontSize: '18px'};

  let totalQty = 0;
  let totalSubProduk = 0;
  let subTotal = 0;  
  let totalBV = 0;
  const jumRecord = isiCart.length;
  let nowRecord = 0;


  const style = {
    height: 100,
    width: 100
  };
  
  const headerTitle = {
    backgroundColor: "lightblue"
  };

  const iconStyle = { 
    marginRight: 0.5, 
    height: "30px",
    width: "30px"
  };

  const gridPrd = { 
    height: "auto",
    padding: 0.2,
    marginLeft: 2
  };

  const nextStep = () => {
    setStep(step => step + 1);
  }
  
  return (
    <>
      <Grid item md={6} xs={12} sx={{p: 1}}>
        <Paper variant='outlined'>
          <TitleForm title="List Produk" />
          <List component="nav">  
            {isiCart && isiCart.map((item) => {
              const { prdcd, prdnm, qty, price_w, price_e, price_cw, price_ce, bv, img_url } = item;
              totalQty += qty;
              if(login !== null && pricecode == "12W4") {
                subTotal = qty * price_w;
              }

              if(login !== null && pricecode == "12E4") {
                subTotal = qty * price_e;
              }

              if(login === null && pricecode == "12W4") {
                subTotal = qty * price_cw;
              }

              if(login === null && pricecode == "12E4") {
                subTotal = qty * price_ce;
              }
              let subTotalBv = qty * bv;
              totalSubProduk += subTotal;
              totalBV += subTotalBv;
              nowRecord++;
              return ( 
                <ListItem key={nowRecord} divider={nowRecord < jumRecord ? true : false}>
                  <Grid item container xs={12} md={12} direction="row" sx={{padding: 1}}>
                    <Grid item xs={12} md={2} sx={{padding: 1}}>
                      <CardMedia
                        component="img"
                        image={img_url}
                        alt="Paella dish"
                        style={style}
                      />
                    </Grid>
                    <Grid item container xs={12} md={10}>
                      <Grid item xs={12} md={12} sx={gridPrd}>
                        <Typography variant="subtitle2">
                          {prdnm}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={12} sx={gridPrd}>
                        <Typography variant="subtitle2">
                          Sub Total BV : Rp. {currency_format(subTotalBv)}
                        </Typography>
                      </Grid>  
                      <Grid item xs={12} md={12} sx={gridPrd}>
                        <Typography variant="subtitle2">
                          Sub Total Harga : Rp. {currency_format(subTotal)}
                        </Typography>
                      </Grid>  
                      <Grid item xs={12} md={12} sx={gridPrd} alignItems="flex-end">
                        <AddReduceButton 
                          item={item}
                          qty={qty}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItem> 
              );      
            })}
            <ListItem>
              <Link href="/product">
                <Button
                  size="large"
                  variant="contained"
                  fullWidth
                  color="warning"
                  sx={buttonStyle}
                >
                  Tambah Produk
                </Button>
              </Link>
            </ListItem>
          </List>
        </Paper>  
      </Grid>  
      <Grid item md={5} xs={12} sx={{p: 1}}>
        <RekapTransaksi 
          totalHarga={totalSubProduk}
          totalBV={totalBV}
        /> 
        <MemberBV 
          nextStep={nextStep}
        />
      </Grid>
    </>
  )
}

ListCartListItem.propTypes = {
  setStep: func,
};

export default ListCartListItem;