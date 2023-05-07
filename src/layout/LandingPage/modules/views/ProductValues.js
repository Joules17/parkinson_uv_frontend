import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import IllustrationAvatar from './img_aux/illustration_avatar.png'
import IllustrationLogin from './img_aux/illustration_login.png'
import IllustrationAvatar2 from './img_aux/avatar_18.jpg'

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};


function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', background: '#000', mt: '-123px'}}
    >
      <Container sx={{ mt: 15, mb: 15, display: 'flex', position: 'relative'}}>
        <Box
          component="img"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180, }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={IllustrationLogin}
                alt="join"
                sx={{ height: 150 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                VARIEDAD
              </Typography>
              <Typography variant="h5">
                {
                  'El portal entre miles de paginas de ventas a tu disposición'
                }

                {
                  ', ¡ingresa ya y echa un vistazo!'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src= {IllustrationAvatar}
                alt="free"
                sx={{ height: 150 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                SIN ATADURAS
              </Typography>
              <Typography variant="h5">
                {
                  'Tranquilo, somos un sitio web gratuito y estamos a tu servicio. La brecha entre el computador de tus sueños y tu bolsillo '
                }

                {' esta a solo un click!'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={IllustrationAvatar2}
                alt="update"
                sx={{ height: 150 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                OFERTAS
              </Typography>
              <Typography variant="h5">
                {'Constantemente nuestra pagina se actualiza para que '}
                {'seas el primero en tener la mejor opción.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}


export default ProductValues;
