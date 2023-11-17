import { Fab, Grid, Typography } from '@mui/material';
import { useWindowSize } from 'react-use';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import Confetti from 'react-confetti'
import brain_icon from './assets/brainy.svg'; // Asegúrate de colocar la ruta correcta a tu SVG

const DashboardButton = () => {
    const [isConfettiActive, setConfettiActive] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { width, height } = useWindowSize();

    const handleClick = () => {
        setConfettiActive(true);
        enqueueSnackbar('¡Confeti lanzado!', { variant: 'success' });
    };

    useEffect(() => {
        if (isConfettiActive) {
            // Detener el confeti después de 2 segundos
            const timeout = setTimeout(() => {
                setConfettiActive(false);
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [isConfettiActive]);
    console.log('widht', width, 'height', height)
    return (
        <Grid item xs={12} lg = {12} md = {12} sx={{ textAlign: 'center' }}>
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'relative',
                    bgcolor: '#ffffff',
                    '&:hover': {
                        bgcolor: '#ffffff', // Mantén el mismo color al hacer hover
                    },
                    '&:active': {
                        boxShadow: 'none', // Elimina la sombra al hacer clic
                    },
                    '&:focus': {
                        boxShadow: 'none', // Elimina la sombra al estar enfocado
                    },
                    boxShadow: 'none', // Elimina la sombra predeterminada
                }}
                onClick={handleClick}
            >
                <img src={brain_icon} alt="Parkinson SVG" width="24" height="24" />
            </Fab>
            {isConfettiActive && <Confetti width={width} height={height}/>}
        </Grid>
    );
};

export default DashboardButton;