import { Box, Typography, Container, Grid } from '@mui/material';

// assets
import fundacion_img from './assets/logos/fundacion_img.jpg';

function ProductAllies() {
  return (
    <Box
      sx={{
        backgroundColor: '#f1f5f9',
        borderTopLeftRadius: '80px',
        padding: '80px 0',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <div className="box-img" style={{ position: 'relative' }}>
              <img
                src={fundacion_img}
                alt="Descripción de la imagen"
                style={{
                  width: '100%',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), transparent)',
                  maskImage: 'linear-gradient(to right, transparent, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), transparent)',
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} sx = {{ mt: '1rem' }}>
            <Box sx={{ marginLeft: '20px' }}>
              <Typography variant="h1" sx = {{ mb: '1rem'}}>
                Fundación Parkinson de Colombia
              </Typography>
              <Typography variant="h6" style={{ textAlign: 'justify' }}>
                La Fundación Parkinson de Colombia es una organización sin ánimo de lucro encaminada a ayudar a los pacientes con Enfermedad de Parkinson y sus familiares.
                Fundada el 6 de Abril de 2004, nace como una entidad de puertas abiertas que busca integrar los esfuerzos individuales y de diferentes organizaciones sociales, solidarias con ésta causa.
                Somos la primera institución especializada en la educación, soporte, rehabilitación y mejoramiento de la Calidad de Vida de pacientes con Enfermedad de Parkinson en Colombia.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductAllies;