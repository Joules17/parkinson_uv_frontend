import {
    Grid,
    TextField,
    Typography,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Avatar,
    Box,
    Collapse,
    Divider
} from '@mui/material';

// prop
import PropTypes from 'prop-types';

// project import
import { useState, useEffect } from 'react';

// project import
import moment from 'moment';
import MainCard from 'components/MainCard';
import ChargingCard from 'components/ChargingCard';
import { useExternalApi } from 'hooks/logsResponse';

// assets
import {
    CarryOutOutlined,
    HourglassOutlined,
    DownOutlined,
    UpOutlined
} from '@ant-design/icons';

export default function ViewSession({ data }) {
    const [logs, setLogs] = useState(undefined);
    const [expandedItem, setExpandedItem] = useState(null);

    const { getLogs } = useExternalApi();

    useEffect(() => {
        fetchLogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchLogs = async () => {
        const logs = await getLogs(data.id);

        console.log(logs);
        setLogs(logs);
    };

    const handleItemClick = (id) => {
        if (expandedItem === id) {
            setExpandedItem(null);
        } else {
            setExpandedItem(id);
        }
    };

    if (data === null) {
        return <ChargingCard />;
    }
    return (
        <MainCard content={false}>
            <Grid item xs={12} sx={{ marginTop: '20 px' }}>
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography variant="body1">ID</Typography>
                        <TextField
                            value={data.id} // Asigna el valor que quieras mostrar aquí
                            variant="outlined"
                            InputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography variant="body1">Nombre de la Actividad</Typography>
                        <TextField
                            value={data.activity_name} // Asigna el valor que quieras mostrar aquí
                            variant="outlined"
                            InputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography variant="body1">Fecha de realización</Typography>
                        <TextField
                            value={moment(data.date_start).format('YYYY-MM-DD [a las] HH:mm [horas]')}
                            variant="outlined"
                            InputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography variant="body1">Fecha de Finalizacion</Typography>
                        <TextField
                            value={
                                data.date_end
                                    ? moment(data.date_end).format('YYYY-MM-DD [a las] HH:mm [horas]')
                                    : 'No ha culminado la actividad'
                            }
                            variant="outlined"
                            InputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography variant="body1">Doctor Asociado</Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: 1,
                                padding: 1
                            }}
                        >
                            <Avatar alt={data.therapist_name} src={data.therapist_picture} sx={{ mr: '1rem' }} />
                            <div>
                                <Typography variant="subtitle1">
                                    {data.therapist_name} {data.therapist_lastname}
                                </Typography>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography variant="body1">Paciente Asociado</Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: 1,
                                padding: 1
                            }}
                        >
                            <Avatar alt={data.patient_name} src={data.patient_picture} sx={{ mr: '1rem' }} />
                            <div>
                                <Typography variant="subtitle1">
                                    {data.patient_name} {data.patient_lastname}
                                </Typography>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography variant="body1">Estado de la Actividad</Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: 1,
                                padding: 1
                            }}
                        >
                            <Avatar
                                alt={data.status}
                                sx={{
                                    color: data.status === 'Realizado' ? 'success.main' : 'warning.main',
                                    bgcolor: data.status === 'Realizado' ? 'success.lighter' : 'warning.lighter',
                                    mr: '1rem'
                                }}
                            >
                                {data.status === 'Realizado' ? <CarryOutOutlined /> : <HourglassOutlined />}
                            </Avatar>
                            <div>
                                <Typography variant="subtitle1">{data.activity_status}</Typography>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="body1">Resultados de la actividad</Typography>
                        <List alignItems="flex-start">
                            {logs === undefined ? (
                                <ChargingCard />
                            ) : logs.length === 0 ? (
                                <Typography variant="h5" component="div">
                                    No hay resultados para mostrar
                                </Typography>
                            ) : (
                                <>
                                    {Array.isArray(logs) &&
                                        logs.map((game) => (
                                            <>
                                                <ListItemButton key={game.id} onClick={() => handleItemClick(game.id)}>
                                                    <ListItemAvatar>
                                                        <Avatar src={game.game_picture} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="h5" component="div">
                                                                {game.name}
                                                            </Typography>
                                                        }
                                                    />
                                                    {expandedItem === game.id ? <UpOutlined /> : <DownOutlined />}
                                                </ListItemButton>
                                                <Collapse in={expandedItem === game.id} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 2 }}>
                                                        {Object.keys(game.log).map((key) => (
                                                            <p key={key}>
                                                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{' '}
                                                                {game.log[key]}
                                                            </p>
                                                        ))}
                                                    </Box>
                                                </Collapse>
                                                <Divider />
                                            </>
                                        ))}
                                </>
                            )}
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}

ViewSession.propTypes = {
    data: PropTypes.object,
};
