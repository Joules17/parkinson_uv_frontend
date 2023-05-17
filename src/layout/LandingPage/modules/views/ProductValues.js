import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', background: '#262626', mt: '-123px'}}
    >
      <Container sx={{ mt: 15, mb: 15, display: 'flex', position: 'relative'}}>
        <Box
          component="img"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180, }}
        />
      </Container>
    </Box>
  );
}


export default ProductValues;
