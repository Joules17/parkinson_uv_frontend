// mui 
import { Typography } from '@mui/material';

// prop 
import PropTypes from 'prop-types';

// other components
import MainCard from 'components/MainCard';
import { Divider } from '../../../node_modules/@mui/material/index';

export default function NoSessions({ type }) {
    const explanation_text =
        type === 'terapeuta' ? 'Parece que no hay sesiones registradas.' : 'Parece que no has realizado ninguna actividad.';

    return (
        <MainCard sx={{ mt: 2 }} content={false}>
            <Divider />
            <Typography variant="h6" sx={{ mt: 5 }} paragraph>
                <strong> No tienes sesiones </strong>
            </Typography>
            <Typography variant="body2">{explanation_text}</Typography>
        </MainCard>
    );
}

NoSessions.propTypes = {
    type: PropTypes.string.isRequired
}

