// prop
import PropTypes from 'prop-types';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// assets
import { TeamOutlined, ScheduleOutlined, BookOutlined, PlayCircleOutlined, FileDoneOutlined, EyeOutlined } from '@ant-design/icons';

const MenuDashboard = ({ type }) => {
    const navigate = useNavigate();
    return (
        <Grid container spacing={1} justifyContent="center">
            {type === 1 ? (
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Button
                        variant="contained"
                        fullWidth
                        color="success"
                        startIcon={<ScheduleOutlined />}
                        onClick={() => navigate(`/activities-page`)}
                        sx={{ height: 60 }}
                    >
                        Gestionar Actividades
                    </Button>
                </Grid>
            ) : (
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Button
                        variant="contained"
                        fullWidth
                        color="success"
                        startIcon={<ScheduleOutlined />}
                        onClick={() => navigate(`/my-activities-page`)}
                        sx={{ height: 60 }}
                    >
                        Ver mis actividades
                    </Button>
                </Grid>
            )}
            {type === 1 ? (
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<TeamOutlined />}
                        color="warning"
                        onClick={() => navigate(`/patients-page`)}
                        sx={{ height: 60 }}
                    >
                        Gestionar Pacientes
                    </Button>
                </Grid>
            ) : null}
            {type === 1 ? (
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<BookOutlined />}
                        color="error"
                        onClick={() => navigate(`/library-page`)}
                        sx={{ height: 60 }}
                    >
                        Listas de Juegos
                    </Button>
                </Grid>
            ) : null}

            <Grid item xs={12} sm={6} md={3} lg={3}>
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<PlayCircleOutlined />}
                    onClick={() => navigate(`/games-page`)}
                    sx={{ height: 60 }}
                >
                    Galeria de Juegos
                </Button>
            </Grid>
            {type === 1 ? (
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<FileDoneOutlined />}
                        onClick={() => navigate(`/sessions-page`)}
                        sx={{ height: 60 }}
                    >
                        Sesiones
                    </Button>
                </Grid>
            ) : null}

            <Grid item xs={12} sm={6} md={3} lg={3}>
                <Button
                    variant="contained"
                    fullWidth
                    color="success"
                    startIcon={<EyeOutlined />}
                    onClick={() => navigate(`/my-profile`)}
                    sx={{ height: 60 }}
                >
                    Ver mi perfil
                </Button>
            </Grid>
        </Grid>
    );
};

MenuDashboard.propTypes = {
    type: PropTypes.number.isRequired
};

export default MenuDashboard;
