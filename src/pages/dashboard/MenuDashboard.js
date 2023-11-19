// prop
import PropTypes from 'prop-types';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// assets
import { TeamOutlined, ScheduleOutlined, BookOutlined, PlayCircleOutlined, FileDoneOutlined, EyeOutlined } from '@ant-design/icons';

const MenuDashboard = ({ type }) => (
    <Grid container spacing={1} justifyContent="center">
        {type === 1 ? (
            <Grid item xs={12} sm={6} md={3} lg={3}>
                <Button
                    variant="contained"
                    fullWidth
                    color="success"
                    startIcon={<ScheduleOutlined />}
                    onClick={() => console.log('Crear Actividad')}
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
                    onClick={() => console.log('Crear Actividad')}
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
                    onClick={() => console.log('Ir a gestion de pacientes')}
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
                    onClick={() => console.log('Ir a gestion de pacientes')}
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
                onClick={() => console.log('Ir a gestion de pacientes')}
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
                    onClick={() => console.log('Ir a gestion de pacientes')}
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
                color = "success"
                startIcon={<EyeOutlined />}
                onClick={() => console.log('Ir a gestion de pacientes')}
                sx={{ height: 60 }}
            >
                Ver mi perfil
            </Button>
        </Grid>
    </Grid>
);

MenuDashboard.propTypes = {
    type: PropTypes.number.isRequired
};

export default MenuDashboard;
