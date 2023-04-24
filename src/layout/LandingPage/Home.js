// import * as React from 'react';
import Wave from 'react-wavify';
import Box from '@mui/material/Box';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductAllies from './modules/views/ProductAllies';
import AppAppBar from './modules/views/AppAppBar';

const Home = () => {
  return (
    <>
      <AppAppBar /> 
      <ProductHero />
      <ProductValues />
      <ProductAllies />
      <Box component="section" sx={{ display: 'flex', background: '#fff', overflow: 'hidden' }} >
      <Wave fill = '#182848' paused = {false} options = {{ height: 80, amplitude: 40, speed: 0.20, points: 4}}/>
      </Box>
      <AppFooter />
    </>
  );
}

export default Home;
