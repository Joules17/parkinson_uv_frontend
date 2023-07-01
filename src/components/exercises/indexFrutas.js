import { useEffect, useState } from 'react';

// material-ui
import { Typography, Box } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import GameFruits from 'components/exercises/Frutas/GameFruits'

// ==============================|| SAMPLE PAGE ||============================== //

const IndexFruits = () => {
    const [cargado, setCargado] = useState(false);
    useEffect(() => {
        setCargado(true);
    }, []);

    return(
        <div style={{ flex: 1}}>
        <MainCard title="Actividad: Frutas Locas">
            <Typography variant="body2">
                Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
                ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
                reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
                qui officiate descent molls anim id est labours.
            </Typography>
        </MainCard>

        {cargado && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <GameFruits />
            </Box>
        )}
        </div>
        )


    }
export default IndexFruits;
