import { Grid, TextField, Typography } from '@mui/material';

// prop
import PropTypes from 'prop-types';

const ProfileTherapistCard = ({ LABELS, userCharged }) => {
    console.log(userCharged);
    return (
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            <Grid item xs={12} sm={12} lg = {12}>
                <Typography variant="h4" color="inherit">
                    Datos Personales
                </Typography>
            </Grid>
            {LABELS.map((label) => (
                <Grid item xs={12} sm={3} key={label}>
                    <TextField
                        label={label}
                        fullWidth
                        InputProps={{ readOnly: true }}
                        defaultValue={label === 'Identificacion'
                            ? `${userCharged.document_type} ${userCharged.document_id}`
                            : label === 'Nombre Completo'
                            ? `${userCharged.name} ${userCharged.lastname}`
                            : label === 'Email'
                            ? userCharged.email
                            : label === 'Telefono'
                            ? userCharged.cell
                            : ''}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

ProfileTherapistCard.propTypes = {
    LABELS: PropTypes.array,
    userCharged: PropTypes.object
};

export default ProfileTherapistCard;