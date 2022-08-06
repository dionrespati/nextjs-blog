import React from 'react';
/* import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material'; */
import { currency_format } from '../../custom/contoh';

import Tooltip from '@mui/material/Tooltip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
/* import {
  shape, string, number
} from 'prop-types'; */
import { useAppContext } from '../../context/app';
import AddReduceButton from './addReduceButton';

const ListCartListItem = ({step, setStep}) => {

  const { cart, setCart} = useAppContext();

  const { idmember, membername, data:isiCart } = cart;

  let totalQty = 0;
  let totalPriceW = 0;
  let totalPriceE = 0;
  let totalBV = 0;
  const jumRecord = isiCart.length;
  let nowRecord = 0;


  const style = {
    height: 100,
    width: 100
  };

  const buttonStyle = {textTransform: 'capitalize', fontSize: '18px'};

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

  const handleOnChange = (e) => {
    setCart({ ...cart, [e.target.name]: e.target.value, });
  };

  /* const updateQty = (e, item) => {
    const { value } = e.target;
    updateCartQty(item, value);
  }

  const updateCartQty = (item, value) => {
    if(value === 0) {
      alert("Minimal Qty adalah 1..");
    } else {
      let i = 0;
      let isiDataCart = isiCart;
      isiDataCart.map((datax) => {
        if(datax.prdcd === item.prdcd) {
          isiDataCart[i].qty = parseInt(value);
        }
        i++;
      });
      setCart({ ...cart, data: isiDataCart });
    }
  }

  const deleteItemCart = (item) => {
    const {prdcd, prdnm} = item;
    //alert(`Produk ${prdnm} akan dihapus..`);
    const newCart = isiCart.filter(el => el.prdcd !== item.prdcd);
    console.log({newCart})
    setCart({ ...cart, data: newCart });
    alert(`Produk ${prdnm} sudah hapus..`);
  } */

  const nextStep = () => {
    setStep(step => step + 1);
  }
  
  
  return (
    <>
      <Grid item md={6} xs={12} sx={{p: 1}}>
        <Paper variant='outlined'>
          <List component="nav">
            <ListItem key="head1" divider>
              <Typography variant="h6">
                List Produk
              </Typography>
            </ListItem>
            {isiCart && isiCart.map((item) => {
              const {prdnm, qty, price_w, price_e, bv, img_url} = item;
              totalQty += qty;
              totalPriceW += qty * price_w;
              totalPriceE += qty * price_e;
              totalBV += qty * bv;
              nowRecord++;
              return ( 
                <>
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
                            Sub Total BV : Rp. {currency_format(qty * bv)}
                          </Typography>
                        </Grid>  
                        <Grid item xs={12} md={12} sx={gridPrd}>
                          <Typography variant="subtitle2">
                            Sub Total Harga : Rp. {currency_format(qty * price_w)}
                          </Typography>
                        </Grid>  
                        <Grid item xs={12} md={12} sx={gridPrd} alignItems="flex-end">
                          {/* <Tooltip title="Kurangi Jumlah">
                            <IconButton 
                              aria-label="add to shopping cart" 
                              sx={iconStyle}
                              onClick={() => addToCart(item)}
                            >
                              <RemoveIcon sx={{color: "red"}} size="medium" />
                            </IconButton>
                          </Tooltip>               
                          <TextField 
                            variant="outlined"
                            value={qty}
                            size="small"
                          />
                          <Tooltip title="Tambah Jumlah">
                            <IconButton 
                              aria-label="add to shopping cart" 
                              sx={iconStyle}
                              onClick={() => addToCart(item)}
                            >
                              <AddIcon sx={{color: "green"}} size="medium" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Hapus dari keranjang">
                            <IconButton color="error">
                                <DeleteIcon fontSize="inherit" size="large" />
                            </IconButton>
                          </Tooltip> */}
                          {/* <ButtonGroup disableElevation size="small" color="success" variant="outlined">
                            <Button onClick={() => updateCartQty(item, qty - 1)}>
                              <RemoveIcon sx={{color: "red"}} />
                            </Button>
                            <input type="text" name="changeQty" value={qty} onChange={event => updateQty(event, item)} size="4" style={{textAlign: "center"}} />
                            <Button onClick={() => updateCartQty(item, qty + 1)}>
                              <AddIcon sx={{color: "green"}} />
                            </Button>
                            <Tooltip title="Lihat Detail" arrow>
                              <Button>
                                <SearchIcon sx={{color: "lightblue"}} />
                              </Button>
                            </Tooltip>
                            <Tooltip title="Hapus dari keranjang" arrow>
                              <Button onClick={() => deleteItemCart(item)}>
                                <DeleteIcon color="error"  />
                              </Button>
                            </Tooltip>
                          </ButtonGroup> */}
                          <AddReduceButton 
                            item={item}
                            qty={qty}
                          />
                        </Grid>
                      </Grid>
                      
                    </Grid>
                  </ListItem> 
                </>
              );      
            })}
          </List>
        </Paper>  
      </Grid>  
      <Grid item md={5} xs={12} sx={{p: 1}}>
        <Paper variant="outlined" sx={{width: '100%', mb: 2}}>
          <List component="nav">
            <ListItem key="headRekap" divider>              
              <Typography variant="h6">Rekap Transaksi</Typography>
            </ListItem> 
            <ListItem key="totHarga" divider>
              <Typography variant="subtitle1" sx={{width: "400px"}}>Total Harga</Typography>
              <Typography variant="subtitle1" sx={{width: "200px"}} align="right">{currency_format(totalPriceW)}</Typography>
            </ListItem>
            <ListItem key="totBV">
              <Typography variant="subtitle1" sx={{width: "400px"}}>Total BV</Typography>
              <Typography variant="subtitle1" sx={{width: "200px"}} align="right">{currency_format(totalBV)}</Typography>
            </ListItem>
          </List>    
        </Paper> 
        <Paper variant="outlined">
          <List component="nav">
            <ListItem key="headMember" divider>
              <Typography variant="h6">
                ID Member & Bonus Period
              </Typography>
            </ListItem>
            <ListItem key="fieldMember1">
              <TextField 
                size="medium"
                name="idmember"
                label="ID Member / Penerima BV"
                sx={{mt: 2}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Klik Untuk cek ID Member" sx={{fontSize: "16px"}} arrow>
                        <Button
                          variant="contained"
                          color="success"
                          sx={{textTransform: 'capitalize', fontSize: '16px'}}
                        >Check</Button>
                      </Tooltip>
                    </InputAdornment>
                  ) 
                }}

                fullWidth
                required
                onChange={handleOnChange}
                value={idmember}
                helperText="Harus diisi.."
              />
            </ListItem>
            <ListItem key="fieldMember2">
              <TextField 
                size="medium"
                name="membername"
                label="Nama Member"
                inputProps={
                  { readOnly: true, }
                }
                fullWidth
                required
                value={membername}
              />  
            </ListItem>
            <ListItem>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Bonus Period</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  margin="normal"
                  size="small"
                >
                  <FormControlLabel value="female" control={<Radio />} label="Juni 2022" />
                  <FormControlLabel value="male" control={<Radio />} label="Juli 2022" />
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem key="fieldMember3">
              <Grid item>
                <Button
                  size="large"
                  variant="contained"
                  fullWidth
                  sx={buttonStyle}
                  onClick={nextStep}
                >
                  Pilih Pengiriman
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="large"
                  variant="contained"
                  fullWidth
                  sx={buttonStyle}
                  onClick={nextStep}
                >
                  Tambah Produk
                </Button>
              </Grid>
            </ListItem>
          </List>      
        </Paper>
        
      </Grid>
    </>
  )
}

/* ListCartListItem.propTypes = {
  step: number,
  setStep: func
}; */

export default ListCartListItem;