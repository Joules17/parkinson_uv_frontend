import { useState } from 'react';

// mui 
import {
    Typography, Avatar, List, ListItemAvatar, ListItemButton, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton
} from '@mui/material';

// project import 
import MainCard from 'components/MainCard';
import NewActivityForm from './NewActivityForm';

// assets
import { EditOutlined } from '@ant-design/icons';

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

export default function CreateActivity() {
    const [openModal, setOpenModal] = useState(false);
    const [mensaje, setMensaje] = useState('Crear Actividad');

    const handleButtonClick = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const onSubmit = (data) => {
        setMensaje('Actividad enviada');
        console.log('Hola bebe')
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
        </MainCard>
    )
}