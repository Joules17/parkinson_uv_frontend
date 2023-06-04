// material ui 
import { Grid, TextField, Button, MenuItem } from '@mui/material';

// react hook form
import { useForm } from 'react-hook-form'; 

// prop
import PropTypes from 'prop-types';

const ProfilePatientForm = ({ userCharged, handleExit, onSubmit }) => {
    // hook functions  ---------------------------------------------------
    const { handleSubmit: registerSubmit, register: registro } = useForm();

    // aux ---------------------------------------------------------------
    const generos = [
        { value: 'masculino', label: 'Masculino' },
        { value: 'femenino', label: 'Femenino' },
        { value: 'no binario', label: 'No binario' },
    ];
    
    return(
        <Grid item xs={12} sx={{ marginTop: '20px' }}>
            <form onSubmit = {registerSubmit(onSubmit)}>
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={4}>
                        <TextField label = "Nombre (s)" defaultValue = {userCharged.name} {...registro('name', {required: true})} inputProps = {{maxLength: 100}} fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField label = "Apellido (s)" defaultValue = {userCharged.lastname} {...registro('lastname', {required: true})} inputProps = {{maxLength: 100}} fullWidth/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField label = "Email" defaultValue = {userCharged.email} inputProps = {{maxLength: 100}} fullWidth disabled = {true}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField label = "Teléfono" type = "number" defaultValue = {userCharged.cell}  {...registro('cell', {required: true})} inputProps = {{maxLength: 100 }} fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField label = "Edad" type = "date" defaultValue = {userCharged.age}  {...registro('age', {required: true})} InputLabelProps = {{ shrink: true }} inputProps = {{ maxLength: 50 }} fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField label = "Género" select defaultValue = {userCharged.gender}  {...registro('gender', {required: true})} fullWidth>
                            {generos.map((gen) => (
                                <MenuItem key={gen.value} value={gen.value}>
                                    {gen.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <Button disableElevation color="primary" variant="contained" fullWidth onClick = {handleExit}>
                            Cancelar 
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button disableElevation color="primary" variant="contained" fullWidth onClick = {registerSubmit(onSubmit)}>
                            Guardar 
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    )
}

ProfilePatientForm.propTypes = {
    userCharged: PropTypes.object, 
    handleExit: PropTypes.func,
    onSubmit: PropTypes.func
}

export default ProfilePatientForm; 