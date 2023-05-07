// import Wave from 'react-wavify';
import { Grid, Box } from '@mui/material';
// import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
// import ProductAllies from './modules/views/ProductAllies';
import AppAppBar from './modules/views/AppAppBar';

const Home = () => {
  return (
    <Grid sx = {{background: 'linear-gradient(to left, #757f9a, #d7dde8)', width: '100%'}}>
      <AppAppBar /> 
      <ProductHero />

      <ProductValues />
      
      {/*<ProductAllies />
      <Box component="section" sx={{ display: 'flex', background: '#fff', overflow: 'hidden' }} >
      <Wave fill = '#182848' paused = {true} options = {{ height: 80, amplitude: 40, speed: 0.20, points: 4}}/>
      </Box>
      <AppFooter />*/}
    </Grid>
  );
}

export default Home;
