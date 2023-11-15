// mui
import { Typography } from '@mui/material';

// prop
import PropTypes from 'prop-types';

// other components
import MainCard from 'components/MainCard';
import { Divider } from '../../../node_modules/@mui/material/index';

export default function NoActivities({ type }) {
    const explanation_text =
        type === 'terapeuta' ? 'Parece que no tienes actividades creadas.' : 'Parece que no tienes actividades asignadas.';

    return (
        <MainCard sx={{ mt: 2 }} content={false}>
            <Divider />
            <Typography variant="h6" sx={{ mt: 5 }} paragraph>
                <strong> No tienes actividades </strong>
            </Typography>
            <Typography variant="body2">{explanation_text}</Typography>
        </MainCard>
    );
}

NoActivities.propTypes = {
    type: PropTypes.string.isRequired
};
