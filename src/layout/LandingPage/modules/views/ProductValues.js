// material ui
import { Box, Typography, Container } from '@mui/material'; 

// assets
import memoria from './assets/memoria.JPG'
import letra from './assets/letra.jpg'
import numero from './assets/numero.JPG'
import frutas from './assets/frutas.JPG'


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
            <img src= {memoria} alt = "mem" className="rounded-image"/>
            <img src= {letra} alt = "let" className="rounded-image"/>
            <img src= {frutas} alt = "fru" className="rounded-image"/>
            <img src= {numero} alt = "num" className="rounded-image"/>
          </div>

          <div className="logos-slide">
            <img src= {memoria} alt = "mem" className="rounded-image"/>
            <img src= {letra} alt = "let" className="rounded-image"/>
            <img src= {frutas} alt = "fru" className="rounded-image"/>
            <img src= {numero} alt = "num" className="rounded-image"/>
          </div>
        </div>
      </Container>
    </Box>
  );
}

export default ProductValues;
