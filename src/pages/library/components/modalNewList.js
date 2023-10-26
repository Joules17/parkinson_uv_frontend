import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal, TextField, Box, Divider, ListItemAvatar, ListItemButton, Avatar, Checkbox, ListItemText, Typography } from '@mui/material';
import { CloseOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import UserList from './tables/UserList';
import MainCard from 'components/MainCard';
import { useExternalApi as useTherapistResponse } from 'hooks/therapistResponse'
import { useAuth0 } from '@auth0/auth0-react';
import { juegos, lista_juegos } from './globals';
import ModalSelectGames from './modalSelectPatients';
import { useExternalApi as useListResponse } from 'hooks/listGamesResponse';

import { useExternalApi as useGameResponse } from 'hooks/gameResponse';

const ModalNewList = ({ open, handleClose }) => {
    const { createList } = useListResponse()
    const { getGames } = useGameResponse();
    const [games, setGames] = useState(undefined);
    const [openNextModal, setOpenNextModal] = useState(false);
    const [checkedItems, setCheckedItems] = React.useState([]);
    const { getTherapist, getTherapistPatients } = useTherapistResponse()

    const [newList, setNewList] = useState({
        name: '',
        games: [],
    });

    useEffect(() => {
        if (open) {
          setCheckedItems([]);
          setNewList({
            name: '',
            games: [],
          });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [open]);

    const handleNameChange = (event) => {
        setNewList({ ...newList, name: event.target.value });
    };

    const handleListItemClick = (event) => {
        setNewList({ ...newList, games: checkedItems });
        setOpenNextModal(true);
    };

    useEffect(() => {
        getGames(setGames);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCloseModal = () => {
        handleClose()
        setOpenNextModal(false);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checkedItems.indexOf(value);
        const newCheckedItems = [...checkedItems];

        if (currentIndex === -1) {
            newCheckedItems.push(value);
        } else {
            newCheckedItems.splice(currentIndex, 1);
        }

        setCheckedItems(newCheckedItems);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        maxHeight: '90%', // Altura máxima del contenido
        bgcolor: 'background.paper',
        borderRadius: '10px',
        border: '1px solid #fafafa',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        overflowY: 'auto', // Habilitar la barra de desplazamiento vertical
    };

    const saveList = () => {
        createList(newList)
    }
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
                    <div style={{ margin: '8px' }}>
                        <h3>Ponle un nombre a tu lista: </h3>
                        <TextField
                            required
                            fullWidth
                            id="outlined-required"
                            label="Nombre"
                            margin="normal"
                            value={newList.name}
                            onChange={handleNameChange} // Manejar cambios en el TextField
                        />
                        <h3 style={{ paddingTop: '10px' }}>Escoge los juegos para tu lista: </h3>
                        <Box sx={{ maxHeight: '320px', overflow: 'auto' }}>
                            {games?.map((game) => (
                                <>
                                    <ListItemButton key={game.id} onClick={handleToggle(game.id)}>
                                        <Checkbox
                                            checked={checkedItems.indexOf(game.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                        <ListItemAvatar>
                                            <Avatar src={game.game_picture} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="h5" component="div">
                                                    {game.name}
                                                </Typography>
                                            }
                                            secondary={`Dominio: ${game.type}`}
                                        />
                                    </ListItemButton>
                                    <Divider />
                                </>
                            ))}
                        </Box>
                    </div>
                    {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1, pt: 1 }}>
                        <Button variant="contained" onClick={(event) => handleListItemClick(event)}>Siguiente</Button>
                    </Box> */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1, pt: 1 }}>
                        <Button variant="contained" onClick={saveList}>Guardar</Button>
                    </Box>
                    {/* <ModalSelectGames open={openNextModal} handleClose={handleCloseModal} newList={newList} /> */}
                </Box>
            </Modal>
        </div>
    );
};

export default ModalNewList;