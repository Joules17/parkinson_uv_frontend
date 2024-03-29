import { useState, useEffect } from 'react';
// mui
import {
    Stack,
    Typography,
    Grid,
    Button,
    List,
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
import CreateActivity from './CreateActivity';
import ActivitiesHead from './ActivitiesHead';
import ViewActivity from './ViewActivity';
import ActivityCalendar from './ActivityCalendar';

// filter
import { filter } from 'lodash';

// auth 0 imports
import { useAuth0 } from '@auth0/auth0-react';

// API
import { useExternalApi } from 'hooks/therapistResponse';
import { useExternalApi as useActivityApi } from 'hooks/activitiesResponse';

// assets
import {
    CalendarOutlined,
    ClockCircleOutlined, 
    CarryOutOutlined,
    CloseSquareOutlined,
    OrderedListOutlined,
    SearchOutlined,
    NotificationOutlined,
} from '@ant-design/icons';
import ModalLogs from './ModalLogs';

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
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
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

export default function ActivityPage() {
    // auth 0 functions
    const { user } = useAuth0();
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
    };

    const handleCloseSearchMenu = () => {
        setSearchMenuAnchor(null);
    };

    // -----------------------------------------------------------
    const onOrderChange = (option) => {
        setOrder(option);
    };

    const onSearchChange = (option) => {
        setOrderBy(option);
    };
    // filters
    const [filterName, setFilterName] = useState('');

    // sorting
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('activity_name');

    // API - CallBacks
    const { getActivitiesDetailed } = useExternalApi();

    const { deleteActivity } = useActivityApi();
    // selectedList
    const [selectedList, setSelectedList] = useState(null);

    const handleListClick = (index) => {
        setSelectedList(index);
    };

    // modals
    const [openListModal, setOpenListModal] = useState(false);
    const [openLogsModal, setOpenLogsModal] = useState(false);

    const handleCloseListModal = () => {
        setOpenListModal(false);
    };

    const handleCloseLogsModal = () => {
        setOpenLogsModal(false);
    };
    const handleOpenLogsModal = () => {
        setOpenLogsModal(true);
    };

    const handleOpenListModal = () => {
        setOpenListModal(true);
    };

    // warning modals
    const [warningModal, setWarningModal] = useState(false);

    const handleOpenWarningModal = () => {
        setWarningModal(true);
    };

    const handleCloseWarningModal = () => {
        setWarningModal(false);
    };

    // success delete modal
    const [successDeleteModal, setSuccessDeleteModal] = useState(false);
    const [deletedStatus, setDeletedStatus] = useState(false);
    const handleDeleteActivity = () => {
        setSuccessDeleteModal(true);
        setWarningModal(false);
        setOpenListModal(false);
        deleteActivity(filteredActivities[selectedList].id).then(() => {
            getActivitiesDetailed(user.sub, setListActivities).then(() => {
                setDeletedStatus(true);
            });
        });
    };

    const handleCloseSuccessDeleteModal = () => {
        setSuccessDeleteModal(false);
        setDeletedStatus(false);
    };

    // useEffects
    useEffect(() => {
        getActivitiesDetailed(user.sub, setListActivities).then(() => {
            setIsLoading('Actividades');
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // handlers
    const handleFilterName = (e) => {
        setFilterName(e.target.value);
    };

    // no activities?
    if (listActivities === undefined) {
        console.log('Cargando...');
        return <ChargingCard />;
    }

    const filteredActivities = applySortFilter(listActivities, getComparator(order, orderBy), filterName, orderBy);
    const isNotFound = !filteredActivities.length && !!filterName;

    // console.log(filteredActivities) // comentar para ver las actividades traidas
    return (
        <MainCard title="Actividades" darkTitle={true}>
            <Grid item xs={12} md={7} lg={8}>
                <CreateActivity setList={setListActivities} />
                {Object.keys(listActivities).length === 0 ? (
                    <NoActivities type={'terapeuta'} />
                ) : (
                    <>
                        <Box sx={{ p: 3, pb: 3 }}>
                            <Stack spacing={2}>
                                <Typography variant="h5">Mis Actividades programadas</Typography>
                                <Toolbar
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <ActivitiesHead filterWord={filterName} onFilterWord={handleFilterName} option={orderBy} />

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<OrderedListOutlined />}
                                            sx={{ mr: '1rem' }}
                                            onClick={handleOpenOrderMenu}
                                        >
                                            Ordenar: {order}
                                        </Button>
                                        <Menu anchorEl={orderMenuAnchor} open={Boolean(orderMenuAnchor)} onClose={handleCloseOrderMenu}>
                                            <MenuItem onClick={() => onOrderChange('asc')} disabled={order === 'asc'}>
                                                {' '}
                                                Ascendente{' '}
                                            </MenuItem>
                                            <MenuItem onClick={() => onOrderChange('desc')} disabled={order === 'desc'}>
                                                {' '}
                                                Descendiente{' '}
                                            </MenuItem>
                                        </Menu>
                                        <Button variant="outlined" startIcon={<SearchOutlined />} onClick={handleOpenSearchMenu}>
                                            Buscar por: {orderBy}
                                        </Button>
                                        <Menu anchorEl={searchMenuAnchor} open={Boolean(searchMenuAnchor)} onClose={handleCloseSearchMenu}>
                                            <MenuItem
                                                onClick={() => onSearchChange('activity_name')}
                                                disabled={orderBy === 'activity_name'}
                                            >
                                                {' '}
                                                Nombre de Actividad{' '}
                                            </MenuItem>
                                            <MenuItem onClick={() => onSearchChange('id')} disabled={orderBy === 'id'}>
                                                {' '}
                                                ID{' '}
                                            </MenuItem>
                                            <MenuItem onClick={() => onSearchChange('patient_name')} disabled={orderBy === 'patient_name'}>
                                                {' '}
                                                Nombre de paciente{' '}
                                            </MenuItem>
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
                                    <ListItemButton
                                        divider
                                        key={index}
                                        onClick={() => {
                                            handleListClick(index);
                                        }}
                                        sx={{
                                            bgcolor: index === selectedList ? '#74e0da' : null,
                                            '&:hover': { bgcolor: selectedList === index ? '#74e0da' : null }
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                                                <Avatar
                                                    sx={{
                                                        color:
                                                            elem.status === 'Realizado' || elem.status === 'En curso'
                                                                ? 'success.main'
                                                                : elem.status === 'Pendiente'
                                                                ? 'warning.main'
                                                                : (elem.status === 'Caducado' ? 'error.main' : 'warning.main'),
                                                        bgcolor:
                                                            elem.status === 'Realizado' || elem.status === 'En curso'
                                                                ? 'success.lighter'
                                                                : elem.status === 'Pendiente'
                                                                ? 'warning.lighter'
                                                                : (elem.status === 'Caducado' ? 'error.lighter' : 'warning.lighter')
                                                    }}
                                                >
                                                    {elem.status === 'Realizado' ? (
                                                        <CarryOutOutlined />
                                                    ) : elem.status === 'Pendiente' ? (
                                                        <CalendarOutlined />
                                                    ) : (elem.status === 'Caducado' ? 
                                                        <CloseSquareOutlined /> 
                                                        : <ClockCircleOutlined />)
                                                        }
                                                </Avatar>
                                                <Avatar alt={elem.therapist_name} src={elem.therapist_picture} />
                                                <Avatar alt={elem.patient_name} src={elem.patient_picture} />
                                            </AvatarGroup>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1">
                                                    {' '}
                                                    Id No. {elem.id} - {elem.activity_name}
                                                </Typography>
                                            }
                                            secondary={`Fecha de inicio: ${elem.start_date} - Fecha de Fin: ${elem.end_date}`}
                                            sx={{ ml: '1rem' }}
                                        />
                                        {elem.status === 'En curso' && selectedList === index ? (
                                            <Button variant="contained" onClick={handleOpenLogsModal} style={{ marginTop: 'auto' }}>
                                                Ver Resultados
                                            </Button>
                                        ) : (
                                            <></>
                                        )}
                                        <ListItemSecondaryAction>
                                            <Stack direction="row" alignItems="center">
                                                <Dot
                                                    color={
                                                        elem.status === 'Realizado'
                                                            ? 'success'
                                                            : elem.status === 'Pendiente'
                                                            ? 'warning'
                                                            : elem.status === 'Caducado'
                                                            ? 'error'
                                                            : 'warning'
                                                    }
                                                />
                                                <Typography variant="subtitle1" noWrap>
                                                    {elem.status}
                                                </Typography>
                                            </Stack>
                                            {selectedList === index ? (
                                                <Button variant="contained" onClick={handleOpenListModal}>
                                                    Ver Más
                                                </Button>
                                            ) : null}
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
                                    <IconButton edge="end" color="inherit">
                                        <NotificationOutlined />
                                    </IconButton>
                                </DialogTitle>
                                <DialogContent>
                                    <ViewActivity
                                        data={filteredActivities[selectedList]}
                                        handleOpenWarningModal={handleOpenWarningModal}
                                        type={'doctor'}
                                        handleViewSession={undefined}
                                        handleStartSession={undefined}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseListModal} color="primary">
                                        Cerrar
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <ModalLogs
                                activity={filteredActivities[selectedList]}
                                open={openLogsModal}
                                handleClose={handleCloseLogsModal}
                            />

                            <Dialog open={warningModal} onClose={handleCloseWarningModal}>
                                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography fontWeight="bold" fontSize="1.25rem">
                                        Advertencia
                                    </Typography>
                                </DialogTitle>
                                <DialogContent>
                                    <Typography>
                                        Al eliminar la actividad, esta no podrá ser recuperada ni sus sesiones asociadas
                                    </Typography>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleDeleteActivity} color="primary">
                                        Eliminar Actividad
                                    </Button>
                                    <Button onClick={handleCloseWarningModal} color="primary">
                                        Cancelar
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog open={successDeleteModal} onClose={handleCloseSuccessDeleteModal}>
                                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography fontWeight="bold" fontSize="1.25rem">
                                        Notificación
                                    </Typography>
                                    <IconButton edge="end" color="inherit">
                                        <NotificationOutlined />
                                    </IconButton>
                                </DialogTitle>
                                <DialogContent>
                                    {deletedStatus ? <Typography>La actividad se ha eliminado correctamente</Typography> : <ChargingCard />}
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseSuccessDeleteModal} color="primary">
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
                                        No hay resultados para &nbsp;
                                        <strong>&quot;{filterName}&quot;</strong>.
                                        <br /> Buscando por &quot;{orderBy}&quot;
                                        <br /> Verifique o utilice palabras completas
                                    </Typography>
                                </MainCard>
                            )}
                        </MainCard>
                        <Box sx={{ p: 3, pb: 3 }}>
                            <Stack spacing={2}>
                                <Typography variant="h5">Calendario</Typography>
                                {selectedList === null || filteredActivities[selectedList] === undefined ? (
                                    <Typography variant="h5">Intenta escogiendo alguna actividad</Typography>
                                ) : (
                                    <ActivityCalendar
                                        start_date={filteredActivities[selectedList].start_date}
                                        end_date={filteredActivities[selectedList].end_date}
                                    />
                                )}
                            </Stack>
                        </Box>
                    </>
                )}
            </Grid>
        </MainCard>
    );
}
