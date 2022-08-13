import React from 'react';
import {
  number, shape, string,
} from 'prop-types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { currency_format } from '../../custom/contoh';

const PreviewCartTable = ({isiCart, pricecode, login}) => {
  let totalQty = 0;
  let totalPrice = 0;
  let totalBv = 0;
  let subTotalBv = 0;
  let subTotalPrice = 0;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 700, maxWidth: "100%" }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell sx={{width: 300}}>Nama Produk</TableCell>
            <TableCell align="right">Qty.</TableCell>
          </TableRow>
        </TableHead> 
        <TableBody>

          {isiCart && isiCart.map((item) => {
              const {prdcd, prdnm, qty, price_w, price_e, price_cw, price_ce, bv, } = item;
              totalQty += qty;
              totalBv += qty * bv;
              subTotalBv = qty * bv;
              
              if(login !== null && pricecode == "12W4") {
                totalPrice += qty * price_w;
                subTotalPrice = qty * price_w;
              }

              if(login !== null && pricecode == "12E4") {
                totalPrice += qty * price_e;
                subTotalPrice = qty * price_e;
              }

              if(login === null && pricecode == "12W4") {
                totalPrice += qty * price_cw;
                subTotalPrice = qty * price_cw;
              }

              if(login === null && pricecode == "12E4") {
                totalPrice += qty * price_ce;
                subTotalPrice = qty * price_ce;
              }

              return (
                <TableRow key={prdcd}>
                  <TableCell>{prdnm}</TableCell>
                  <TableCell align="right">{currency_format(qty)}</TableCell>
                </TableRow>
              );
          })}
          <TableRow key="totalQty">
            <TableCell>Total Qty</TableCell>
            <TableCell align="right">{currency_format(totalQty)}</TableCell>
          </TableRow>
          <TableRow key="totalBv">
            <TableCell>Total BV</TableCell>
            <TableCell align="right">{currency_format(totalBv)}</TableCell>
          </TableRow>  
          <TableRow key="totalPrice">
            <TableCell>Total Harga</TableCell>
            <TableCell align="right">Rp. {currency_format(totalPrice)}</TableCell>
          </TableRow>
        </TableBody>  
      </Table>
    </TableContainer>  
  );
}

PreviewCartTables.defaultProps = {
  login: null
};

PreviewCartTable.propTypes = {
  isiCart: shape({
    prdcd: string.isRequired, 
    prdnm: string.isRequired, 
    qty: number.isRequired, 
    price_w: number.isRequired, 
    price_e: number.isRequired, 
    price_cw: number.isRequired,
    price_ce: number.isRequired,
    bv: number.isRequired, 
    img_url: string.isRequired,
    weight: number.isRequired
  }).isRequired,

  pricecode: string, 
  
  login: shape({
    userlogin: string,
    loginname: string
  }) 
};

export default PreviewCartTable;