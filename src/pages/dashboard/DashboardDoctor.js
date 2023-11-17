// react
import { useState } from 'react';

// prop
import PropTypes from 'prop-types';

// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography,
    Select,
    Form,
    Fab
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import ExerciseBttn from 'components/cards/exercises/ExerciseBttn';
import MenuDashboard from './MenuDashboard';
import PatientReportsAreaChart from './PatientReportsAreaChart';
import PatientSelection from './PatientSelection';
import DashboardButton from './DashboardButton';
import ActivityPieChart from './PieChart';

import brain_icon from './assets/brainy.svg';
// assets
import {
    TeamOutlined,
    ScheduleOutlined,
    BookOutlined,
    PlayCircleOutlined,
    GiftOutlined,
    MessageOutlined,
    SettingOutlined
} from '@ant-design/icons';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

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

// sales report status
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
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
    const [value, setValue] = useState('today');
    const [stat_type, setStatType] = useState('activity');
    const [y_var, setYVar] = useState('total_played_time');
    const [selectedPatients, setSelectedPatients] = useState([patientOptions[0].value]);

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
                    percentage={(activity_stats.total_activities * 100) / activity_stats.total_activities}
                    extra="35,000"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce
                    title="Total de actividades en curso"
                    count={activity_stats.total_activities_in_progress}
                    percentage={(activity_stats.total_activities_in_progress * 100) / activity_stats.total_activities}
                    extra="8,900"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce
                    title="Total de actividades realizadas"
                    count={activity_stats.total_activities_finished}
                    percentage={(activity_stats.total_activities_finished * 100) / activity_stats.total_activities}
                    extra="1,943"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce
                    title="Total de rondas pendientes"
                    count={activity_stats.total_activities_pending}
                    percentage={(activity_stats.total_activities_pending * 100) / activity_stats.total_activities}
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

            {/* row 4 */}
            {/*
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Sales Report</Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
                        >
                            {status.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 1.75 }}>
                    <Stack spacing={1.5} sx={{ mb: -12 }}>
                        <Typography variant="h6" color="secondary">
                            Net Profit
                        </Typography>
                        <Typography variant="h4">$1560</Typography>
                    </Stack>
                    <SalesColumnChart />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Transaction History</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <List
                        component="nav"
                        sx={{
                            px: 0,
                            py: 0,
                            '& .MuiListItemButton-root': {
                                py: 1.5,
                                '& .MuiAvatar-root': avatarSX,
                                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                            }
                        }}
                    >
                        <ListItemButton divider>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: 'success.main',
                                        bgcolor: 'success.lighter'
                                    }}
                                >
                                    <GiftOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
                            <ListItemSecondaryAction>
                                <Stack alignItems="flex-end">
                                    <Typography variant="subtitle1" noWrap>
                                        + $1,430
                                    </Typography>
                                    <Typography variant="h6" color="secondary" noWrap>
                                        78%
                                    </Typography>
                                </Stack>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                        <ListItemButton divider>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: 'primary.main',
                                        bgcolor: 'primary.lighter'
                                    }}
                                >
                                    <MessageOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography variant="subtitle1">Order #984947</Typography>}
                                secondary="5 August, 1:45 PM"
                            />
                            <ListItemSecondaryAction>
                                <Stack alignItems="flex-end">
                                    <Typography variant="subtitle1" noWrap>
                                        + $302
                                    </Typography>
                                    <Typography variant="h6" color="secondary" noWrap>
                                        8%
                                    </Typography>
                                </Stack>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: 'error.main',
                                        bgcolor: 'error.lighter'
                                    }}
                                >
                                    <SettingOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
                            <ListItemSecondaryAction>
                                <Stack alignItems="flex-end">
                                    <Typography variant="subtitle1" noWrap>
                                        + $682
                                    </Typography>
                                    <Typography variant="h6" color="secondary" noWrap>
                                        16%
                                    </Typography>
                                </Stack>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                    </List>
                </MainCard>
                <MainCard sx={{ mt: 2 }}>
                    <Stack spacing={3}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Stack>
                                    <Typography variant="h5" noWrap>
                                        Help & Support Chat
                                    </Typography>
                                    <Typography variant="caption" color="secondary" noWrap>
                                        Typical replay within 5 min
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                                    <Avatar alt="Remy Sharp" src={avatar1} />
                                    <Avatar alt="Travis Howard" src={avatar2} />
                                    <Avatar alt="Cindy Baker" src={avatar3} />
                                    <Avatar alt="Agnes Walker" src={avatar4} />
                                </AvatarGroup>
                            </Grid>
                        </Grid>
                        <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
                            Need Help?
                        </Button>
                    </Stack>
                </MainCard>
            </Grid>
                                */}
        </Grid>
    );
};

DashboardDoctor.propTypes = {
    reports: PropTypes.array,
    activity_stats: PropTypes.object,
    user: PropTypes.object
};

export default DashboardDoctor;
