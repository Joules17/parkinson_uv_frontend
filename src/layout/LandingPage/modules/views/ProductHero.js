/* eslint-disable global-require */
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import Typed from 'react-typed';
import Sally from './img_aux/sittedsaly.svg'; 

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

<meta charset="utf-8"></meta>
export default function ProductHero() {
  return (
    <Box component="section" sx={{ display: 'flex', overflow: 'hidden' }}>
      <Container sx={{ mt: 15, display: 'flex', position: 'relative'}}>
        <Grid container spacing = {2}>
          <Grid item xs = {12} md = {6}>
            <Box sx = {{...item, marginTop: '5rem'}}>
              <Typed
                strings={['Bienvenido a ParkinsonUV,']}
                typeSpeed={40}
                style={{ fontWeight: 'bold', fontSize: '3rem'}}
                showCursor={false}

              />
              <div style = {{ marginTop: '4rem'}}>
              <Typed
                startDelay={2500} // Espera 500ms antes de empezar el segundo Typed
                strings={['Tu espacio virtual de entrenamiento y estimulación cognitiva.', 'Tu herramienta de gestión y preparación de ejercicios!', 'Una herramienta por y para pacientes con EP.']}
                typeSpeed={60}
                backSpeed={30}
                style={{ fontSize: '2rem'}}
                showCursor={true}
                loop
              />
              </div>
            </Box>
          </Grid>
          <Grid item xs = {12} md = {6}>
            <Box sx = {item}>
              <Box  
                  component = 'img'
                  src = {Sally}
                  alt = 'mainLanding' 
                  sx = {{width: '100%', height: 'auto', marginLeft: '10rem'}}
                />
                
              </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
