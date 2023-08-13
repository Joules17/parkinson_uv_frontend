import { useState, useEffect } from 'react';
// mui
import {
    Container, Stack, Typography, Grid, Button, Card, CardContent, CardMedia, CardActions, CardActionArea, List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Avatar,
    AvatarGroup,
    Box
} from '@mui/material';

// components
// project import 
import MainCard from 'components/MainCard';
import ChargingCard from 'components/ChargingCard';
import NoActivities from './NoActivities';
import CreateActivity from './CreateActivity';

// auth 0 imports 
import { useAuth0 } from '@auth0/auth0-react';

// API 
import { useExternalApi } from 'hooks/therapistResponse';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';

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

function applySortFilter(array, comparator, query) {
    let arrayRenew = array;
    if (query) {
        arrayRenew = filter(array, (_activity) => _activity.activity_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }

    const stabilizedThis = arrayRenew.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


export default function ActivityPage() {
    // auth 0 functions 
    const { user } = useAuth0()
    const [openFilter, setOpenFilter] = useState(false);
    const [listActivities, setListActivities] = useState(undefined);
    const [isLoading, setIsLoading] = useState('Cargando...');

    // paginations 

    // filters
    const [filterName, setFilterName] = useState('');

    // sorting 
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('activity_name')

    const {
        getActivitiesDetailed
    } = useExternalApi();

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

    if (Object.keys(listActivities).length === 0) {
        return (
            <NoActivities />
        )
    }




    return (
        <MainCard title="Actividades" darkTitle="true">
            <Grid item xs={12} md={7} lg={8}>
                <CreateActivity />
                <Box sx={{ p: 3, pb: 3 }}>
                    <Stack spacing={2} >
                        <Typography variant="h5" >
                            Mis Actividades programadas
                        </Typography>
                    </Stack>
                </Box>
                <MainCard content={false}>
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
                <Box sx={{ p: 3, pb: 3 }}>
                    <Stack spacing={2} >
                        <Typography variant="h5" >
                            Calendario
                        </Typography>
                    </Stack>
                </Box>
            </Grid>
        </MainCard>
    )


}