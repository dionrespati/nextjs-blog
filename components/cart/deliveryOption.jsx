import { useState } from 'react'
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


const DeliveryOption = ({setStep}) => {
  const { cart, login, setCart } = useAppContext();
  const  {data:isiCart, pricecode, sentTo:jenis_kirim } = cart;
  const [sentTo, setSentTo] = useState(true);

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

  return (
    <>
      <Grid item md={6} xs={12} sx={{p: 1}}>
        <Paper variant='outlined'>
          <TitleForm title="Pengiriman" />
          <List component="nav" nested>
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
            {jenis_kirim === "1" &&  (
              <ListArea />
            )}

            {jenis_kirim === "2" &&  (
              <div>Div dikirim ke alamat</div>
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
        <Paper variant='outlined'>
          <TitleForm title="List Produk" />
          <List component="nav">
          {isiCart && isiCart.map((item) => {
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
                        <Typography variant="subtitle2">
                          Sub Total BV : Rp. {currency_format(subTotalBv)}
                        </Typography>
                      </Grid>  
                      <Grid item xs={12} md={12} sx={gridPrd}>
                        <Typography variant="subtitle2">
                          Sub Total Harga : Rp. {currency_format(subTotal)}
                        </Typography>
                      </Grid>  
                    </Grid>
                  </Grid>
                </ListItem> 
              );      
            })}
            {/* <RekapTransaksi 
              totalHarga={totalSubProduk}
              totalBV={totalBV}
            /> */} 
          </List> 
          {/* <PreviewCart 
            isiCart={isiCart}
            login={login}
            pricecode={pricecode}
          /> */}
        </Paper>
      </Grid>
    </>
  )
}

RekapTransaksi.propTypes = {
  setStep: func.isRequired,
};

export default DeliveryOption;