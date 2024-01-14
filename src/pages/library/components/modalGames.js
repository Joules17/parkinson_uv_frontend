// react
import { useState } from 'react';

// prop-types
import PropTypes from 'prop-types';

// mui
import {
    Button,
    Modal,
    List,
    ListItemText,
    Box,
    Divider,
    ListItemAvatar,
    Avatar,
    Typography,
    Collapse,
    ListItemButton
} from '@mui/material';

// ant design
import { CloseOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';

// project import
import SettingsGameForm from './settingsGameForm';

// react router
import { Link } from 'react-router-dom';

// dispatch
import { useDispatch, useSelector } from 'react-redux';
import { setGameList } from 'store/reducers/gamesListSlice';
import { DialogContent } from '../../../../node_modules/@mui/material/index';
import ViewGameForm from 'pages/games/ViewGameForm';

const ModalGames = ({ list, openModal, handleClose, setWarningModal }) => {
    const gameListState = useSelector((state) => state.gamesList);
    const dispatch = useDispatch();
    const [modifiedList, setModifiedList] = useState(null);
    const [expandedItem, setExpandedItem] = useState(null);

    const handleItemClick = (id) => {
        if (expandedItem === id) {
            setExpandedItem(null);
        } else {
            setExpandedItem(id);
        }
    };

    const handleListUpdate = (updatedList) => {
        setModifiedList(updatedList);
        dispatch(setGameList({ gamesList: updatedList }));
    };

    const initListGames = () => {
        dispatch(setGameList({ gamesList: modifiedList ? modifiedList : list }));
    };

    const handleFormSubmit = (config) => {
        const settings = {}
        // general rounds 
        settings['rondas'] = config.rondas;
        settings['tries'] = config.tries;


        // only letter soup games: 
        if (card.title === 'Letras Marinas') {
            settings['wordsperlevel'] = config.wordsperlevel;
        }

        // only levels games: 
        if (card.title === 'Recuerda y Encuentra' || card.title === 'Letras Marinas') {
            settings['niveles'] = config.niveles;
        }

        // only categories games: 
        if (card.title === 'Objeto Intruso' || card.title === 'Recuerda y Encuentra' || card.title === 'Letras Marinas') {
            settings['categorias'] = config.categorias;
        }

        // only word length games:
        if (card.title === 'Palabras Ocultas') {
            settings['longitudMinPalabra'] = config.longitudMinPalabra;
            settings['longitudPalabra'] = config.longitudPalabra;
        }

        // only Artic Arrow game: 
        if (card.title === 'Flechas Articas') {
            settings['rondasFirst'] = config.rondasFirstArrow;
            settings['rondasSecond'] = config.rondasSecondArrow;
        }

        // console.log('Se envia las siguientes settings: ', settings)
        navigate(`/run-game?game=${card.title}&description=${card.description}`, {
            state: settings
        });
        setOpen(false);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        maxHeight: '80vh', // Altura máxima del contenido
        bgcolor: 'background.paper',
        borderRadius: '10px',
        border: '1px solid #fafafa',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        overflowY: 'auto' // Habilitar la barra de desplazamiento vertical
    };
    return (
        <div>
            <Modal open={openModal} onClose={handleClose}>
                <Box sx={{ ...style, width: 800 }}>
                    <Button color="secondary" onClick={handleClose} style={{ position: 'absolute', top: 0, right: 0, height: 40 }}>
                        <CloseOutlined />
                    </Button>
                    <h2>{list.name}</h2>
                    <List>
                        {list.games?.map((game) => {
                            // Realizar la conversión del formato antes de pasar al componente ViewGameForm
                            const transformedData = {
                                "id": game.id,
                                "image": game.game_picture,
                                "title": game.name,
                                "description": game.description
                            };

                            return (
                                <div key={game.id}>
                                    <ListItemButton key={game.id} onClick={() => handleItemClick(game.id)}>
                                        <ListItemAvatar>
                                            <Avatar src={game.game_picture} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="h5" component="div">
                                                    {game.name}
                                                </Typography>
                                            }
                                            secondary={`Dominio: ${game.id_type}`}
                                        />
                                        {expandedItem === game.id ? <UpOutlined /> : <DownOutlined />}
                                    </ListItemButton>
                                    <Collapse in={expandedItem === game.id} timeout="auto" unmountOnExit>
                                        <SettingsGameForm
                                            typeForm={game.name}
                                            list={list}
                                            onListUpdate={handleListUpdate}
                                            idGame={game.id_game_list}
                                        />
                                        {/* <DialogContent>
                                            <ViewGameForm card={transformedData} handleFormSubmit={handleFormSubmit}/>
                                        </DialogContent> */}
                                    </Collapse>
                                    <Divider />
                                </div>
                            );
                        })}
                    </List>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1 }}>
                        <Button
                            variant="contained"
                            onClick={() => setWarningModal(true)}
                            sx={{ mr: '1rem', bgcolor: 'error.main', '&:hover': { bgcolor: 'error.dark' } }}

                        >
                            Eliminar Lista
                        </Button>
                        <Link to="/run-list-games">
                            <Button variant="contained" onClick={initListGames}>
                                Iniciar games
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalGames;

ModalGames.propTypes = {
    list: PropTypes.object.isRequired,
    openModal: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    setWarningModal: PropTypes.func.isRequired,
};
