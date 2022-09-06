/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { AppWrapper } from '../context/app';
import Navbar from '../components/layout/navbar/navbar3';
import './index.css';

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : Fragment;
  return (
    <AppWrapper>
      <Layout>
        <Navbar />
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
  );
}

export default MyApp;
