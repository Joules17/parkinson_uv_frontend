import { Box, Typography, Container, Card, CardContent, Button } from '@mui/material';

// project import beta:
import ParticlesComponent from 'layout/LandingPage/modules/components/Particles';

export default function ProductHero() {
    return (
        <Box component="section" sx={{ display: 'flex', overflow: 'hidden', marginTop: '80px', mb: '15rem' }}>
            <Container maxWidth="sm">
                <ParticlesComponent />
                <Card elevation={0} sx={{ boxShadow: 'none', backgroundColor: '#ffffff', position: 'relative', zIndex: 1 }}>
                    <CardContent sx={{ backgroundColor: '#ffffff' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                            <Typography
                                component="h1"
                                variant="h1"
                                align="center"
                                color="#191919"
                                sx={{ mt: 4, fontSize: '3rem', lineHeight: 1.2 }}
                            >
                                Tu centro virtual de
                                <br />
                                <span
                                    style={{
                                        background: 'linear-gradient(to right, #0072FF, #00C6FF)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    estimulación cognitiva
                                </span>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                            <Typography variant="h5" align="center" color="textSecondary">
                                Una herramienta para la terapia cognitiva de pacientes con Parkinson
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Button variant="contained" sx={{ mr: '2rem', fontSize: '1rem' }}>
                                Iniciar
                            </Button>
                            <Button variant="outlined" sx={{ fontSize: '1rem' }}>
                                Conocer más
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
