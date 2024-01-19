// react
import { useState } from 'react';

// prop
import PropTypes from 'prop-types';

// material-ui
import { Box, Button, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MenuDashboard from './MenuDashboard';
import PatientReportsAreaChart from './PatientReportsAreaChart';
import PatientSelection from './PatientSelection';
import DashboardButton from './DashboardButton';
import ActivityPieChart from './PieChart';

// assets
import OBJECTS from './assets/OBJECTS.svg';

// y axis options
const y_axis_options = [
    {
        value: 'total_played_time',
        label: 'Tiempo jugado (en segundos)'
    },
    {
        value: 'avg_round_time',
        label: 'Promedio de tiempo por ronda'
    },
    {
        value: 'total_errors',
        label: 'Número de errores'
    },
    {
        value: 'total_rounds_played',
        label: 'Número de rondas jugadas'
    },
    {
        value: 'total_games_played',
        label: 'Número de juegos reproducidos'
    }
];

// Dashboard Doctor
const DashboardDoctor = ({ reports, activity_stats, user }) => {
    // console.log('Hola soy el doctor', user);
    // console.log('Estas son las actividades', activity_stats)
    // patients options
    const uniquePatientIds = new Set();

    reports.forEach((item) => {
        uniquePatientIds.add(item.patient_id);
    });

    const patientOptions = Array.from(uniquePatientIds).map((patientId) => {
        const correspondingReport = reports.find((item) => item.patient_id === patientId);
        return {
            value: patientId,
            label: `${correspondingReport.patient_name} ${correspondingReport.patient_lastname}`
        };
    });

    // vars
    const [stat_type, setStatType] = useState('activity');
    const [y_var, setYVar] = useState('total_played_time');

    const initialSelectedPatient = patientOptions.length > 0 ? patientOptions[0].value : null;
    const [selectedPatients, setSelectedPatients] = useState([initialSelectedPatient]);

    console.log('Asi vamos con selectedPatients', selectedPatients);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 0 - Menu Dashboard*/}
            <DashboardButton />
            {/* row 1 - Menu Dashboard*/}
            <Grid item xs={12} sx={{ mb: -2.25, textAlign: 'center' }}>
                <Typography variant="h3">
                    Bienvenido terapeuta {user.name} {user.lastname}, ¿Qué desea hacer el día de hoy?{' '}
                </Typography>
            </Grid>
            <Grid item xs={12} mb={2}>
                <MenuDashboard type={1} />
            </Grid>
            {reports.length === 0 ? (
                <Grid item xs={12} sx={{ mb: -2.25, textAlign: 'center' }}>
                    <Typography variant="h3" mb={1}>
                        NO HAY RESULTADOS PARA MOSTRAR
                    </Typography>
                    <Box display="flex" justifyContent="center" sx={{ mb: '2rem' }}>
                        <img
                            src={OBJECTS}
                            alt="Imagen de propósito"
                            style={{
                                maxWidth: '100%'
                            }}
                        />
                    </Box>
                    <Typography variant="h4" mb={1}>
                        Parece que tus pacientes aún no realizan actividades, en cuanto tengan actividades iniciadas los resultados se mostrarán aquí
                    </Typography>
                </Grid>
            ) : (
                <>
                    {/* row 2 - Statistics */}
                    <Grid container alignItems="center" justifyContent="space-between" ml={4}>
                        <Grid item>
                            <Typography variant="h5">Estadísticas</Typography>
                        </Grid>
                        <Grid item>
                            <Stack direction="row" alignItems="center" spacing={0}>
                                <Button
                                    size="small"
                                    onClick={() => setStatType('activity')}
                                    color={stat_type === 'activity' ? 'primary' : 'secondary'}
                                    variant={stat_type === 'activity' ? 'outlined' : 'text'}
                                >
                                    Actividad
                                </Button>
                                <Button
                                    size="small"
                                    onClick={() => setStatType('sessions')}
                                    color={stat_type === 'sessions' ? 'primary' : 'secondary'}
                                    variant={stat_type === 'sessions' ? 'outlined' : 'text'}
                                >
                                    Sesiones
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AnalyticEcommerce
                            title="Total de actividades asignadas"
                            count={activity_stats.total_activities}
                            percentage={((activity_stats.total_activities * 100) / activity_stats.total_activities).toFixed(2)}
                            extra="35,000"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AnalyticEcommerce
                            title="Total de actividades en curso"
                            count={activity_stats.total_activities_in_progress}
                            percentage={((activity_stats.total_activities_in_progress * 100) / activity_stats.total_activities).toFixed(2)}
                            extra="8,900"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AnalyticEcommerce
                            title="Total de actividades realizadas"
                            count={activity_stats.total_activities_finished}
                            percentage={((activity_stats.total_activities_finished * 100) / activity_stats.total_activities).toFixed(2)}
                            extra="1,943"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AnalyticEcommerce
                            title="Total de rondas pendientes"
                            count={activity_stats.total_activities_pending}
                            percentage={((activity_stats.total_activities_pending * 100) / activity_stats.total_activities).toFixed(2)}
                            extra="$20,395"
                        />
                    </Grid>

                    <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

                    {/* row 2 */}
                    <Grid item xs={12} md={7} lg={8}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5">Gráfico de líneas</Typography>
                            </Grid>
                            <Grid item>
                                <Box display="flex" alignItems="center">
                                    <Typography variant="h5" mr={1}>
                                        Pacientes:
                                    </Typography>
                                    <PatientSelection
                                        patientOptions={patientOptions}
                                        selectedPatients={selectedPatients}
                                        setSelectedPatients={setSelectedPatients}
                                    />
                                    <Typography variant="h5" mr={1}>
                                        Eje Y:
                                    </Typography>
                                    <TextField
                                        id="standard-select-currency"
                                        size="small"
                                        select
                                        value={y_var}
                                        onChange={(e) => setYVar(e.target.value)}
                                        sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
                                    >
                                        {y_axis_options.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Grid>
                        </Grid>
                        <MainCard content={false} sx={{ mt: 1.5 }}>
                            <Box sx={{ pt: 1, pr: 2 }}>
                                <PatientReportsAreaChart data={reports} selected_patients={selectedPatients} selected_variable_y={y_var} />
                            </Box>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={5} lg={4}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5">Diagrama Circular</Typography>
                            </Grid>
                            <Grid item />
                        </Grid>
                        <MainCard sx={{ mt: 2 }} content={false}>
                            <Box sx={{ p: 3, pb: 0 }}>
                                <Stack spacing={2}>
                                    <Typography variant="h6" color="textSecondary">
                                        Distribución de Actvidades
                                    </Typography>
                                    <Typography variant="h3">De un total de {activity_stats.total_activities} actividades: </Typography>
                                </Stack>
                            </Box>
                            <ActivityPieChart activityStats={activity_stats} />
                        </MainCard>
                    </Grid>

                    {/* row 3 - Tabla de reportes */}
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5">Tabla de reportes</Typography>
                            </Grid>
                            <Grid item />
                        </Grid>
                        <MainCard sx={{ mt: 2 }} content={false}>
                            <OrdersTable reports={reports} />
                        </MainCard>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

DashboardDoctor.propTypes = {
    reports: PropTypes.array,
    activity_stats: PropTypes.object,
    user: PropTypes.object
};

export default DashboardDoctor;
