import { useState, useEffect } from 'react';

// mui
import { Grid, TextField, Button, Alert } from '@mui/material';

// props
import PropTypes from 'prop-types';

const ProfileTherapistForm = ({ LABELS, FIELDS, userCharged, handleExit, onSubmit }) => {
    const [formData, setFormData] = useState({});
    const [alertsError, setAlertsError] = useState(false);

    useEffect(() => {
        const initialData = {};
        FIELDS.forEach((field) => {
            initialData[field] = userCharged[field] || '';
        });
        setFormData(initialData);
    }, [userCharged, FIELDS]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handlePreviousSubmit = () => {
        let newAlerts = false;

        LABELS.forEach((label, index) => {
            const fieldValue = formData[FIELDS[index]];

            if ((FIELDS[index] === 'name' || FIELDS[index] === 'lastname') && (fieldValue === '' || !/^[A-Za-z]+$/.test(fieldValue))) {
                newAlerts = true;
            }

            if (FIELDS[index] === 'cell' && (fieldValue === '' || !/^\d+$/.test(fieldValue))) {
                newAlerts = true;
            }
        });

        if (newAlerts) {
            setAlertsError(true);
            return;
        }

        setAlertsError(false);
        onSubmit(formData);
    };

    return (
        <Grid item xs={12} sx={{ marginTop: '20px' }}>
            <form>
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                    {LABELS.map((label, index) => (
                        <Grid item xs={12} sm={4} key={label}>
                            <TextField
                              label={label}
                              inputProps={{ maxLength: 100 }}
                              fullWidth
                              value={formData[FIELDS[index]] || ''}
                              onChange={(e) => handleInputChange(FIELDS[index], e.target.value)}
                            />
                        </Grid>
                    ))}
                    {alertsError && (
                        <Grid item lg={12} sm={12} xs={12}>
                            <Alert severity="error" sx={{ marginBottom: '10px' }}>
                                Verifique el contenido de los campos e intente nuevamente.
                            </Alert>
                        </Grid>
                    )}
                    <Grid item lg={6} sm={6} xs={6}>
                        <Button disableElevation fullWidth color="primary" variant="contained" onClick={handleExit}>
                            Cancelar
                        </Button>
                    </Grid>
                    <Grid item lg={6} sm={6} xs={6}>
                        <Button disableElevation fullWidth color="primary" variant="contained" onClick={handlePreviousSubmit}>
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};

ProfileTherapistForm.propTypes = {
    LABELS: PropTypes.array,
    FIELDS: PropTypes.array,
    userCharged: PropTypes.object,
    handleExit: PropTypes.func,
    onSubmit: PropTypes.func
};

export default ProfileTherapistForm;
