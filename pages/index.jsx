import React from 'react';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import Navbar from '../components/layout/navbar';

const home = () => {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <div>
        <h3>Content goes here..</h3>
      </div>
      <Footer />
    </>
  );
};

export default home;
