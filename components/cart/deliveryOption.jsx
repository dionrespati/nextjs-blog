import React, { useState } from 'react'
import {
  func
} from 'prop-types';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';

import { useAppContext } from '../../context/app';
import ListArea from './listArea';
import TitleForm from '../layout/titleForm';
import { currency_format } from '../../custom/contoh';
import Button from '@mui/material/Button';
import RekapTransaksi from './rekapTransaksi';
import ListAlamat from './listAlamat';


const DeliveryOption = ({setStep}) => {
  console.log(`komponen DeliveryOption rendered`);

  const { cart, login, setCart } = useAppContext();
  const  {data:isiCart, pricecode, sentTo:jenis_kirim, totalHarga, totalBv, totalWeight, totalItem } = cart;
  const [sentTo, setSentTo] = useState(true);
  const [showRekapTrx, setShowRekapTrx] = useState(true);


  const buttonStyle = {textTransform: 'capitalize', fontSize: '18px'};

  const backToCart = () => {
    setStep(0);
  }

  const pilihPembayaran = () => {
    setStep(2);
  }

  const pilihPengiriman = () => {
    setSentTo(!sentTo);
    const nilai = sentTo ? "2" : "1";
    const sentToArr = {
      ...cart, sentTo: nilai
    }
    setCart(sentToArr);
  }

  const { listAddrMemb } = cart;

  let totalQty = 0;
  let totalSubProduk = 0;
  let subTotal = 0;  
  let totalBV = 0;
  const jumRecord = isiCart.length;
  let nowRecord = 0;

  const gridPrd = { 
    height: "auto",
    padding: 0.2,
    marginLeft: 2
  };

  const gridListPrd = {
    height: "auto"
  }

  return (
    <>
      <Grid item md={6} xs={12} sx={{p: 1}}>
        <Paper variant='outlined'>
          <TitleForm title="Pengiriman" />
          <List component="nav">
            <ListItem key="pilKirim2">
              <FormControl component="fieldset" variant="standard">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch checked={jenis_kirim === "2" ? true : false} onChange={pilihPengiriman} name="sentTo" />
                    }
                    label={jenis_kirim === "1" ? "Diambil di Stockist" : "Dikirim ke Alamat"}
                  />
                </FormGroup>
              </FormControl>
            </ListItem> 
            {jenis_kirim === "1" && (
              <ListArea />
            )}

            {jenis_kirim === "2" && (
              <ListAlamat />
            )}
          </List> 
          <ListItem key="pilKirim3">  
            <Button
              size="large"
              variant="contained"
              fullWidth
              sx={buttonStyle}
              onClick={backToCart}
              color="warning"
            >
              Ubah Keranjang Belanja
            </Button>
          </ListItem>
          <ListItem key="pilKirim4">  
            <Button
              size="large"
              variant="contained"
              fullWidth
              sx={buttonStyle}
              onClick={pilihPembayaran}
              disabled={true}
            >
              Pilih Pembayaran
            </Button>
          </ListItem>
        </Paper>   
      </Grid>
      <Grid item md={6} xs={12} sx={{p: 1}}>
        {/* <Paper variant='outlined'>
          <TitleForm title="List Produk / Rekap Transaksi" />
          <List component="nav">
            <ListItem key="pilKirim2">
                <FormControl component="fieldset" variant="standard">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch checked={showRekapTrx ? true : false} onChange={() => setShowRekapTrx(!showRekapTrx)} name="sentTo" />
                      }
                      label={showRekapTrx  == true ? "Rekap Transaksi" : "List Produk"}
                    />
                  </FormGroup>
                </FormControl>
              </ListItem>
              {isiCart && showRekapTrx === false && isiCart.map((item) => {
                const {prdnm, qty, price_w, price_e, price_cw, price_ce, bv, img_url } = item;
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
                      
                      <Grid item container xs={12} md={10}>
                        <Grid item xs={12} md={12} sx={gridPrd}>
                          <Typography variant="h6">
                            {prdnm}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} sx={gridPrd}>
                          
                          <Grid item container xs={12} md={12} direction="row" sx={gridListPrd}>
                            <Grid item xs={8} md={8}>
                              Sub Total Qty
                            </Grid>
                            <Grid item xs={1} md={1}>
                              :
                            </Grid>  
                            <Grid item xs={3} md={3} sx={{textAlign: "right"}}>
                              {currency_format(qty)}
                            </Grid>
                          </Grid>
                        </Grid> 
                        <Grid item xs={12} md={12} sx={gridPrd}>
                          
                          <Grid item container xs={12} md={12} direction="row" sx={gridListPrd}>
                            <Grid item xs={8} md={8}>
                              Sub Total BV
                            </Grid>
                            <Grid item xs={1} md={1}>
                              :
                            </Grid>  
                            <Grid item xs={3} md={3} sx={{textAlign: "right"}}>
                              {currency_format(subTotalBv)}
                            </Grid>
                          </Grid>
                        </Grid>  
                        <Grid item xs={12} md={12} sx={gridPrd}>
                          
                          <Grid item container xs={12} md={12} direction="row" sx={gridListPrd}>
                            <Grid item xs={8} md={8}>
                              Sub Total Harga
                            </Grid>
                            <Grid item xs={1} md={1}>
                              :
                            </Grid>  
                            <Grid item xs={3} md={3} sx={{textAlign: "right"}}>
                              {currency_format(subTotal)}
                            </Grid>
                          </Grid>
                        </Grid>  
                      </Grid>
                    </Grid>
                  </ListItem> 
                );      
              })}

              {showRekapTrx && (
                <RekapTransaksi 
                  totalHarga={totalHarga}
                  totalBv={totalBv}
                  totalItem={totalItem}
                  totalWeight={totalWeight}
                  header={false}
                />  
              )}
          </List> 
          
        </Paper> */}
      </Grid>
    </>
  )
}

DeliveryOption.propTypes = {
  setStep: func.isRequired,
};

export default DeliveryOption;