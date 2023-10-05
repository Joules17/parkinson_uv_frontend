import { useState, useEffect } from 'react';
// mui
import {
    Stack, Typography, Grid, Button, List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Avatar,
    AvatarGroup,
    Box,
    Toolbar,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton
} from '@mui/material';

// components
// project import
import Dot from 'components/@extended/Dot';
import MainCard from 'components/MainCard';
import ChargingCard from 'components/ChargingCard';
import NoActivities from './NoActivities';
import ActivitiesHead from './ActivitiesHead';
import ViewActivity from './ViewActivity';
import ActivityCalendar from './ActivityCalendar';

// filter
import { filter } from 'lodash';

// auth 0 imports
import { useAuth0 } from '@auth0/auth0-react';

// API
import { useExternalApi as usePatientApi } from 'hooks/patientResponse';

// assets
import { CalendarOutlined, CarryOutOutlined, CloseSquareOutlined, OrderedListOutlined, SearchOutlined, NotificationOutlined, WarningOutlined } from '@ant-design/icons';

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

// aux functions for searching
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) { return -1; }
    if (b[orderBy] > a[orderBy]) { return 1; }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, orderBy) {
    let arrayRenew = array;
    if (query) {
        arrayRenew = filter(array, (_activity) => {
            return (
                _activity.activity_name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                _activity.id.toString().indexOf(query) !== -1 ||
                _activity.patient_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
            );
        });
    }

    const stabilizedThis = arrayRenew.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    if (orderBy === 'id') {
        return stabilizedThis.map((el) => el[0]).sort((a, b) => comparator(a, b)); // Ordenar por ID
    }

    return stabilizedThis.map((el) => el[0]);
}


export default function MyActivitiesPage() {
    // auth 0 functions
    const { user } = useAuth0()
    const [listActivities, setListActivities] = useState(undefined);
    const [isLoading, setIsLoading] = useState('Cargando...');

    // menus
    const [orderMenuAnchor, setOrderMenuAnchor] = useState(null);
    const [searchMenuAnchor, setSearchMenuAnchor] = useState(null);

    const handleOpenOrderMenu = (event) => {
        setOrderMenuAnchor(event.currentTarget);
    };

    const handleCloseOrderMenu = () => {
        setOrderMenuAnchor(null);
    };

    const handleOpenSearchMenu = (event) => {
        setSearchMenuAnchor(event.currentTarget);
    }

    const handleCloseSearchMenu = () => {
        setSearchMenuAnchor(null);
    }

    // -----------------------------------------------------------
    const onOrderChange = (option) => {
        setOrder(option)
    }

    const onSearchChange = (option) => {
        setOrderBy(option)
    }
    // filters
    const [filterName, setFilterName] = useState('');

    // sorting
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('activity_name')

    // API - CallBacks
    const {
        getActivitiesDetailed
    } = usePatientApi();

    // selectedList
    const [selectedList, setSelectedList] = useState(null)

    const handleListClick = (index) => {
        setSelectedList(index)
    }

    // modals
    const [openListModal, setOpenListModal] = useState(false)

    const handleCloseListModal = () => {
        setOpenListModal(false);
    }

    const handleOpenListModal = () => {
        setOpenListModal(true);
    }

    // useEffects
    useEffect(() => {
        getActivitiesDetailed(user.sub, setListActivities).then(() => {
            setIsLoading('Actividades');
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // handlers
    const handleFilterName = (e) => {
        setFilterName(e.target.value);
    }

    // no activities?
    if (listActivities === undefined) {
        console.log('Cargando...')
        return (
            <ChargingCard />
        )
    }

    const filteredActivities = applySortFilter(listActivities, getComparator(order, orderBy), filterName, orderBy);
    const isNotFound = !filteredActivities.length && !!filterName;

    return (
        <MainCard title="Actividades" darkTitle="true">
            <Grid item xs={12} md={7} lg={8}>
                {Object.keys(listActivities).length === 0 ? (<NoActivities type={'paciente'} />) : (<>

                    <Box sx={{ p: 3, pb: 3 }}>
                        <Stack spacing={2} >
                            <Typography variant="h5" >
                                Mis Actividades programadas
                            </Typography>
                            <Toolbar sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <ActivitiesHead filterWord={filterName} onFilterWord={handleFilterName} option={orderBy} />

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button variant="outlined" startIcon={<OrderedListOutlined />} sx={{ mr: '1rem' }} onClick={handleOpenOrderMenu}>
                                        Ordenar: {order}
                                    </Button>
                                    <Menu anchorEl={orderMenuAnchor} open={Boolean(orderMenuAnchor)} onClose={handleCloseOrderMenu}>
                                        <MenuItem onClick={() => onOrderChange('asc')} disabled={order === 'asc'}> Ascendente </MenuItem>
                                        <MenuItem onClick={() => onOrderChange('desc')} disabled={order === 'desc'}> Descendiente </MenuItem>
                                    </Menu>
                                    <Button variant="outlined" startIcon={<SearchOutlined />} onClick={handleOpenSearchMenu}>
                                        Buscar por: {orderBy}
                                    </Button>
                                    <Menu anchorEl={searchMenuAnchor} open={Boolean(searchMenuAnchor)} onClose={handleCloseSearchMenu}>
                                        <MenuItem onClick={() => onSearchChange('activity_name')} disabled={orderBy === 'activity_name'}> Nombre de Actividad </MenuItem>
                                        <MenuItem onClick={() => onSearchChange('id')} disabled={orderBy === 'id'}> ID </MenuItem>
                                        <MenuItem onClick={() => onSearchChange('patient_name')} disabled={orderBy === 'patient_name'}> Nombre de paciente </MenuItem>
                                    </Menu>
                                </div>
                            </Toolbar>

                        </Stack>
                    </Box>
                    <MainCard content={false}>
                        <List
                            component="nav"

                            sx={{
                                px: 0,
                                py: 0,
                                maxHeight: '500px',
                                overflow: 'auto',
                                '& .MuiListItemButton-root': {
                                    py: 1.5,
                                    '& .MuiAvatar-root': avatarSX,
                                    '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                                }
                            }}
                        >
                            {filteredActivities.map((elem, index) => (
                                <ListItemButton divider key={index} onClick={() => { handleListClick(index) }} sx={{ bgcolor: index === selectedList ? '#74e0da' : null, '&:hover': { bgcolor: selectedList === index ? '#74e0da' : null } }}>
                                    <ListItemAvatar>
                                        <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                                            <Avatar
                                                sx={{
                                                    color: elem.status === 'Realizado' ? 'success.main' : (elem.status === 'Pendiente' ? 'warning.main' : 'error.main'),
                                                    bgcolor: elem.status === 'Realizado' ? 'success.lighter' : (elem.status === 'Pendiente' ? 'warning.lighter' : 'error.lighter')
                                                }}
                                            >
                                                {elem.status === 'Realizado' ? <CarryOutOutlined /> : (elem.status === 'Pendiente' ? <CalendarOutlined /> : <CloseSquareOutlined />)}
                                            </Avatar>
                                            <Avatar alt={elem.therapist_name} src={elem.therapist_picture} />
                                            <Avatar alt={elem.patient_name} src={elem.patient_picture} />
                                        </AvatarGroup>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography variant="subtitle1"> Id No. {elem.id} - {elem.activity_name}</Typography>}
                                        secondary={`Fecha de inicio: ${elem.start_date} - Fecha de Fin: ${elem.end_date}`}
                                        sx={{ ml: '1rem' }} />
                                    <ListItemSecondaryAction>
                                        <Stack direction="row" alignItems="center">
                                            <Dot color={elem.status === 'Realizado' ? 'success' : (elem.status === 'Pendiente' ? 'warning' : 'error')} />
                                            <Typography variant="subtitle1" noWrap>
                                                {elem.status}
                                            </Typography>
                                        </Stack>
                                        {
                                            selectedList === index ?
                                                (<Button variant="contained" onClick={handleOpenListModal}>
                                                    Ver Más
                                                </Button>) :
                                                (null)
                                        }

                                    </ListItemSecondaryAction>
                                </ListItemButton>
                            ))}
                        </List>
                        <Dialog open={openListModal} onClose={handleCloseListModal}>
                            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography fontWeight="bold" fontSize="1.25rem">
                                    {selectedList !== null && filteredActivities[selectedList]
                                        ? `Id No. ${filteredActivities[selectedList].id} - ${filteredActivities[selectedList].activity_name}`
                                        : 'Seleccione una lista'}
                                </Typography>
                                <IconButton edge='end' color='inherit'>
                                    <NotificationOutlined />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent>
                                <ViewActivity data={filteredActivities[selectedList]} handleOpenWarningModal={undefined} type={'paciente'} handleViewSession={console.log('Esta es tu sesion')} handleStartSession={console.log('Comenzo la sesion')} />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseListModal} color="primary">
                                    Cerrar
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {isNotFound && (
                            <MainCard>
                                <Typography variant="h6" paragraph>
                                    No encontrado
                                </Typography>
                                <Typography variant="body2">
                                    No hay resultados para &nFbsp;
                                    <strong>&quot;{filterName}&quot;</strong>.
                                    <br /> Buscando por &quot;{orderBy}&quot;
                                    <br /> Verifique o utilice palabras completas
                                </Typography>
                            </MainCard>
                        )}
                    </MainCard>
                    <Box sx={{ p: 3, pb: 3 }}>
                        <Stack spacing={2} >
                            <Typography variant="h5" >
                                Calendario
                            </Typography>
                            {
                                (selectedList === null || filteredActivities[selectedList] === undefined) ?
                                    (<Typography variant="h5" >
                                        Intenta escogiendo alguna actividad
                                    </Typography>)
                                    :
                                    (<ActivityCalendar start_date={filteredActivities[selectedList].start_date} end_date={filteredActivities[selectedList].end_date} />)
                            }
                        </Stack>
                    </Box>
                </>)}
            </Grid>
        </MainCard>
    )
}