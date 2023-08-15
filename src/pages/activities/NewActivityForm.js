// react
import { useState, useEffect } from 'react'

import {
    Grid, TextField, Typography, List, ListItemAvatar, ListItemButton, ListItemText, Avatar, Tooltip
} from '@mui/material';

import { useForm } from 'react-hook-form';

// auth0
import { useAuth0 } from '@auth0/auth0-react'

// import hook
import { useExternalApi as useListGameResponse } from 'hooks/listGamesResponse';

// project import
import MainCard from 'components/MainCard';
import ChargingCard from 'components/ChargingCard';

// assets
import { BookOutlined } from '@ant-design/icons';

// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

export default function NewActivityForm({ onSubmit, handleExit }) {
    const { handleSubmit: registerSubmit, register: registro, watch } = useForm();

    // auth 0
    const { user } = useAuth0()

    const [listGames, setListGames] = useState(undefined);
    const [onLoading, setOnLoading] = useState(true);
    const [selectedList, setSelectedList] = useState(null);
    const description = watch('description', '');

    const { getListGamesDetailed } = useListGameResponse();

    // loading for lists 
    useEffect(() => {
        getListGamesDetailed(user.sub, setListGames).then(() => setOnLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onLoading]);

    const handleDescriptionChange = (event) => {
        if (event.target.value.length <= 200) {
            registro('description').onChange(event);
        }
    };

    const handleListClick = (index) => {
        setSelectedList(index)
    }
    console.log(listGames)

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
            <Grid item xs={12} sx={{ marginTop: '20px', mb: '1rem' }}>
                {onLoading ? <ChargingCard /> :
                    <MainCard sx={{ mt: 2 }} content={false} >
                        <List
                            component='nav'
                            sx={{
                                px: 0,
                                py: 0,
                                '& .MuiListItemButton-root': {
                                    py: 1.5,
                                    '& .MuiAvatar-root': avatarSX,
                                    '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                                }

                            }}
                            style={{ maxHeight: '200px', overflow: 'auto' }}
                        >
                            {listGames.map((elem, index) => (
                                <Tooltip
                                    title={
                                        <Typography>
                                            Número de juegos: {elem.games.length}
                                            <br />
                                            Lista de Juegos:
                                            <br />
                                            {elem.games.map(game => `[${game.id_type}] ${game.name}`).join(', ')}
                                        </Typography>
                                    }
                                    key={index}
                                >
                                    <ListItemButton
                                        divider
                                        selected={index === selectedList}
                                        onClick={() => handleListClick(index)}
                                        sx={{
                                            '&.Mui-selected': {
                                                backgroundColor: '#74e0da',
                                                '& .MuiListItemSecondaryAction-root': {
                                                    backgroundColor: '#74e0da',
                                                },
                                            },
                                            '& .MuiAvatar-root': avatarSX,
                                            '& .MuiListItemSecondaryAction-root': {
                                                ...actionSX,
                                                position: 'relative',
                                                backgroundColor: index === selectedList ? '#74e0da' : 'inherit',
                                            },
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{ color: '#329dff', bgcolor: '#e6f7ff' }}>
                                                <BookOutlined />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={<Typography variant="subtitle1">{elem.name}</Typography>} />
                                    </ListItemButton>
                                </Tooltip>
                            ))}
                        </List>
                    </MainCard>
                }

            </Grid>
            <Typography fontWeight="bold" fontSize="1 rem">
                Asignación de Pacientes
            </Typography>
            
        </MainCard>
    )
}
