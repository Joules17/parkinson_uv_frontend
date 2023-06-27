import { useState, useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';
import { Link as LinkScroll } from 'react-scroll';

// project import
import './modules/styles.css';
import ParticlesComponent from 'layout/LandingPage/modules/components/Particles';
import ProductHero from './modules/views/ProductHero';
import AppAppBar from './modules/views/AppAppBar';
import ProductValues from './modules/views/ProductValues';
import ProductAllies from './modules/views/ProductAllies';
import AppFooter from './modules/views/AppFooter';

const Home = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

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

            <div className={`scroll-transition ${scrollProgress > 0 ? 'scroll-active' : ''}`}>
                <LinkScroll to="product-hero" smooth={true} duration={500}>
                    <ProductHero />
                </LinkScroll>
            </div>
            <ParticlesComponent />
            <div className={`scroll-transition ${scrollProgress > 100 ? 'scroll-active' : ''}`}>
                <LinkScroll to="product-values" smooth={true} duration={500}>
                    <Box component="section" sx={{ position: 'relative', zIndex: 2, mb: '10rem' }}>
                        <ProductValues />
                    </Box>
                </LinkScroll>
            </div>
            <div className={`scroll-transition ${scrollProgress > 200 ? 'scroll-active' : ''}`}>
                <LinkScroll to="product-info" smooth={true} duration={500}>
                    <Box component="section" sx={{ position: 'relative', zIndex: 2 }}>
                        <ProductAllies />
                    </Box>
                </LinkScroll>
            </div>
            <div className={`scroll-transition ${scrollProgress > 300 ? 'scroll-active' : ''}`}>
                <LinkScroll to="product-info" smooth={true} duration={500}>
                    <Box component="section" sx={{ position: 'relative', zIndex: 2 }}>
                        <AppFooter />
                    </Box>
                </LinkScroll>
            </div>
        </Box>
    );
};

export default Home;