// material-ui 
import { Typography, Grid, CircularProgress } from '@mui/material';

// project imports
import MainCard from 'components/MainCard'
// ========================================================================================================

const ChargingCard = () => {
    return(
        <MainCard>
            <Grid container direction="column" alignItems="center" justifyContent="center">
                <Typography variant="h4" sx={{ mb: 1.5 }}>
                Cargando...
                </Typography>
                <CircularProgress />
            </Grid>
        </MainCard>
    ); 
}

export default ChargingCard;