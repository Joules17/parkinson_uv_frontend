import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import logoUV from './img_aux/Univalle.svg.png'


function Copyright() {
  return (
    <>
      <Link color="secondary.light" href="https://www.univalle.edu.co">
        {'Universidad del valle '}
        {new Date().getFullYear()}
      </Link>{' '}
      
    </>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark',
  },
};

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: '#182848' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: 'flex' }}>
                <Box component="a" sx={iconStyle}>
                  <img
                    src= {logoUV}
                    alt="Univalle"
                  />
                </Box>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom color = 'secondary.light'>
              INTEGRANTES
            </Typography>
            <Typography variant="subtitle1" gutterBottom color = 'secondary.light'>
              Giron A., Osorio J., Ruiz A., Rodriguez K., Salamanca J.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
