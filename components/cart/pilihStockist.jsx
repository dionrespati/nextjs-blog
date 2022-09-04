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
import CheckIcon from '@mui/icons-material/Check';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';

import getPriceListOngkir from '../../pages/api/servis-kirim/getPriceList';

const PilihStockist = () => {
  const { cart, setCart, login} = useAppContext();

  const { 
    jenis_alamat,kodeWH, kodeSTK, infoStk:infoPilihanStk, filteredStk, totalWeight, totalHarga 
  } = cart; 

  console.log(`component PilihStockist rendered`);

  const buttonStyle = {textTransform: 'capitalize', fontSize: '15px'}; 

  const [keySearchStk, setKeySearchStk] = useState("");

  const cariStk = (e) => {
    const {value} = e.target;
    setKeySearchStk(value.toLowerCase());
  }

  let hasilPencarianStk = filteredStk;

  hasilPencarianStk = filteredStk.filter(item => item.searchKey.includes(keySearchStk));

  const handlePilihStockist = async (objParam, info_stk) => {
    const { officeCode } = objParam;

    const paramEkspedisi = {
      berat: totalWeight,
      harga: totalHarga,
      id_member: login.userlogin,
      jenis_alamat: jenis_alamat,
      whcd: kodeWH
    };

    console.log(`function getPriceListOngkir invoked`);

    const { errCode:kodeError, data:datax, message:pesanError } = await getPriceListOngkir(paramEkspedisi);
    console.log({kodeError, datax, pesanError});
    if(kodeError !== "000") {
      alert(pesanError);
      return;
    }

    setCart({ ...cart, 
      kodeSTK: officeCode,
      infoStk: info_stk,
      listKurir: datax
    }); 
  };

  return (
    <>
      <Grid item md={12} xs={12} sx={{padding: 1}}>
        <TextField 
          fullWidth
          name="keySearchStk"
          value={keySearchStk}
          label="Filter Pencarian Stockist"
          onChange={cariStk}
          sx={{marginBottom: 1}}
        />
      </Grid>
      <Divider />
      <Grid item md={12} xs={12} sx={{padding: 1}}>
        {infoPilihanStk && (
          <Alert severity="success" sx={{height: "33px", padding: 0.5, marginBottom: 1}}>
            <AlertTitle>{infoPilihanStk}</AlertTitle>
          </Alert>
        )}
        <Paper variant="outlined" sx={{maxHeight: 200, overflow: 'auto'}}>
          <Card>
          {hasilPencarianStk && hasilPencarianStk.map((whx) => {
            const {officeCode:kode_stk, warehouse:nama_stk, jarak, telp:telp_stk, alamat:alamat_stk, provinsi:prov_wh, kabupaten:kab_wh, kecamatan:kec_wh, kelurahan:kel_wh} = whx;
            const nilaiMarginAlamatStk = alamat_stk.length > 40 ? 2 : 0;
            //const areaWH = `${prov_wh} - ${kab_wh} - ${kec_wh} - ${kel_wh}`;
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
                  <Grid item container xs={12} md={12} direction="row" sx={{padding: 0, marginBottom: nilaiMarginAlamatStk}}>
                      <Grid item md={1} xs={1} sx={{padding: 0, height: "30px"}}>
                        <MapsHomeWorkOutlinedIcon />
                      </Grid>
                      <Grid item md={11} xs={11} sx={{padding: 0, height: "30px"}}>
                      <Typography variant="subtitle2">{alamat_stk.toUpperCase()}</Typography>
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
                  
                  
                </CardContent>
                <CardActions>
                  <Stack direction="row" spacing={1}>
                    {kodeSTK === kode_stk && (
                      <>
                        <Alert severity="success" sx={{height: "33px", padding: 0.5}}>
                          <AlertTitle>Stockist sudah dipilih&nbsp;&nbsp;&nbsp;</AlertTitle>
                        </Alert>
                      </>
                    )}

                    {kodeSTK !== kode_stk && (
                      <>
                        <Button startIcon={<CheckIcon />} size="small" color="success" variant="contained" sx={buttonStyle} onClick={() => handlePilihStockist(whx, info_stk) }>Pilih Stockist</Button>
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

export default PilihStockist