import { useState, useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';

// auth 0
import { useAuth0 } from '@auth0/auth0-react';

// project import
import './modules/styles.css';
import ParticlesComponent from 'layout/LandingPage/modules/components/Particles';
import ProductHero from './modules/views/ProductHero';
import ProductLegend from './modules/views/ProductLegend';
import AppAppBar from './modules/views/AppAppBar';
import ProductValues from './modules/views/ProductValues';
import ProductDomains from './modules/views/ProductDomains';
import ProductAllies from './modules/views/ProductAllies';
import AppFooter from './modules/views/AppFooter';

const Home = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollTop = document.documentElement.scrollTop;
            const progress = (scrollTop / scrollHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Box>
            <Box component="section" sx={{ position: 'relative', zIndex: 9999 }}>
                <AppAppBar />
            </Box>
            <LinearProgress
                variant="determinate"
                value={scrollProgress}
                color="secondary"
                sx={{
                    position: 'fixed',
                    top: '64px', // Ajusta esta altura para que esté debajo de la AppBar
                    left: 0,
                    right: 0,
                    zIndex: 9999,
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#000000'
                    }
                }}
            />

            <div id = {'product-hero'} className={`scroll-transition ${scrollProgress > 0 ? 'scroll-active' : ''}`}>
                <ProductHero logged={isAuthenticated} loginWithRedirect={loginWithRedirect} />
            </div>
            <ParticlesComponent />
            <div id={'product-legend'} className={`scroll-transition ${scrollProgress > 100 ? 'scroll-active' : ''}`}>
                <Box component="section" sx={{ position: 'relative', zIndex: 2, mb: '10rem' }}>
                    <ProductLegend />
                </Box>
            </div>
            <div id = {'product-domains'} className={`scroll-transition ${scrollProgress > 200 ? 'scroll-active' : ''}`}>
                <Box component="section" sx={{ position: 'relative', zIndex: 2, mb: '10rem' }}>
                    <ProductDomains />
                </Box>
            </div>
            <div id = {'product-values'} className={`scroll-transition ${scrollProgress > 300 ? 'scroll-active' : ''}`}>
                <Box component="section" sx={{ position: 'relative', zIndex: 2, mb: '10rem' }}>
                    <ProductValues />
                </Box>
            </div>
            <div className={`scroll-transition ${scrollProgress > 400 ? 'scroll-active' : ''}`}>
                <Box component="section" sx={{ position: 'relative', zIndex: 2 }}>
                    <ProductAllies />
                </Box>
            </div>
            <div className={`scroll-transition ${scrollProgress > 500 ? 'scroll-active' : ''}`}>
                <Box component="section" sx={{ position: 'relative', zIndex: 2 }}>
                    <AppFooter />
                </Box>
            </div>
        </Box>
    );
};

export default Home;
