// material-ui
import { Typography, Grid } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import GameNumbers from 'components/exercises/Numeros'

// ==============================|| SAMPLE PAGE ||============================== //

const IndexNumbers = () => (
    <div>
    <MainCard title="Actividad: Numeros">
        <Typography variant="body2">
            Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
            ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
            reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
            qui officiate descent molls anim id est labours.
        </Typography>
    </MainCard>
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={3}>
            <GameNumbers />
        </Grid>   
    </Grid> 
    </div>
);

export default IndexNumbers;
