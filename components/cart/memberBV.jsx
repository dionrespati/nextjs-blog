import React,  {useEffect, useState} from 'react';

import Tooltip from '@mui/material/Tooltip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TitleForm from '../layout/titleForm';

import { useAppContext } from '../../context/app';
import Axios from "axios";
import { baseUrlApi, dateFormatName } from '../../custom/contoh';
import getListBonusPeriod from '../../pages/api/bonusperiod';

const MemberBV = ({nextStep}) => {

  const { cart, setCart, login } = useAppContext();
  const { idmember, membername, bnsperiod, } = cart;
  
  const [listBonusPeriod, setListBonusPeriod] = useState([]);

  const buttonStyle = {textTransform: 'capitalize', fontSize: '18px'};

  useEffect(() => {
      console.log(`isi useEffect listbns ${bnsperiod}`);
      let arrBns = [];
      const getBns = async () => {
        const { errCode, data, message} = await getListBonusPeriod();
        console.log({ errCode, data, message});
        if(errCode === "000") {
          const { bnsperiod_prev, bnsperiod_now, date_only_now, endofdatebnsperiod} = data[0];
          let endOfDate = parseInt(endofdatebnsperiod);
          
          if(date_only_now > endOfDate) {
            //console.log({bnsperiod_now})
            arrBns[0] = {value : bnsperiod_now, text : dateFormatName(bnsperiod_now)};
          } else {
            //console.log({bnsperiod_prev, bnsperiod_now})
            arrBns[0] = {value : bnsperiod_prev, text : dateFormatName(bnsperiod_prev)};
            arrBns[1] = {value : bnsperiod_now, text : dateFormatName(bnsperiod_now)};
          }
          setListBonusPeriod(arrBns);
        }  
      }  
      
      getBns();
      /* const newCart = {
        ...cart,
        bnsperiod: arrBns
      }
      setCart(newCart); */
  },[]);

  const handleOnChange = (e) => {
    const nilai = e.target.value.toUpperCase();
    setCart({ ...cart, [e.target.name]: nilai, });
  };

  const findNamaMember = () => {
    const nilai = idmember.toUpperCase();
    //console.log({nilai});
    Axios.get(`${baseUrlApi}/api/v2/getMemberById/${nilai}`)
      .then(res => {
        const {data, status} = res;
        if(status === 200) {
          const {response, arrayData} = data;
          if(response === "true") {
            const { fullnm } = arrayData[0];
            const newData = {
              ...cart,
              idmember: nilai,
              membername: fullnm
            }
            setCart(newData);

          } else {

          }
        }  
      }) 
  }

  return (
    <Paper variant="outlined">
      <TitleForm title="Penerima BV" />
      <List component="nav">
        <ListItem key="fieldMember1">
          <TextField 
            size="medium"
            name="idmember"
            label="ID Member / Penerima BV"
            sx={{mt: 2}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Klik Untuk cek ID Member" sx={{fontSize: "16px"}} arrow>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{textTransform: 'capitalize', fontSize: '16px'}}
                      onClick={findNamaMember}
                    >Check</Button>
                  </Tooltip>
                </InputAdornment>
              ) 
            }}

            fullWidth
            required
            onChange={handleOnChange}
            value={idmember === "" && login !== null ? login.userlogin : idmember}
            helperText=""
          />
        </ListItem>
        <ListItem key="fieldMember2">
          <TextField 
            size="medium"
            name="membername"
            label="Nama Member"
            inputProps={
              { readOnly: true, }
            }
            fullWidth
            required
            value={membername === "" && login !== null ? login.loginname : membername}
          />  
        </ListItem>
        <ListItem key="fieldMember3">
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Bonus Period</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="bnsperiod"
              margin="normal"
              size="small"
              onChange={handleOnChange}
            >
              {listBonusPeriod && listBonusPeriod.map((item) => {
                const {value, text} = item;
                return ( 
                  <>
                    <FormControlLabel value={value} control={<Radio />} label={text} checked={value === bnsperiod ? true : false} />
                  </>
                );      
              })}
            </RadioGroup>
          </FormControl>
        </ListItem>
        <ListItem key="fieldMember4">  
          <Button
            size="large"
            variant="contained"
            fullWidth
            sx={buttonStyle}
            onClick={nextStep}
          >
            Pilih Pengiriman
          </Button>
        </ListItem>
      </List>      
    </Paper>
  )
}

export default MemberBV;