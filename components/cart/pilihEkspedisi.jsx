import React, { useState } from 'react';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';

import Grid from '@mui/material/Grid';
import { useAppContext } from '../../context/app';

function PilihEkspedisi() {
  const { cart, setCart } = useAppContext();
  const { isCod } = cart;

  console.log('component PilihEkspedisi rendered');

  const [pilCod, setPilCod] = useState(false);

  const pilihCodNonCod = () => {
    setPilCod(!pilCod);
    const nilai = pilCod ? '1' : '0';
    const sentToArr = {
      ...cart, isCod: nilai,
    };
    setCart(sentToArr);
  };

  return (
    <Grid item md={12} xs={12} sx={{ padding: 1 }}>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Pilih COD / Non Cod</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={isCod === '1'} onChange={pilihCodNonCod} name="sentTo" />
              }
            label={isCod === '0' ? 'Non COD' : 'COD'}
          />
        </FormGroup>
      </FormControl>
    </Grid>
  );
}

export default PilihEkspedisi;
