/* eslint-disable react/function-component-definition */
import React from 'react';

import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import {
  number, bool,
} from 'prop-types';
import { currencyFormat } from '../../custom/contoh';
import TitleForm from '../layout/titleForm';

const RekapTransaksi = ({
  totalHarga, totalBv, totalItem, totalWeight, header,
}) => {
  const subheadInfo = {
    variant: 'subtitle1',
    sx: {
      width: '400px',
    },
  };

  const subheadValue = {
    variant: 'subtitle1',
    sx: {
      width: '200px',
    },
  };

  return (
    <Paper variant="outlined" sx={{ width: '100%', mb: 2 }}>
      {header === true && (
        <TitleForm title="Rekap Transaksi" />
      )}
      <List component="nav">
        <ListItem key="totHarga" divider>
          <Typography {...subheadInfo}>Total Harga</Typography>
          <Typography {...subheadValue} align="right">
            Rp.
            {currencyFormat(totalHarga)}
          </Typography>
        </ListItem>
        <ListItem key="totBV" divider>
          <Typography {...subheadInfo}>Total BV</Typography>
          <Typography {...subheadValue} align="right">{currencyFormat(totalBv)}</Typography>
        </ListItem>
        <ListItem key="totItem" divider>
          <Typography {...subheadInfo}>Total Item</Typography>
          <Typography {...subheadValue} align="right">{currencyFormat(totalItem)}</Typography>
        </ListItem>
        <ListItem key="totWeight">
          <Typography {...subheadInfo}>Total Weight (Kg)</Typography>
          <Typography {...subheadValue} align="right">{totalWeight}</Typography>
        </ListItem>
      </List>
    </Paper>
  );
};

RekapTransaksi.defaultProps = {
  totalHarga: 0,
  totalBV: 0,
  totalItem: 0,
  totalWeight: 0,
  header: false,
};

RekapTransaksi.propTypes = {
  totalHarga: number,
  totalBV: number,
  totalItem: number,
  totalWeight: number,
  header: bool,
};

export default RekapTransaksi;
