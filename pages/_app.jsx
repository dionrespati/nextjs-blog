
import React, { Fragment } from 'react';
import { AppWrapper } from '../context/app';
import Navbar from '../components/layout/navbar/navbar3';
import Footer from '../components/layout/footer';
import './index.css';

const MyApp = ({ Component, pageProps }) => {
  
  const Layout = Component.Layout ? Component.Layout : Fragment;
  return (
    <AppWrapper>
      <Layout>
        <Navbar />
        <Component {...pageProps} />
        {/* <Footer /> */}
      </Layout>
    </AppWrapper>
  );
};

export default MyApp;