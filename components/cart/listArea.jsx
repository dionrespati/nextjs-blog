import React, {useState} from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Axios from "axios";
import { baseUrlApi } from '../../custom/contoh';
import getDistrictLatLong from '../../pages/api/servis-kirim/getDistrictLatLong';
import getDistrictStk from '../../pages/api/servis-kirim/getDistrictStk';
import { useAppContext } from '../../context/app';


const ListArea = () => {

  const {cart, setCart} = useAppContext();
  const { areaStk, namaStk, pilStk, listStockist } = cart;
  const [listArea, setListArea] = useState([]);
  /* const [listStockist, setListStockist] = useState([]); */

  console.log({listStockist});

  const setArea = async(nilai) => {
    if(nilai === null || nilai === "" || nilai === undefined) {
      return;
    } 
    
    const newAreaStk = {
      ...cart, areaStk: nilai,
    };
    setCart(newAreaStk);
      
    const { errCode, data, message } = await getDistrictLatLong(nilai);
    if(errCode !== "000") {
      alert(message);
      return;
    }  

    const { errCode:kodeError, data:datax, message:pesanError } = await getDistrictStk(data);
    console.log({kodeError, datax, pesanError});
    if(kodeError !== "000") {
      alert(pesanError);
      return;
    }

    let isiStokis = [];
    for(let i = 0; i <= 9; i++) {
      const kodeStk = datax[i].officeCode;
      const namaStk = datax[i].warehouse;
      const pricecodeStk = datax[i].pricecode;
      //const inputan = kodeStk +"|"+ namaStk + "|" + pricecodeStk;
      const idValue = kodeStk + "|" + pricecodeStk;
      const textValue = kodeStk +" - "+ namaStk;
      const newArrListStk = {
        label: textValue,
        id: idValue
      }

      isiStokis.push(newArrListStk);
    }

    /* setListStockist(isiStokis); */
    setCart(
      {
        ...cart,
        listStockist: isiStokis
      }
    );
    console.log({cart});
    
      
  }

  const searchArea = (e) => {
    const { value } = e.target;
    //console.log({name, value});
    if(value.length >= 4) {
      //console.log(`${baseUrlApi}/getdistrict?query=${value}`);
       Axios.get(`${baseUrlApi}/getdistrict?query=${value}`)
      .then(res => {
        const {status, data} = res;
        if(status === 200) {
          const {suggestions} = data;
          let arrArea = [];
          suggestions.map(resx => {
            const { value } = resx;
            arrArea.push(value);
          });

          setListArea(arrArea);
        }
      }); 
    }
  }

  const setStockist = (nilai) => {
    if(nilai === null || nilai === "" || nilai === undefined) {
      return;
    }
    
    const {id, label} = nilai;
    const arrStk = id.split("|");

    const newAreaStk = {
      ...cart, idstk: arrStk[0], pricecode: arrStk[1], pilStk:id, namaStk: label
    };
    setCart(newAreaStk);
  }

  return (
    <Box sx={{p:1}}>
      <Grid item container xs={12} md={12} direction="row" sx={{padding: 1}}>
        <Grid item md={12} xs={12} sx={{padding: 1}}>
          <Autocomplete
            name="stkarea"
            options={listArea}
            defaultValue={areaStk}
            renderInput={(params) => (
              <TextField 
              {...params} 
              label="Tulis Nama Kota/Kecamatan" 
              onChange={(e) => searchArea(e)}
              />
            )}
            onChange={(event, value) => setArea(value)}
            fullWidth
          />
        </Grid>
        <Grid item md={12} xs={12} sx={{padding: 1}}>
          <Autocomplete
            name="stockist"
            options={listStockist}
            defaultValue={pilStk}
            getOptionLabel={option => option.label}
            renderInput={(params) => (
              <TextField 
              {...params} 
              label="Pilihan Stockist" 
              /* onChange={(e) => searchArea(e)} */
              />
            )}
            onChange={(event, value) => setStockist(value)}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ListArea;