import { useState } from 'react';

// mui
import {
    Typography, Avatar, List, ListItemAvatar, ListItemButton, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton
} from '@mui/material';

// auth 0
import { useAuth0 } from '@auth0/auth0-react';

// import hooks
import { useExternalApi as useActivityResponse } from 'hooks/activitiesResponse';
import { useExternalApi as useTherapistResponse } from 'hooks/therapistResponse';

// project import
import MainCard from 'components/MainCard';
import ChargingCard from 'components/ChargingCard';
import NewActivityForm from './NewActivityForm';

// assets
import { EditOutlined, NotificationOutlined } from '@ant-design/icons';

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

export default function CreateActivity({setList}) {
    const [openModal, setOpenModal] = useState(false);
    const [mensaje, setMensaje] = useState('Crear Actividad');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [numberCreated, setNumberCreated] = useState(0);
    const [loadedCreated, setLoadedCreated] = useState(false);
    // api
    const { user } = useAuth0();
    // hooks
    const { createActivity } = useActivityResponse();
    const { getActivitiesDetailed } = useTherapistResponse();

    const handleButtonClick = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCloseSuccessDialog = () => {
        setSuccessDialogOpen(false);
    };

    const onSubmit = async (selectedList, selectedPatients, data) => {
        setSuccessDialogOpen(true);
        try {
            await Promise.all(
                selectedPatients.map(async (patient) => {
                    await createActivity(data, selectedList.id, patient, user.sub);
                })
            );

            await getActivitiesDetailed(user.sub, setList);
            setNumberCreated(selectedPatients.length)
            setLoadedCreated(true);
        } catch (error) {
            console.error('Error al crear actividades:', error);
        }
    };

    return (
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
                <ListItemButton divider sx={{ bgcolor: '#74e0da', '&:hover': { bgcolor: '#74e0da' } }} onClick={handleButtonClick}>
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                color: 'success.main',
                                bgcolor: 'success.lighter'
                            }}
                        >
                            <EditOutlined />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">¡Crea una nueva actividad!</Typography>} />
                </ListItemButton>
            </List>

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography fontWeight="bold" fontSize="1.25rem">
                        Crear actividad
                    </Typography>
                    <IconButton edge="end" color="inherit">
                        <EditOutlined />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <NewActivityForm onSubmit={onSubmit} handleExit={handleCloseModal} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography fontWeight="bold" fontSize="1.25rem">
                        Notificación
                    </Typography>
                    <IconButton edge="end" color="inherit">
                        <NotificationOutlined />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {loadedCreated ?
                    <Typography>
                        Se han creado {numberCreated} actividad(es) exitosamente.
                    </Typography>
                    :
                    <ChargingCard />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessDialog} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>


        </MainCard>
    )
}