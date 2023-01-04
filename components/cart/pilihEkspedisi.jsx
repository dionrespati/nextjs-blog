/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { useAppContext } from '../../context/app';

const PilihEkspedisi = () => {
  const { cart, setCart } = useAppContext();
  const { isCod, listKurir } = cart;

  if (listKurir.length > 0) {
    const { listNonCod, listCod } = listKurir;
  }

  console.log('component PilihEkspedisi rendered');
  console.log({ isCod, listKurir });

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
    <>
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
      <Grid item md={12} xs={12} sx={{ padding: 1 }}>
        <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto' }}>
          <Card />
        </Paper>
      </Grid>
    </>
  );
};

export default PilihEkspedisi;
