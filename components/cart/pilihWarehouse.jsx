import React, {useState} from 'react';
import { useAppContext } from '../../context/app';
import { updateRekapTrans } from '../../custom/contoh';

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
import Divider from '@mui/material/Divider';

import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import CheckIcon from '@mui/icons-material/Check';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import getStockist from '../../pages/api/servis-kirim/getStockist';

const PilihWarehouse = () => {
  const { cart, setCart, login} = useAppContext();
  const { 
    data: isiDataCart, id_address, listWH, kodeWH, pricecode:kodeHargaWil, kodepos_lat:lat_addr, listStkReff, kodepos_long:long_addr, infoWH:infoPilihanWH
  } = cart;  

  console.log(`component PilihWarehouse rendered`);

  const buttonStyle = {textTransform: 'capitalize', fontSize: '15px'};

  const [keySearchWH, setKeySearchWH] = useState("");

  let hasilPencarianWH = listWH;
  
  const cariWH = (e) => {
    const {value} = e.target;
    setKeySearchWH(value.toLowerCase());
  }

  hasilPencarianWH = listWH.filter(item => item.searchKey.includes(keySearchWH));

  const handlePilihWH = async(objParam, info_wh) => {

    const { officeCode, pricecode } = objParam;

    if(listStkReff.length === 0) {
      
      const paramSend = {
        id_address: id_address,
        kodepos_lat: lat_addr,
        kodepos_long: long_addr
      };

      console.log(`function getStockist invoked`);

      const { errCode:kodeError, data:datax, message:pesanError } = await getStockist(paramSend);
      console.log({kodeError, datax, pesanError});
      if(kodeError !== "000") {
        alert(pesanError);
        return;
      }
      
      setCart({...cart, listStkReff: datax});
    } else {
      let listFilteredStokis = listStkReff.sort((a, b) => a.jarak - b.jarak).filter(e => e.pricecode === pricecode);
      let tempListFilteredStokis = listFilteredStokis;
      //console.log({listFilteredStokis, hasilPencarianStk});
      const checkStk = listFilteredStokis.filter(e => e.officeCode === officeCode); 
      let tempStk = "";
      let tempStkInfo = "";
      if(checkStk.length > 0) {
        listFilteredStokis = checkStk;
        tempStk = checkStk[0].officeCode;
        tempStkInfo = checkStk[0].officeCode + " - " + checkStk[0].warehouse;
      } 

      const newArr = updateRekapTrans(isiDataCart, login, pricecode);
      //setFilteredStk(listFilteredStokis);
      if(kodeHargaWil !== pricecode) {
        setCart({ ...cart, 
          totalItem: newArr.totalItem, 
          totalHarga: newArr.totalHarga,
          totalBv: newArr.totalBv,
          totalWeight: newArr.totalWeight,
          pricecode: pricecode, 
          kodeWH: officeCode, 
          infoWH: info_wh,
          kodeSTK: tempStk,
          infoStk: tempStkInfo,
          filteredStk: tempListFilteredStokis
        }); 
      } else {
        setCart({ ...cart, 
          totalItem: newArr.totalItem, 
          totalHarga: newArr.totalHarga,
          totalBv: newArr.totalBv,
          totalWeight: newArr.totalWeight,
          pricecode: pricecode, 
          kodeWH: officeCode, 
          infoWH: info_wh,
          kodeSTK: tempStk,
          infoStk: tempStkInfo,
          filteredStk: tempListFilteredStokis
        });
      }
      
    }
    
  };

  return (
    <>
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
        {infoPilihanWH && (
          <Alert severity="success" sx={{height: "33px", padding: 0.5, marginBottom: 1}}>
            <AlertTitle>{infoPilihanWH}</AlertTitle>
          </Alert>
        )}
        <Paper variant="outlined" sx={{maxHeight: 200, overflow: 'auto'}}>
          <Card>
          {hasilPencarianWH && hasilPencarianWH.map((whx) => {
            const {officeCode:kode_wh, warehouse:nama_wh, jarak, telp:telp_wh, alamat:alamat_wh, provinsi:prov_wh, kabupaten:kab_wh, kecamatan:kec_wh, kelurahan:kel_wh} = whx;
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
    </> 
  )
}

export default PilihWarehouse;