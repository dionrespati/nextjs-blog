import React, {useState, useEffect} from 'react';
import { useAppContext } from '../../context/app';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

import getWarehouse from '../../pages/api/servis-kirim/getWarehouse';
import getListAddress from '../../pages/api/member/listAddress';
import { lightGreen } from '@mui/material/colors';


const PilihAlamat = () => {
  const { cart, setCart, login} = useAppContext();
  const { id_address, infoPilAlamat, listWH, listAddrMemb} = cart; 
  
  console.log(`component PilihAlamat rendered`);

  const getSavedAddrMemb = async () => {
    console.log(`function getSavedAddrMemb invoked`);
    const {userlogin} = login;
    const { errCode, data, message} = await getListAddress(userlogin);
    console.log({ errCode, data, message});
    if(errCode === "000") {
      /* console.log({data}); */
      setCart({
        ...cart, listAddrMemb: data
      })
    } 
  }

  useEffect(() => {
    if(listAddrMemb.length === 0) {
      getSavedAddrMemb();
    }
  },[]);
  
  const buttonStyle = {textTransform: 'capitalize', fontSize: '15px'};

  const [pilAlamat, setPilAlamat] = useState([]);
  const [keySearchAddr, setKeySearchAddr] = useState("");

  let hasilPencarianAlamat = listAddrMemb;
  hasilPencarianAlamat = listAddrMemb.filter(item => item.searchKey.includes(keySearchAddr));

  const cariAlamat = (e) => {
    const {value} = e.target;
    setKeySearchAddr(value.toLowerCase());
  }
  
  let filtered = [];
  const handlePilihAlamat = async (objParam) => {
    const { id_address, jenis_alamat, nama_penerima, kodepos_lat, kodepos_long } = objParam;
    
    //if(listWH.length === 0) {
      const paramSend = {
        id_address: id_address,
        id_member: login.userlogin,
        jenis_alamat: jenis_alamat,
        ispromo: 0,
        kodepos_lat: kodepos_lat,
        kodepos_long: kodepos_long,
      };

      console.log(`function getWarehouse invoked`);

      const { errCode:kodeError, data:datax, message:pesanError } = await getWarehouse(paramSend);
      if(kodeError !== "000") {
        alert(pesanError);
        return;
      }

      setPilAlamat(true);
      const filtered = datax.sort((a, b) => a.jarak - b.jarak).filter(listwh => listwh.type === "WAREHOUSE");
      console.log({filtered});
      const jum = filtered.length;
      setCart({
        ...cart, 
        infoPenerima: nama_penerima, 
        listWH: filtered, 
        id_address: id_address,
        jenis_alamat: jenis_alamat, 
        kodepos_lat: kodepos_lat, 
        kodepos_long: kodepos_long,
        infoPilAlamat: nama_penerima.toUpperCase()
       });
    /* } else {
      const newListWh = listWH.sort((a, b) => a.jarak - b.jarak).filter(listwh => listwh.type === "WAREHOUSE");
      setCart({
        ...cart, 
        infoPenerima: nama_penerima, 
        id_address: id_address,
        jenis_alamat: jenis_alamat, 
        kodepos_lat: kodepos_lat, 
        kodepos_long: kodepos_long,
        infoPilAlamat: nama_penerima.toUpperCase(),
        listWH: newListWh
       }); 
    } */

    
  };

  return (
    <>
      <Grid item md={12} xs={12} sx={{padding: 1}}>
        <TextField 
          fullWidth
          name="keySearchAddr"
          value={keySearchAddr}
          label="Filter Pencarian Alamat"
          onChange={cariAlamat}
          sx={{marginBottom: 1}}
        />
        <Button startIcon={<AddIcon />} size="small" color="primary" variant="contained" sx={buttonStyle}>Tambah Alamat Baru</Button>
      </Grid>
      <Grid item md={12} xs={12} sx={{padding: 1}}>
        {infoPilAlamat && (
          <Alert severity="success" sx={{height: "33px", padding: 0.5, marginBottom: 1}}>
            <AlertTitle>{infoPilAlamat}</AlertTitle>
          </Alert>
        )}
        <Paper variant="outlined" sx={{maxHeight: 200, overflow: 'auto'}}>
          <Card>
            {hasilPencarianAlamat && hasilPencarianAlamat.map((dtax) => {
              const {id_address:id_address_cart, nama_penerima, telp, alamat, provinsi, kabupaten, kecamatan, kelurahan} = dtax;
              const nilaiMarginAlamat = alamat.length > 40 ? 2 : 0;
              const areax = `${provinsi} - ${kabupaten} - ${kecamatan} - ${kelurahan}`;
              const upperCaseArea = areax.toUpperCase();
              
              return (
                <>
                  <CardContent>
                    <Grid item container xs={12} md={12} direction="row" sx={{padding: 0, marginBottom: 0}}>
                      <Grid item md={1} xs={1} sx={{padding: 0, height: "30px"}}>
                        <PersonIcon />
                      </Grid>
                      <Grid item md={11} xs={11} sx={{padding: 0, height: "30px"}}>
                        <Typography variant="subtitle2">{`${nama_penerima.toUpperCase()}`}</Typography>
                      </Grid>  
                    </Grid>
                    <Grid item container xs={12} md={12} direction="row" sx={{padding: 0}}>
                      <Grid item md={1} xs={1} sx={{padding: 0, height: "30px"}}>
                        <PhoneIcon />
                      </Grid>
                      <Grid item md={11} xs={11} sx={{padding: 0, height: "30px"}}>
                      <Typography variant="subtitle2">{`${telp}`}</Typography>
                      </Grid>  
                    </Grid>
                    <Grid item container xs={12} md={12} direction="row" sx={{padding: 0, marginBottom: nilaiMarginAlamat}}>
                      <Grid item md={1} xs={1} sx={{padding: 0, height: "30px"}}>
                        <MapsHomeWorkOutlinedIcon />
                      </Grid>
                      <Grid item md={11} xs={11} sx={{padding: 0, height: "30px"}}>
                      <Typography variant="subtitle2">{alamat.toUpperCase()}</Typography>
                      </Grid>  
                    </Grid>
                    <Grid item container xs={12} md={12} direction="row" sx={{padding: 0}}>
                      <Grid item md={1} xs={1} sx={{padding: 0, height: "30px"}}>
                        <LocationSearchingOutlinedIcon />
                      </Grid>
                      <Grid item md={11} xs={11} sx={{padding: 0, height: "30px"}}>
                      <Typography variant="subtitle2">{upperCaseArea}</Typography>
                      </Grid>  
                    </Grid>
                    <Grid item container xs={12} md={12} direction="row" sx={{padding: 0}}>
                      
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Stack direction="row" spacing={1}>
                      {id_address === id_address_cart && (
                        <>
                          <Alert severity="success" sx={{height: "33px", padding: 0.5}}>
                            <AlertTitle>Alamat sudah dipilih&nbsp;&nbsp;&nbsp;</AlertTitle>
                          </Alert>
                        </>
                      )}

                      {id_address !== id_address_cart && (
                        <>
                          <Button startIcon={<CheckIcon />} size="small" color="success" variant="contained" sx={buttonStyle} onClick={() => handlePilihAlamat(dtax) }>Pilih Alamat</Button>
                          <Button startIcon={<DeleteIcon />} size="small" color="error" variant="contained" sx={buttonStyle}>Hapus</Button>
                        </>
                      )}   
                    </Stack>
                  </CardActions>
                </>
              );
            })}
              
          </Card>
        </Paper>
      </Grid>
    </>  
  )
}

export default PilihAlamat;