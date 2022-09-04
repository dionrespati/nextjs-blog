import React, {useState} from 'react';
import Axios from 'axios';
import ProductList from '../components/product/productList';
import { useAppContext } from "../context/app";
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { ReactQueryDevtools }  from 'react-query/devtools';

const queryQlient = new QueryClient();

const getListProduct = async () => {
  return await Axios({
    url:"https://www.k-net.co.id/tes_api_prd"
  }).then((res) => {
    const { data } = res;
    return data;

  }).catch(function(error) {
    console.log(error);
    throw new Error(`Error when fetching..`);
  });  
}


const Todos = () => {
  // Access the client
  const queryClient = useQueryClient()
  // Queries

  const {login } = useAppContext();
    const tes = "sd";

  console.log(`Halaman product index invoked..`);
  const {data, isLoading, isFetching, isError, isSuccess} = useQuery(
    'product', 
    getListProduct,
    /* {
      staleTime: 4000,
      refetchInterval: 4000,
    } */
  );

  console.log({data});

  if(isLoading) {
    return <div>Is loading..enteni sedelok</div>;
  }

  if(isFetching) {
    return <div>Lagi njupuk data..SING SABAR..!!!</div>;
  }

  if(isError) {
    return <div>Damput...error mas bro</div>;
  }
  
  if(isSuccess) {
    const {arrayData:dataPrd} = data;
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
  }

}

const About = () => {
  return (
    <QueryClientProvider client={queryQlient}>
      <Todos />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default About;