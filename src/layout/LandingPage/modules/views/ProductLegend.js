import { Box, Typography, Container, Grid } from '@mui/material';

// assets
import OBJECTS from './img_aux/OBJECTS.svg';    
function ProductLegend() {
    return (
        <Box
            sx={{
                backgroundColor: '#2c6dee',
                borderTopRightRadius: '80px',
                padding: '80px 0',
            }}
        >
            <Container maxWidth="md">
                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h2" align="center" color="#ffffff" gutterBottom>
                            El propósito de ParkinsonUV
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" sx = {{ mb: '2rem'}}>
                            <img
                                src={OBJECTS}
                                alt="Imagen de propósito"
                                style={{
                                    maxWidth: '100%',
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center" color="#ffffff" paragraph>
                            ParkinsonUV nace con el propósito de crear un entorno virtual de entrenamiento cognitivo que beneficie a los pacientes con Parkinson, mientras proporciona a los terapeutas una herramienta para gestionar y programar ejercicios de estimulación cognitiva.  
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center" color="#ffffff" paragraph style={{ fontStyle: 'italic' }}>
                            "Unimos tecnología y terapia para ofrecer un enfoque integral en la mejora de la calidad de vida de los pacientes" 
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ProductLegend;