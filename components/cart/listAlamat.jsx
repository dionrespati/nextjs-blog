/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import PilihAlamat from './PilihAlamat';
import PilihWarehouse from './PilihWarehouse';
import PilihStockist from './PilihStockist';
import PilihEkspedisi from './PilihEkspedisi';

const ListAlamat = () => {
  console.log('listAlamat rendered');

  return (
    <Box sx={{ p: 1 }}>
      <Grid item container xs={12} md={12} direction="row" sx={{ padding: 1 }}>
        <PilihAlamat />
        <PilihWarehouse />
        <PilihStockist />
        <PilihEkspedisi />
      </Grid>
    </Box>
  );
};

export default ListAlamat;
