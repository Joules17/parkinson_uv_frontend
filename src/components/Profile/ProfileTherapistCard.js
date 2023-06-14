// material ui
import { Grid, Typography } from '@mui/material';

// prop
import PropTypes from 'prop-types';

const ProfileTherapistCard = ({ LABELS, userCharged }) => {
    console.log(userCharged);
    return (
        <Grid container spacing={2} sx={{ justifyContent: 'center', marginTop: '20px' }}>
            {LABELS.map((label, index) => (
                <Grid item xs={12} sm={3} key={index}>
                    <Typography variant="h4" color="inherit" sx={{ marginLeft: '10px' }}>
                        {label}
                    </Typography>
                </Grid>
            ))}
            <Grid item xs={12} sm={3}>
                <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                    {userCharged.document_type} {userCharged.document_id}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                    {userCharged.name} {userCharged.lastname}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                    {userCharged.email}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                    {userCharged.cell}
                </Typography>
            </Grid>
        </Grid>
    );
};

ProfileTherapistCard.propTypes = {
    LABELS: PropTypes.array,
    userCharged: PropTypes.object
};

export default ProfileTherapistCard;
