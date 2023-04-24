// import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '../components/Typography';

// media
import mercadoLibre from './img_aux/ally_logo/mercado-libre-logo.png'
import amazon from './img_aux/ally_logo/amazon.png'
import user from './img_aux/avatar_18.jpg'
import processor from './img_aux/processor.jpg'

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

function ProductHowItWorks() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: '#fff', overflow: 'hidden'}}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" marked="center" component="h2">
          NUESTROS ALIADOS
        </Typography>
        <div>
          <Container sx={{ display: 'flex', position: 'relative', mb: 5 }}>
          <Grid container spacing = {5} mb = {10}>
            <Grid item xs = {12} md = {4} mt = {10}>
            <Box sx = {item}>
                <Card elevation = {15} sx = {{maxWidth: 370 }}>
                  <CardHeader avatar = {<Avatar id = 'avatar' src = {user}  style = {{ width: '60px', height: '60px' }}/> }  title = {<Typography variant = 'h6'> Nuestros proveedores </Typography>} subheader= 'Publicado por Scrappy'/>
                  <CardMedia component = 'img' height = '100' image = {processor} alt = 'mejores'/>
                  <CardContent>
                    <Typography>
                      Buscamos productos de fuentes confiables como Amazon y MercadoLibre para que las mejores ofertas siempre estén al alcance de un solo click
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs = {12} md = {4} mt = {15}>
              <Box sx = {item}>
                  <Box
                    component="img"
                    src={amazon}
                    alt="join"
                  />
              </Box>
            </Grid>
            <Grid item xs = {12} md = {4} mt = {15}>
              <Box sx = {item}>
                  <Box
                    component="img"
                    src={mercadoLibre}
                    alt="join"
                  />
              </Box>
            </Grid>
          </Grid>
        </Container>
        </div>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
