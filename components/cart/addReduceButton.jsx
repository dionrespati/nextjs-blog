import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppContext } from '../../context/app';

import {
  number
} from 'prop-types';

const AddReduceButton = ({item, qty}) => {

  const { cart, setCart} = useAppContext();
  const { data:isiCart } = cart;

  const updateQty = (e, item) => {
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
    /* console.log({newCart}) */
    setCart({ ...cart, data: newCart });
    alert(`Produk ${prdnm} sudah hapus..`);
  }

  return (
    <>
      <ButtonGroup disableElevation size="small" color="success" variant="outlined">
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
            <DeleteIcon color="error" />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </>
  )
}

AddReduceButton.propTypes = {
  qty: number
};

export default AddReduceButton;