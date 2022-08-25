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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
/* import Autocomplete from '@mui/material/Autocomplete';
import Axios from "axios"; */
import { updateRekapTrans } from '../../custom/contoh';
import { useAppContext } from '../../context/app';

import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
/* import HomeIcon from '@mui/icons-material/Home'; */
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Stack from '@mui/material/Stack';
import getWarehouse from '../../pages/api/servis-kirim/getWarehouse';
import getStockist from '../../pages/api/servis-kirim/getStockist';

const ListAlamat = ({listArrAddress}) => {

  const { cart, setCart, login} = useAppContext();
  const buttonStyle = {textTransform: 'capitalize', fontSize: '15px'};

  const {data: isiDataCart} = cart;

  const { id_address, pricecode, listWH, listStkReff, kodeWH, kodeSTK, infoPenerima:infoPilAlamat, infoWH:infoPilihanWH, kodepos_lat:lat_addr, kodepos_long:long_addr } = cart;

  const [keySearchAddr, setKeySearchAddr] = useState("");
  const [pilAlamat, setPilAlamat] = useState([]);
  const [keySearchWH, setKeySearchWH] = useState("");
  const [keySearchStk, setKeySearchStk] = useState("");
  const listFilteredStokis = [];
  
  let hasilPencarianAlamat = listArrAddress;
  const cariAlamat = (e) => {
    const {value} = e.target;
    setKeySearchAddr(value.toLowerCase());
  }

  let hasilPencarianWH = listWH;
  const cariWH = (e) => {
    const {value} = e.target;
    setKeySearchWH(value.toLowerCase());
  }

  let hasilPencarianStk = listFilteredStokis;

  hasilPencarianAlamat = listArrAddress.filter(item => item.searchKey.includes(keySearchAddr));
  hasilPencarianWH = listWH.filter(item => item.searchKey.includes(keySearchWH));
  hasilPencarianStk = listFilteredStokis.filter(item => item.searchKey.includes(setKeySearchStk));
  

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

      const { errCode:kodeError, data:datax, message:pesanError } = await getWarehouse(paramSend);
      console.log({kodeError, datax, pesanError});
      if(kodeError !== "000") {
        alert(pesanError);
        return;
      }

      setPilAlamat(true);
      const filtered = datax.filter(listwh => listwh.type === "WAREHOUSE");
      const jum = filtered.length;
      setCart({...cart, infoPenerima: nama_penerima, listWH: filtered, id_address: id_address, jenis_alamat: jenis_alamat, kodepos_lat: kodepos_lat, kodepos_long: kodepos_long});
    //} 
  };

  const handlePilihWH = async(objParam, info_wh) => {

    const { officeCode, pricecode } = objParam;

    if(listStkReff.length === 0) {
      
      const paramSend = {
        id_address: id_address,
        kodepos_lat: lat_addr,
        kodepos_long: long_addr
      };

      const { errCode:kodeError, data:datax, message:pesanError } = await getStockist(paramSend);
      console.log({kodeError, datax, pesanError});
      if(kodeError !== "000") {
        alert(pesanError);
        return;
      }
      
      setCart({...cart, listStkReff: datax});
    } else {
      listFilteredStokis = listStkReff.sort((a, b) => a.jarak - b.jarak).filter(e => e.pricecode === pricecode);
      const newArr = updateRekapTrans(isiDataCart, login, pricecode);
      setCart({ ...cart, 
        totalItem: newArr.totalItem, 
        totalHarga: newArr.totalHarga,
        totalBv: newArr.totalBv,
        totalWeight: newArr.totalWeight,
        pricecode: pricecode, 
        kodeWH: officeCode, 
        infoWH: info_wh
      }); 
    }
    /* console.log({listFilteredStokis}); */

  };

  const handlePilihStockist = () => {
    
  };
  

  return (
    <Box sx={{p:1}}>
      <Grid item container xs={12} md={12} direction="row" sx={{padding: 1}}>
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
         {infoPilAlamat !== null && infoPilAlamat !== "" && (
            <Alert severity="success" sx={{height: "33px", padding: 0.5, marginBottom: 1}}>
              <AlertTitle>{infoPilAlamat}</AlertTitle>
            </Alert>
          )}
          <Paper variant="outlined" sx={{maxHeight: 200, overflow: 'auto'}}>
            <Card>
              {hasilPencarianAlamat && hasilPencarianAlamat.map((dtax) => {
                const {id_address:id_address_cart, jenis_alamat, nama_penerima, telp, alamat, provinsi, kabupaten, kecamatan, kelurahan} = dtax;
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
                            {/* <Button startIcon={<ClearIcon />} size="small" color="error" variant="contained" sx={buttonStyle} onClick={() => handlePilihAlamat(id_address, jenis_alamat) }>Batalkan</Button> */}
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
                    <Divider />
                  </>
                );
              })}
                
            </Card>
          </Paper>
        </Grid>
        <Grid item md={12} xs={12} sx={{padding: 1}}>
          <TextField 
            fullWidth
            name="keySearchWh"
            value={keySearchWH}
            label="Filter Pencarian Warehouse"
            onChange={cariWH}
            sx={{marginBottom: 1}}
          />
        </Grid>
        <Grid item md={12} xs={12} sx={{padding: 1}}>
          {infoPilihanWH !== null && infoPilihanWH !== "" && (
            <Alert severity="success" sx={{height: "33px", padding: 0.5, marginBottom: 1}}>
              <AlertTitle>{infoPilihanWH}</AlertTitle>
            </Alert>
          )}
          <Paper variant="outlined" sx={{maxHeight: 200, overflow: 'auto'}}>
            <Card>
            {hasilPencarianWH && hasilPencarianWH.map((whx) => {
              const {officeCode:kode_wh, warehouse:nama_wh, jarak, telp:telp_wh, alamat:alamat_wh, provinsi:prov_wh, kabupaten:kab_wh, kecamatan:kec_wh, kelurahan:kel_wh} = whx;
              const nilaiMarginAlamat = alamat_wh.length > 40 ? 2 : 0;
              const areaWH = `${prov_wh} - ${kab_wh} - ${kec_wh} - ${kel_wh}`;
              const upperCaseAreaWH = areaWH.toUpperCase();
              const info_wh = kode_wh + " - " + nama_wh;

              return (
                <>
                  <CardContent>
                    <Grid item container xs={12} md={12} direction="row" sx={{padding: 0, marginBottom: 0}}>
                      <Grid item md={1} xs={1} sx={{padding: 0, height: "30px"}}>
                        <PersonIcon />
                      </Grid>
                      <Grid item md={11} xs={11} sx={{padding: 0, height: "30px"}}>
                        <Typography variant="subtitle2">{`${info_wh.toUpperCase()}`}</Typography>
                      </Grid>  
                    </Grid>
                    <Grid item container xs={12} md={12} direction="row" sx={{padding: 0, marginBottom: 0}}>
                      <Grid item md={1} xs={1} sx={{padding: 0, height: "30px"}}>
                        <LocalShippingIcon />
                      </Grid>
                      <Grid item md={11} xs={11} sx={{padding: 0, height: "30px"}}>
                        <Typography variant="subtitle2">{`${jarak} Km`}</Typography>
                      </Grid>  
                    </Grid>
                    <Grid item container xs={12} md={12} direction="row" sx={{padding: 0}}>
                      <Grid item md={1} xs={1} sx={{padding: 0, height: "30px"}}>
                        <PhoneIcon />
                      </Grid>
                      <Grid item md={11} xs={11} sx={{padding: 0, height: "30px"}}>
                      <Typography variant="subtitle2">{`${telp_wh}`}</Typography>
                      </Grid>  
                    </Grid>
                    
                    <Grid item container xs={12} md={12} direction="row" sx={{padding: 0}}>
                      <Grid item md={1} xs={1} sx={{padding: 0, height: "30px"}}>
                        <LocationSearchingOutlinedIcon />
                      </Grid>
                      <Grid item md={11} xs={11} sx={{padding: 0, height: "30px"}}>
                      <Typography variant="subtitle2">{upperCaseAreaWH}</Typography>
                      </Grid>  
                    </Grid>
                    
                  </CardContent>
                  <CardActions>
                    <Stack direction="row" spacing={1}>
                      {kodeWH === kode_wh && (
                        <>
                          <Alert severity="success" sx={{height: "33px", padding: 0.5}}>
                            <AlertTitle>Warehouse sudah dipilih&nbsp;&nbsp;&nbsp;</AlertTitle>
                          </Alert>
                        </>
                      )}

                      {kodeWH !== kode_wh && (
                        <>
                          <Button startIcon={<CheckIcon />} size="small" color="success" variant="contained" sx={buttonStyle} onClick={() => handlePilihWH(whx, info_wh) }>Pilih Warehouse</Button>
                        </>
                      )}   
                    </Stack>
                  </CardActions>
                  <Divider />
                </>
              );
            })} 
            </Card>
          </Paper>
        </Grid>
        <Grid item md={12} xs={12} sx={{padding: 1}}>
          {infoPilihanWH !== null && infoPilihanWH !== "" && (
            <Alert severity="success" sx={{height: "33px", padding: 0.5, marginBottom: 1}}>
              <AlertTitle>{infoPilihanWH}</AlertTitle>
            </Alert>
          )}
          <Paper variant="outlined" sx={{maxHeight: 200, overflow: 'auto'}}>
            <Card>
            {hasilPencarianStk && hasilPencarianStk.map((whx) => {
              const {officeCode:kode_stk, warehouse:nama_stk, jarak, telp:telp_stk, alamat:alamat_stk, provinsi:prov_wh, kabupaten:kab_wh, kecamatan:kec_wh, kelurahan:kel_wh} = whx;
              const nilaiMarginAlamatStk = alamat_stk.length > 40 ? 2 : 0;
              //const areaWH = `${prov_wh} - ${kab_wh} - ${kec_wh} - ${kel_wh}`;
              const upperCaseAreaWH = areaWH.toUpperCase();
              const info_stk = kode_stk + " - " + nama_stk;

              return (
                <>
                  <CardContent>
                    <Grid item container xs={12} md={12} direction="row" sx={{padding: 0, marginBottom: 0}}>
                      <Grid item md={1} xs={1} sx={{padding: 0, height: "30px"}}>
                        <PersonIcon />
                      </Grid>
                      <Grid item md={11} xs={11} sx={{padding: 0, height: "30px"}}>
                        <Typography variant="subtitle2">{`${info_stk.toUpperCase()}`}</Typography>
                      </Grid>  
                    </Grid>
                    <Grid item container xs={12} md={12} direction="row" sx={{padding: 0, marginBottom: 0}}>
                      <Grid item md={1} xs={1} sx={{padding: 0, height: "30px"}}>
                        <LocalShippingIcon />
                      </Grid>
                      <Grid item md={11} xs={11} sx={{padding: 0, height: "30px"}}>
                        <Typography variant="subtitle2">{`${jarak} Km`}</Typography>
                      </Grid>  
                    </Grid>
                    <Grid item container xs={12} md={12} direction="row" sx={{padding: 0}}>
                      <Grid item md={1} xs={1} sx={{padding: 0, height: "30px"}}>
                        <PhoneIcon />
                      </Grid>
                      <Grid item md={11} xs={11} sx={{padding: 0, height: "30px"}}>
                      <Typography variant="subtitle2">{`${telp_stk}`}</Typography>
                      </Grid>  
                    </Grid>
                    
                  </CardContent>
                  <CardActions>
                    <Stack direction="row" spacing={1}>
                      {kodeSTK === kode_stk && (
                        <>
                          <Alert severity="success" sx={{height: "33px", padding: 0.5}}>
                            <AlertTitle>Warehouse sudah dipilih&nbsp;&nbsp;&nbsp;</AlertTitle>
                          </Alert>
                        </>
                      )}

                      {kodeSTK !== kode_stk && (
                        <>
                          <Button startIcon={<CheckIcon />} size="small" color="success" variant="contained" sx={buttonStyle} onClick={() => handlePilihWH(whx, info_wh) }>Pilih Warehouse</Button>
                        </>
                      )}   
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