import { Grid, TextField, Button, MenuItem, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const ProfilePatientForm = ({ userCharged, handleExit, onSubmit }) => {
    const { handleSubmit, register } = useForm();
    const generos = [
        { value: 'masculino', label: 'Masculino' },
        { value: 'femenino', label: 'Femenino' },
        { value: 'no binario', label: 'No binario' },
    ];

    const [showAlert, setShowAlert] = useState(false);

    const submitHandler = (data) => {
        let newAlerts = false;

        if (!/^[A-Za-z]+$/.test(data.name) || !data.name) {
            newAlerts = true;
        }

        if (!/^[A-Za-z]+$/.test(data.lastname) || !data.lastname) {
            newAlerts = true;
        }

        if (!/^\d+$/.test(data.cell) || !data.cell) {
            newAlerts = true;
        }

        if (new Date(data.age) >= new Date()) {
            newAlerts = true;
        }
        
        if (newAlerts) {
            setShowAlert(true);
        } else {
            onSubmit(data);
        }
    };

    return (
        <Grid item xs={12} sx={{ marginTop: '20px' }}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={4}>
                        <TextField
                            label="Nombre (s)"
                            defaultValue={userCharged.name}
                            {...register('name', { required: true })}
                            inputProps={{ maxLength: 100 }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Apellido (s)"
                            defaultValue={userCharged.lastname}
                            {...register('lastname', { required: true })}
                            inputProps={{ maxLength: 100 }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Email"
                            defaultValue={userCharged.email}
                            inputProps={{ maxLength: 100 }}
                            fullWidth
                            disabled={true}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Teléfono"
                            type="number"
                            defaultValue={userCharged.cell}
                            {...register('cell', { required: true })}
                            inputProps={{ maxLength: 100 }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Edad"
                            type="date"
                            defaultValue={userCharged.age}
                            {...register('age', { required: true })}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ maxLength: 50 }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Género"
                            select
                            defaultValue={userCharged.gender}
                            {...register('gender', { required: true })}
                            fullWidth
                        >
                            {generos.map((gen) => (
                                <MenuItem key={gen.value} value={gen.value}>
                                    {gen.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {showAlert && (
                        <Grid item xs={12}>
                            <Alert severity="error">
                                ¡Hubo un error! Verifique los campos e intente nuevamente.
                            </Alert>
                        </Grid>
                    )}
                    <Grid item xs={6}>
                        <Button disableElevation color="primary" variant="contained" fullWidth onClick={handleExit}>
                            Cancelar
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button disableElevation color="primary" variant="contained" fullWidth type="submit">
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};

ProfilePatientForm.propTypes = {
    userCharged: PropTypes.object,
    handleExit: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default ProfilePatientForm;