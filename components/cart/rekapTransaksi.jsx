import React from 'react';

import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { currency_format } from '../../custom/contoh';
import TitleForm from '../layout/titleForm';

import {
  number,
} from 'prop-types';

const RekapTransaksi = ({totalHarga,  totalBV}) => {
  return (
    <Paper variant="outlined" sx={{width: '100%', mb: 2}}>
      <TitleForm title="Rekap Transaksi" />
      <List component="nav">
        <ListItem key="totHarga" divider>
          <Typography variant="subtitle1" sx={{width: "400px"}}>Total Harga</Typography>
          <Typography variant="subtitle1" sx={{width: "200px"}} align="right">{currency_format(totalHarga)}</Typography>
        </ListItem>
        <ListItem key="totBV">
          <Typography variant="subtitle1" sx={{width: "400px"}}>Total BV</Typography>
          <Typography variant="subtitle1" sx={{width: "200px"}} align="right">{currency_format(totalBV)}</Typography>
        </ListItem>
      </List>    
    </Paper>
  )
}

/* Step1.propTypes = {
  onSubmitForm: func.isRequired,
  pendaftaran: shape({
    email: string,
    password: string,
    confirmPassword: string,
    availableEmail: bool,
  }).isRequired,
  setPendaftaran: func.isRequired,
  getDataFormStep1: func.isRequired,
}; */

RekapTransaksi.defaultProps = {
  totalHarga: 0,
  totalBV: 0
};

RekapTransaksi.propTypes = {
  totalHarga: number,
  totalBV: number
};

export default RekapTransaksi;