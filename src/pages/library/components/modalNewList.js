// react
import React, { useEffect, useState } from 'react';

// prop 
import PropTypes from 'prop-types';

// mui 
import { Button, Modal, TextField, Box, Divider, ListItemAvatar, ListItemButton, Avatar, Checkbox, ListItemText, Typography } from '@mui/material';

// auth 0 
import { useAuth0 } from '@auth0/auth0-react';

// api 
import { useExternalApi as useTherapistResponse } from 'hooks/therapistResponse';

// ant design
import { CloseOutlined } from '@ant-design/icons';

// project import
// import { juegos, lista_juegos } from './globals';
// import ModalSelectGames from './modalSelectPatients';

import { useExternalApi as useListResponse } from 'hooks/listGamesResponse';
import { useExternalApi as useGameResponse } from 'hooks/gameResponse';
import { useDispatch } from 'react-redux';

const ModalNewList = ({ open, handleClose, setCreatedListModal, setCreatedStatus, setList }) => {
    const { user } = useAuth0();
    const dispatch = useDispatch();
    const { createList } = useListResponse();
    const { getGames } = useGameResponse();
    const [userCharged, setUserCharged] = useState(undefined);
    const [games, setGames] = useState(undefined);
    const [checkedItems, setCheckedItems] = React.useState([]);
    const { getTherapist } = useTherapistResponse();

    const [newList, setNewList] = useState({
        name: '',
        games: []
    });

    useEffect(() => {
        getTherapist(user.sub, setUserCharged);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (open) {
            setCheckedItems([]);
            setNewList({
                name: '',
                games: []
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleNameChange = (event) => {
        setNewList({ ...newList, name: event.target.value });
    };

    const handleListItemClick = () => {
        if (userCharged !== undefined) {
            setCreatedListModal(true); 
            setNewList((prevList) => {
                const updatedList = { ...prevList, games: checkedItems, id_therapist: userCharged.user_id };
                saveList(updatedList);
                dispatch(setGameList({ gamesList: updatedList }));
                // Guardar lista en el estado 
                return updatedList;
            });
        }
    };

    useEffect(() => {
        getGames(setGames);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        overflowY: 'auto' // Habilitar la barra de desplazamiento vertical
    };

    const saveList = (list) => {
        createList(list, setCreatedStatus, setList);
    };
    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ ...style, width: 800 }}>
                    <Button color="secondary" onClick={handleClose} style={{ position: 'absolute', top: 0, right: 0, height: 40 }}>
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
                                <div key={game.id}>
                                    <ListItemButton key={game.id} onClick={handleToggle(game.id)}>
                                        <Checkbox checked={checkedItems.indexOf(game.id) !== -1} tabIndex={-1} disableRipple />
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
                                </div>
                            ))}
                        </Box>
                    </div>
                    {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1, pt: 1 }}>
                        <Button variant="contained" onClick={(event) => handleListItemClick(event)}>Siguiente</Button>
                    </Box> */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1, pt: 1 }}>
                        <Button variant="contained" onClick={() => handleListItemClick()}>
                            Siguiente
                        </Button>
                    </Box>
                    {/* <ModalSelectGames open={openNextModal} handleClose={handleCloseModal} newList={newList} /> */}
                </Box>
            </Modal>
        </div>
    );
};

export default ModalNewList;

ModalNewList.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    setCreatedListModal: PropTypes.func.isRequired, 
    setCreatedStatus: PropTypes.func.isRequired
}; 