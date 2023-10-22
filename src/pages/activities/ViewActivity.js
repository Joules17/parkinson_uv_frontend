
import { Grid, TextField, Typography, List, ListItemAvatar, ListItemButton, ListItemText, Avatar, Tooltip, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

// project import
import MainCard from "components/MainCard"
import ChargingCard from "components/ChargingCard"
import ViewList from 'pages/activities/ViewList';
import { setGameList } from 'store/reducers/gamesListSlice';
import { useExternalApi } from 'hooks/listGamesResponse';
import { useExternalApi as useActivityResponse } from 'hooks/activitiesResponse';

// assets
import { CalendarOutlined, CarryOutOutlined, CloseSquareOutlined, DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
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

export default function ViewActivity({ data, handleOpenWarningModal, type, handleViewSession }) {
    const { updateStatusActivity } = useActivityResponse();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [listGames, setListGames] = useState(null);
    const {getListGames} = useExternalApi();

    useEffect(() => {
        getListGames(data.id_list, setListGames)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleButtonClick = () => {
        if(data.status == "Pendiente"){
            const status = "En curso"
            // Fecha de ahora para iniciar la session
            updateStatusActivity(data.id, status)
        }

        if(listGames !== null){
            dispatch(setGameList({ "gamesList": listGames  }))
            navigate('/run-list-games');
        }
    };

    if (data === null) {
        return <ChargingCard />
    }
    return (
        <MainCard content={false}>
            <Grid item xs={12} sx={{ marginTop: '20 px' }}>
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography variant='body1'>
                            ID
                        </Typography>
                        <TextField
                            value={data.id} // Asigna el valor que quieras mostrar aquí
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography variant='body1'>
                            Nombre de la Actividad
                        </Typography>
                        <TextField
                            value={data.activity_name} // Asigna el valor que quieras mostrar aquí
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography variant='body1'>
                            Fecha de Inicio
                        </Typography>
                        <TextField
                            value={data.start_date} // Asigna el valor que quieras mostrar aquí
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography variant='body1'>
                            Fecha de Fin
                        </Typography>
                        <TextField
                            value={data.end_date} // Asigna el valor que quieras mostrar aquí
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography variant='body1'>
                            Doctor Asociado
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{
                            border: '1px solid #ccc',
                            borderRadius: 1,
                            padding: 1
                        }}>
                            <Avatar alt={data.therapist_name} src={data.therapist_picture} sx={{ mr: '1rem' }} />
                            <div>
                                <Typography variant="subtitle1">{data.therapist_name} {data.therapist_lastname}</Typography>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography variant='body1'>
                            Paciente Asociado
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{
                            border: '1px solid #ccc',
                            borderRadius: 1,
                            padding: 1
                        }}>
                            <Avatar alt={data.patient_name} src={data.patient_picture} sx={{ mr: '1rem' }} />
                            <div>
                                <Typography variant="subtitle1">{data.patient_name} {data.patient_lastname}</Typography>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography variant='body1'>
                            Estado de la Actividad
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{
                            border: '1px solid #ccc',
                            borderRadius: 1,
                            padding: 1
                        }}>
                            <Avatar alt={data.status} sx={{
                                color: data.status === 'Realizado' ? 'success.main' : (data.status === 'Pendiente' ? 'warning.main' : 'error.main'),
                                bgcolor: data.status === 'Realizado' ? 'success.lighter' : (data.status === 'Pendiente' ? 'warning.lighter' : 'error.lighter'),
                                mr: '1rem'

                            }}
                            >
                                {data.status === 'Realizado' ? <CarryOutOutlined /> : (data.status === 'Pendiente' ? <CalendarOutlined /> : <CloseSquareOutlined />)}
                            </Avatar>
                            <div>
                                <Typography variant="subtitle1">{data.status}</Typography>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant='body1'>
                            Lista Asignada
                        </Typography>
                        <ViewList listGames={listGames} name_list={data.lista_name} />
                    </Grid>
                </Grid>
                {type === 'doctor' && (
                    <List component='nav' sx={{
                        px: 0,
                        py: 0,
                        mt: '1rem',
                        '& .MuiListItemButton-root': {
                            py: 1.5,
                            '& .MuiAvatar-root': avatarSX,
                            '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                        }
                    }}>
                        <ListItemButton divider onClick={handleOpenWarningModal} sx={{ bgcolor: '#ff4d4f', '&:hover': { bgcolor: '#ff4d4f' } }} >
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: 'error.main',
                                        bgcolor: 'error.lighter'
                                    }}
                                >
                                    <DeleteOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Eliminar Actividad</Typography>} />
                        </ListItemButton>
                    </List>
                )
                }
                {type === 'paciente' && (data.status === 'Pendiente' || data.status === 'En curso') && (
                    <List component='nav' sx={{
                        px: 0,
                        py: 0,
                        mt: '1rem',
                        '& .MuiListItemButton-root': {
                            py: 1.5,
                            '& .MuiAvatar-root': avatarSX,
                            '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                        }
                    }}>
                        <ListItemButton divider onClick={handleButtonClick} sx={{ bgcolor: 'success.main', '&:hover': { bgcolor: 'success.main' } }} >
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: 'success.main',
                                        bgcolor: 'success.lighter'
                                    }}
                                >
                                    <PlayCircleOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Empezar Actividad</Typography>} />
                        </ListItemButton>
                    </List>
                )}
                {type === 'paciente' && data.status === 'Realizado' && (
                    <List component='nax' sx={{
                        px: 0,
                        py: 0,
                        mt: '1rem',
                        '& .MuiListItemButton-root': {
                            py: 1.5,
                            '& .MuiAvatar-root': avatarSX,
                            '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                        }
                    }}>
                        <ListItemButton divider onClick={handleViewSession} sx={{ bgcolor: 'success.main', '&:hover': { bgcolor: 'success.main' } }} >
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: 'success.main',
                                        bgcolor: 'success.lighter'
                                    }}
                                >
                                    <PlayCircleOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Ver Sesion</Typography>} />
                        </ListItemButton>
                    </List>
                )}
                {type === 'paciente' && data.status === 'Caducado' && (
                    <List component='nav' sx={{
                        px: 0,
                        py: 0,
                        mt: '1rem',
                        '& .MuiListItemButton-root': {
                            py: 1.5,
                            '& .MuiAvatar-root': avatarSX,
                            '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                        }
                    }}>
                        <ListItemButton divider onClick={handleButtonClick} disabled={true} sx={{ bgcolor: 'success.main', '&:hover': { bgcolor: 'success.main' } }} >
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: 'success.main',
                                        bgcolor: 'success.lighter'
                                    }}
                                >
                                    <PlayCircleOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Empezar Actividad</Typography>} />
                        </ListItemButton>
                    </List>
                )}
            </Grid>
        </MainCard>
    )
}