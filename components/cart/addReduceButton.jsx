/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable react/function-component-definition */

import React from 'react';
import {
  shape, string, number,
} from 'prop-types';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateRekapTrans } from '../../custom/contoh';
import { useAppContext } from '../../context/app';

const AddReduceButton = ({ item, qty }) => {
  console.log('komponen AddReduceButton rendered');
  const { cart, setCart, login } = useAppContext();
  const { data: isiCart, priceCode } = cart;

  const updateCartQty = (itemPrd, value) => {
    if (value === 0) {
      alert('Minimal Qty adalah 1..');
    } else {
      let i = 0;
      const isiDataCart = isiCart;
      isiDataCart.forEach((datax) => {
        if (datax.prdcd === itemPrd.prdcd) {
          isiDataCart[i].qty = parseInt(value);
        }
        i++;
      });

      const newArr = updateRekapTrans(isiDataCart, login, priceCode);
      const newArrCart = {
        ...cart,
        data: isiDataCart,
        totalItem: newArr.totalItem,
        totalHarga: newArr.totalHarga,
        totalBv: newArr.totalBv,
        totalWeight: newArr.totalWeight,
      };
      setCart(newArrCart);
    }
  };

  const updateQty = (e, itemPrd) => {
    const { value } = e.target;
    updateCartQty(itemPrd, value);
  };

  const deleteItemCart = (itemPrd) => {
    const { prdnm } = itemPrd;
    // alert(`Produk ${prdnm} akan dihapus..`);
    const newCart = isiCart.filter((el) => el.prdcd !== itemPrd.prdcd);
    /* console.log({newCart}) */
    const newArr = updateRekapTrans(newCart, login, priceCode);
    setCart({
      ...cart,
      data: newCart,
      totalItem: newArr.totalItem,
      totalHarga: newArr.totalHarga,
      totalBv: newArr.totalBv,
      totalWeight: newArr.totalWeight,
    });
    alert(`Produk ${prdnm} sudah hapus..`);
  };

  return (
    <ButtonGroup disableElevation size="small" color="success" variant="outlined">
      <Button onClick={() => updateCartQty(item, qty - 1)}>
        <RemoveIcon sx={{ color: 'red' }} />
      </Button>
      <input type="text" name="changeQty" value={qty} onChange={(event) => updateQty(event, item)} size="4" style={{ textAlign: 'center' }} />
      <Button onClick={() => updateCartQty(item, qty + 1)}>
        <AddIcon sx={{ color: 'green' }} />
      </Button>
      <Tooltip title="Lihat Detail" arrow>
        <Button>
          <SearchIcon sx={{ color: 'lightblue' }} />
        </Button>
      </Tooltip>
      <Tooltip title="Hapus dari keranjang" arrow>
        <Button onClick={() => deleteItemCart(item)}>
          <DeleteIcon color="error" />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
};

AddReduceButton.propTypes = {
  item: {
    prdcd: '',
    prdnm: '',
    qty: 0,
    priceWestDist: 0,
    priceEastDist: 0,
    priceWestCust: 0,
    priceEastCust: 0,
    bv: 0,
    imageUrl: '',
    weight: 0.0,
  },
  qty: 0,
};

AddReduceButton.propTypes = {
  item: shape({
    prdcd: string.isRequired,
    prdnm: string.isRequired,
    qty: number.isRequired,
    priceWestDist: number.isRequired,
    priceEastDist: number.isRequired,
    priceWestCust: number.isRequired,
    priceEastCust: number.isRequired,
    bv: number.isRequired,
    imageUrl: string.isRequired,
    weight: number.isRequired,
  }).isRequired,
  qty: number.isRequired,
};

export default AddReduceButton;
