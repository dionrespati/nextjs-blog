import { useState } from 'react'

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

const DeliveryOption = () => {
  const { cart, setCart} = useAppContext();
  const [sentTo, setSentTo] = useState(true);

  const pilihPengiriman = () => {
    setSentTo(!sentTo);
  }

  return (
    <>
      <Grid item md={6} xs={12} sx={{p: 1}}>
        <Paper variant='outlined'>
          <List component="nav">
            <ListItem key="pilKirim1" divider>
              <Typography variant="h6">
                Pengiriman
              </Typography>
            </ListItem>
            <ListItem key="pilKirim2">
              <FormControl component="fieldset" variant="standard">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch checked={!sentTo} onChange={pilihPengiriman} name="sentTo" />
                    }
                    label={sentTo ? "Diambil di Stockist" : "Dikirim ke Alamat"}
                  />
                </FormGroup>
              </FormControl>

              {/* <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Pilih Pengiriman</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  row
                >
                  <FormControlLabel value="Stockist" control={<Radio />} label="Stockist" />
                  <FormControlLabel value="Alamat" control={<Radio />} label="Alamat" />
                </RadioGroup>
              </FormControl>*/}
            </ListItem> 
            {sentTo &&  (
              <ListArea />
            )}

            {!sentTo &&  (
              <div>Div dikirim ke alamat</div>
            )}
          </List> 
        </Paper>   
      </Grid>
      <Grid item md={6} xs={12} sx={{p: 1}}>
        <Paper variant='outlined'>
          <List component="nav">
            <ListItem key="head1" divider>
              <Typography variant="h6">
                List Produk
              </Typography>
            </ListItem>
          </List> 
        </Paper>
      </Grid>
    </>
  )
}

export default DeliveryOption;