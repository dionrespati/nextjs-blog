import React, {useState, useEffect} from 'react';
import ProductList from '../../components/product/productList';
import { useAppContext } from "../../context/app";
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import ProductSidebar from '../../components/product/productSidebar';
import SearchBar from '../../components/product/searchBar';
import axios from 'axios';

const index = () => {

  const {login } = useAppContext();
  const [dataPrd, setDataPrd] = useState([]);

  console.log(`Halaman product index invoked..`);

  useEffect(() => {
    axios.get(`https://www.k-net.co.id/tes_api_prd`)
      .then(res => {
        const { response, arrayData } = res.data;
        console.log({response, arrayData});
        if(response === 'true') {
          setDataPrd(arrayData);
        }   
      });
  },[]);

  console.log({data});

  return (
      <Box mt={10}
        sx={{
          p: 1,
        }}
      >
        <Grid container direction="row" columns={12}>
          <Grid item md={12} xs={12} sx={{p: 1}}>
            <Grid container spacing={1}>
              {dataPrd && dataPrd.map((item) => {
                const { prdcd } = item;
                return (
                  <ProductList 
                    key={prdcd}
                    item={item}
                    login={login}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
     
  );
};

export default index;
