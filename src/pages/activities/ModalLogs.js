import { useEffect, useState } from 'react';
import { Button, Modal, List, ListItemText, Box, Divider, ListItemAvatar, Avatar, Typography, Collapse, ListItemButton } from '@mui/material';
import { CloseOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGameList } from 'store/reducers/gamesListSlice';
import { useExternalApi as useLogsResponse } from 'hooks/logsResponse';
import { useExternalApi as useSessionResponse } from 'hooks/sessionResponse';


const ModalLogs = ({ activity, open, handleClose }) => {
  const gameListState = useSelector((state) => state.gamesList);
  const dispatch = useDispatch();
  const { getLogs } = useLogsResponse()
  const { getIdSession } = useSessionResponse()
  const [logs, setLogs] = useState()
  const [idSession, setIdSession] = useState()
  const [modifiedList, setModifiedList] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  useEffect(() => {
    if (activity) {
      fetchIdSession(); // Llama a fetchIdSession para obtener idSession
    }
    // setCargado(true);
  }, [activity]);

  const fetchIdSession = async () => {
    const idSessionValue = await getIdSession(activity?.id, activity?.id_patient);
    setIdSession(idSessionValue);
  }

  useEffect(() => {
    if (idSession) {
      fetchLogs()
    }
  }, [idSession])

  const fetchLogs = async () => {
    const logs = await getLogs(idSession.session_id);
    setLogs(logs);
    console.log(logs)
  }

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
    dispatch(setGameList({ "gamesList": modifiedList ? modifiedList : list }))
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
          <h2>Resultados</h2>
          <List alignItems="flex-start">
            {Array.isArray(logs) && logs.map((game) => (
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
                  />
                  {expandedItem === game.id ? <UpOutlined /> : <DownOutlined />}
                </ListItemButton>
                <Collapse in={expandedItem === game.id} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 2 }}>
                    {Object.keys(game.log).map((key) => (
                      <p key={key}>
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {game.log[key]}
                      </p>
                    ))}
                  </Box>
                </Collapse>
                <Divider />
              </>
            ))}
          </List>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalLogs;