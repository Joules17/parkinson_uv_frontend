import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, Divider, Checkbox, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';
import { CloseOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import UserList from './tables/UserList';
import { useExternalApi as useTherapistResponse } from 'hooks/therapistResponse'
import { useAuth0 } from '@auth0/auth0-react';
import ChargingCard from 'components/ChargingCard';
import ModalGames from './modalGames';

import { useExternalApi as useListResponse } from 'hooks/listGamesResponse';

const ModalSelectGames = ({ open, handleClose, newList }) => {
    const { createList } = useListResponse()
    const { user } = useAuth0()
    const [newListReady, setNewListReady] = useState(newList)
    const [selectedPatients, setSelectedPatients] = useState(undefined)
    const [patientsLIST, setPatientsLIST] = useState(undefined);
    const [userCharged, setUserCharged] = useState(undefined);
    const [isLoading, setLoading] = useState('Cargando Informacion...')
    const { getTherapist, getTherapistPatients } = useTherapistResponse()
    const [openModalGames, setOpenModalGames] = useState(false);
    const handleCloseModal = () => {
        setOpenModalGames(false);
    };


    useEffect(() => {
        getTherapist(user.sub, setUserCharged);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // Asegúrate de que selectedPatients y userCharged no sean undefined antes de actualizar newListReady
        if (selectedPatients !== undefined && userCharged !== undefined) {
            // Agrega los campos id_therapist e id_patient al objeto newListReady
            setNewListReady({
                ...newListReady,
                id_therapist: userCharged.user_id,
                id_patient: selectedPatients,
            });
        }
        
    }, [selectedPatients, userCharged]);

    useEffect(() => {
        if (!(userCharged === undefined)) {
            getTherapistPatients(userCharged.user_id, setPatientsLIST)
                .then(() => {
                    setLoading('Usuarios')
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCharged])

    const saveList = () => {
        createList(newListReady)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        maxHeight: '90vh', // Altura máxima del contenido
        bgcolor: 'background.paper',
        borderRadius: '10px',
        border: '1px solid #fafafa',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        overflowY: 'auto', // Habilitar la barra de desplazamiento vertical
    };

    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ ...style, width: 800 }}>
                    <Button
                        color="secondary"
                        onClick={handleClose}
                        style={{ position: 'absolute', top: 0, right: 0, height: 40 }}
                    >
                        <CloseOutlined />
                    </Button>
                    <div style={{ margin: '5px' }}>
                        <h3 style={{ margin: '10px' }}>Escoge los pacientes para compartir tu lista: </h3>
                        {patientsLIST === undefined ? (
                            <ChargingCard />
                        ) : (
                            <div sx={{ maxHeight: '310px', overflow: 'auto' }}>
                                {/* añadir espacio entre ambos grupos de componentes */}
                                <UserList list={patientsLIST} setList={setPatientsLIST} loading={isLoading} setLoading={setLoading} getSelected={setSelectedPatients} />
                            </div>
                        )}
                    </div>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1, pt: 1 }}>
                        <Button variant="contained" onClick={saveList}>Guardar</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalSelectGames;