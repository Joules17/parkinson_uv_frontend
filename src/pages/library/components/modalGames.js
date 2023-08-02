import { useState } from 'react';
import { Button, Modal, List, ListItemText, Box, Divider, ListItemAvatar, Avatar, Typography, Collapse, ListItemButton } from '@mui/material';
import { CloseOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import SettingsGameForm from './settingsGameForm';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGameList } from 'store/reducers/gamesListSlice';


const ModalGames = ({ list, open, handleClose}) => {
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
    dispatch(setGameList({ "gamesList": updatedList }))
  };

  const initListGames = () => {
    dispatch(setGameList({ "gamesList": modifiedList? modifiedList : list  }))
  }

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
    overflowY: 'auto', // Habilitar la barra de desplazamiento vertical
  };
  console.log(list)
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
          <h2>{list.name}</h2>
          <List alignItems="flex-start">
            {list.games?.map((game) => (
              <>
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
                  <SettingsGameForm typeForm={game.name} list={list} onListUpdate={handleListUpdate} idGame={game.id_game_list}/>
                </Collapse>
                <Divider />
              </>
            ))}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1 }}>
            <Link to="/run-list-games">
              <Button variant="contained" onClick={initListGames}>Iniciar games</Button>
            </Link>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalGames;