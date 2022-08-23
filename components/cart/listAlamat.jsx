import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
/* import Radio from '@mui/material/Radio'; */
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
/* import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText'; */
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
/* import Autocomplete from '@mui/material/Autocomplete';
import Axios from "axios"; */
import { baseUrlApi, capitalizeFirstLetter, UppercaseFirst } from '../../custom/contoh';
import { useAppContext } from '../../context/app';

import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
/* import HomeIcon from '@mui/icons-material/Home'; */
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';

const ListAlamat = ({listArrAddress}) => {

  const buttonStyle = {textTransform: 'capitalize', fontSize: '15px'};

  const [keySearchAddr, setKeySearchAddr] = useState("");
  const [pilAlamat, setPilAlamat] = useState([]);
  
  let hasilPencarianAlamat = listArrAddress;
  const cariAlamat = (e) => {
    const {value} = e.target;
    setKeySearchAddr(value.toLowerCase());
  }

  hasilPencarianAlamat = listArrAddress.filter(item => item.searchKey.includes(keySearchAddr));

  const handlePilihAlamat = (id_address, jenis_alamat) => {
    setPilAlamat(true);
    console.log({id_address, jenis_alamat});
  };

  const listWarehouse = () => {

  };

  const listStockist = () => {
    
  };
  

  return (
    <Box sx={{p:1}}>
      <Grid item container xs={12} md={12} direction="row" sx={{padding: 1}}>
        <Grid item md={12} xs={12} sx={{padding: 1}}>
          <TextField 
            fullWidth
            name="keySearchAddr"
            value={keySearchAddr}
            label="Pencarian Alamat"
            onChange={cariAlamat}
            sx={{marginBottom: 1}}
          />
          <Button startIcon={<AddIcon />} size="small" color="primary" variant="contained" sx={buttonStyle}>Tambah Alamat Baru</Button>
          
        </Grid>  
        <Grid item md={12} xs={12} sx={{padding: 1}}>
          <Paper variant="outlined" style={{maxHeight: 200, overflow: 'auto'}}>
            <Card>
              {hasilPencarianAlamat && hasilPencarianAlamat.map((dtax) => {
                const {id_address, jenis_alamat, nama_penerima, telp, alamat, provinsi, kabupaten, kecamatan, kelurahan} = dtax;
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
                        <Button startIcon={<CheckIcon />} size="small" color="success" variant="contained" sx={buttonStyle} onClick={() => handlePilihAlamat(id_address, jenis_alamat) }>Pilih Alamat</Button>
                        <Button startIcon={<DeleteIcon />} size="small" color="error" variant="contained" sx={buttonStyle}>Hapus</Button>
                      </Stack>
                    </CardActions>
                    <Divider />
                  </>
                );
              })}
                
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );    
}

export default ListAlamat;