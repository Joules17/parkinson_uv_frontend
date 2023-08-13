import {
    Stack, Button, Grid, TextField, Typography
} from '@mui/material';

import { useForm } from 'react-hook-form';

import MainCard from 'components/MainCard';

export default function NewActivityForm({ onSubmit, handleExit }) {
    const { handleSubmit: registerSubmit, register: registro, watch } = useForm();
    const description = watch('description', '');

    const handleDescriptionChange = (event) => {
        if (event.target.value.length <= 200) {
            registro('description').onChange(event);
        }
    };

    return (
        <MainCard content={false}>
            <Typography fontWeight="bold" fontSize="1 rem">
                Datos de la Actividad
            </Typography>
            <Grid item xs={12} sx={{ marginTop: '20px' }}>
                <form onSubmit={registerSubmit(onSubmit)}>
                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                        <Grid item xs={4}>
                            <Typography variant="body1">
                                Nombre de la actividad
                            </Typography>
                            <TextField id='name' {...registro('name', { required: true })} inputProps={{ maxLength: 30 }} fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1">
                                Fecha de inicio
                            </Typography>
                            <TextField id="fecha" type="date" {...registro('last_scheduled_date', { required: true })} inputProps={{ min: new Date().toISOString().split('T')[0] }} fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1">
                                Intervalos (de días)
                            </Typography>
                            <TextField
                                id='interval'
                                inputProps={{ maxLength: 3, min: 1, max: 100, step: 1 }}
                                fullWidth
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Descripción
                            </Typography>
                            <TextField
                                id="description"
                                multiline
                                rows={4} // Controla la altura del TextField
                                inputProps={{ maxLength: 200 }}
                                fullWidth
                                {...registro('description')}
                                onChange={handleDescriptionChange}
                            />
                            <Typography variant="body2" sx={{ textAlign: 'right', color: description.length > 200 ? 'error.main' : 'inherit' }}>
                                {description.length}/200 caracteres
                            </Typography>
                        </Grid>

                    </Grid>
                </form>
            </Grid>
            <Typography fontWeight="bold" fontSize="1 rem">
                Asignación de Lista
            </Typography>
        </MainCard>
    )
}
