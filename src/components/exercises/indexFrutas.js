// material-ui
import { Typography, Box } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import GameFruits from 'components/exercises/Frutas/Frutas'

// ==============================|| SAMPLE PAGE ||============================== //

const IndexFruits = () => (
    <div>
    <MainCard title="Actividad: Frutas Locas">
        <Typography variant="body2">
            Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
            ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
            reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
            qui officiate descent molls anim id est labours.
        </Typography>
    </MainCard>
    <Box direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <GameFruits />
    </Box>
    </div>
);

export default IndexFruits;
