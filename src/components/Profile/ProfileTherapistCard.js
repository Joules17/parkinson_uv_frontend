// material ui 
import { Grid, Typography } from '@mui/material'; 

// prop
import PropTypes from 'prop-types';

const ProfileTherapistCard = ({ LABELS, userCharged }) => {

    return (
        <Grid item xs={12} sx={{ marginTop: '20px' }}>
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                {LABELS.map((label, index) => (
                    <Grid item xs={4} key={index}>
                        <Typography variant="h4" color="inherit" sx={{ marginLeft: '10px' }}>
                            {label}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: 'center', mb: '2rem' }}>
                <Grid item xs={4}>
                    <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                        {userCharged.name} {userCharged.lastname}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                        {userCharged.email}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                        {userCharged.cell}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

ProfileTherapistCard.propTypes = {
    LABELS: PropTypes.array,
    userCharged: PropTypes.object
};

export default ProfileTherapistCard