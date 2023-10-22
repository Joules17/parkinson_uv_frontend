// material ui
import { Box, Typography, Container } from '@mui/material'; 

// assets
import FrozenArrowsMistake from './assets/FrozenArrowsMistake.png'
import ObjectIntruder from './assets/ObjectIntruder.png'
import palabraoculta from './assets/palabraoculta.png'
import soup from './assets/soup.png'
import saving from './assets/saving.png'


function ProductValues() {
  return (
    <Box
      sx={{
        backgroundColor: '#2c6dee',
        borderTopRightRadius: '80px',
        padding: '80px 0',
      }}
    >
      <Container maxWidth="md"> 
        <Typography variant="h2" align="center" color="#ffffff" gutterBottom>
          Actividades a tu disposición
        </Typography>
        <Typography variant="h6" align="center" color="#ffffff" paragraph>
          ParkinsonUV ofrece actividades que fortalecen cinco dominios cognitivos: Memoria, Lenguaje, Ejecución, y ...
        </Typography>
        <div className="logos">
          <div className="logos-slide">
            <img src= {ObjectIntruder} alt = "objIntr" className="rounded-image"/>
            <img src= {palabraoculta} alt = "WordHidden" className="rounded-image"/>
            <img src= {soup} alt = "soup" className="rounded-image"/>
            <img src= {saving} alt = "saving" className="rounded-image"/>
            <img src= {FrozenArrowsMistake} alt = "mem" className="rounded-image"/>
          </div>

          <div className="logos-slide">
            <img src= {ObjectIntruder} alt = "objIntr" className="rounded-image"/>
            <img src= {palabraoculta} alt = "WordHidden" className="rounded-image"/>
            <img src= {soup} alt = "soup" className="rounded-image"/>
            <img src= {saving} alt = "saving" className="rounded-image"/>
            <img src= {FrozenArrowsMistake} alt = "mem" className="rounded-image"/>
          </div>
        </div>
      </Container>
    </Box>
  );
}

export default ProductValues;
