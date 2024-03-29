// mui
import { Box, Typography, Container, Grid, Link } from '@mui/material';

// scroller 
import { scroller } from 'react-scroll';

// assets
import fundacion from './assets/logos/fundacion.jpg';
import uv from './assets/logos/Univalle.svg.png';

function AppFooter() {

    // Scrollers
    const handleGoToDomains = () => {
        scroller.scrollTo("product-domains", {
            duration: 500, 
            smooth: true, 
            spy: true, 
            offset: 50
        });
    }

    const handleGoToLegend = () => {
        scroller.scrollTo("product-legend", {
            duration: 500, 
            smooth: true, 
            spy: true, 
            offset: 50
        });
    }

    const handleGoToHero = () => {
        scroller.scrollTo("product-hero", {
            duration: 500, 
            smooth: true, 
            spy: true, 
            offset: 50
        });
    }

    return (
        <Box
            sx={{
                backgroundColor: '#1e293b',
                padding: '80px 0'
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex' }}>
                            <img src={uv} alt="Univalle" style={{ height: '120px', marginRight: '10px' }} />
                            <img src={fundacion} alt="Fundacion" style={{ height: '120px' }} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" component="h2" color="white">
                            Enlaces
                        </Typography>
                        <ul>
                            <li>
                                <Link onClick = {handleGoToHero}>Inicio</Link>
                            </li>
                            <li>
                                <Link onClick = {handleGoToLegend}>Proposito</Link>
                            </li>
                            <li>
                                <Link onClick = {handleGoToDomains}>Dominios Cognitivos</Link>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" component="h2" color="white">
                            Desarrolladores
                        </Typography>
                        <ul>
                            <li>
                                <Typography color="#909fb4">Lina Marcela Duque Becerra</Typography>
                            </li>
                            <li>
                                <Typography color="#909fb4">Julian Andres Salamanca Tellez</Typography>
                            </li>
                            <li>
                                <Link href="https://www.univalle.edu.co" target="_blank" rel="noopener noreferrer">
                                    Universidad del Valle
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" component="h2" color="white">
                            Fundación Parkinson de Colombia
                        </Typography>
                        <ul>
                            <li>
                                <Link href="https://www.parkinsoncolombia.org" target="_blank" rel="noopener noreferrer">
                                    Página Oficial
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.parkinsoncolombia.org/paginas/contactenos"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Contáctenos
                                </Link>
                            </li>
                            <li>
                                <Typography color="#909fb4">Carrera 36 # 4 - 56 San Fernando</Typography>
                            </li>
                            <li>
                                <Typography color="#909fb4">Cali, Colombia</Typography>
                            </li>
                            <li>
                                <Typography color="#909fb4">info@parkinsoncolombia.org</Typography>
                            </li>
                            <li>
                                <Typography color="#909fb4">(2) 5542381 - 5542384</Typography>
                            </li>
                            <li>
                                <Typography color="#909fb4">(+57) 317 853 4675</Typography>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default AppFooter;
