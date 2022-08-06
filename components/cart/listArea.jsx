import React, {useState} from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';

const ListArea = () => {

  const [listArea, setListArea] = useState([]);

  const searchArea = (e) => {
    const [name, value] = e.target;
    if(value.length >= 4) {
      console.log({})
    }
  }

  return (
    <Box sx={{p:1}}>
      <Grid item container xs={12} md={12} direction="row" sx={{padding: 1}}>
        <Grid item md={12} xs={12} sx={{padding: 1}}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={listArea}
          renderInput={(params) => <TextField {...params} label="Tulis Nama Kota/Kecamatan" />}
          fullWidth
          onchange={searchArea}
        />
        </Grid>
        <Grid item md={12} xs={12} sx={{padding: 1}}>
          <TextField
            label="Stockist"
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ListArea;