// material ui 
import { Grid, TextField, Button } from '@mui/material';

// react hook form
import { useForm } from 'react-hook-form'; 

// prop
import PropTypes from 'prop-types';

const ProfileTherapistForm = ({ LABELS, FIELDS, userCharged, handleExit, onSubmit }) => {
    // hook functions  ---------------------------------------------------
    const { handleSubmit: registerSubmit, register: registro } = useForm();

    return(
        <Grid item xs={12} sx={{ marginTop: '20px' }}>
            <form onSubmit={onSubmit}>
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                {LABELS.map((label, index) => (
                        <Grid item xs={4} key={index}>
                            <TextField
                                label={label}
                                defaultValue={userCharged[FIELDS[index]]}
                                {...registro(FIELDS[index], { required: true })}
                                inputProps={{ maxLength: 100 }}
                                fullWidth
                            />
                        </Grid>
                    ))}
                <Grid item xs={6}>
                    <Button disableElevation color="primary" variant="contained" fullWidth onClick={handleExit}>
                    Cancelar
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button disableElevation color="primary" variant="contained" fullWidth onClick={registerSubmit(onSubmit)}>
                    Guardar
                    </Button>
                </Grid>
                </Grid>
            </form>
        </Grid>
    )
}

ProfileTherapistForm.propTypes = {
    LABELS: PropTypes.array,
    FIELDS: PropTypes.array,
    userCharged: PropTypes.object, 
    handleExit: PropTypes.func,
    onSubmit: PropTypes.func
};


export default ProfileTherapistForm;  