import { useEffect, useState } from 'react';
// material-ui
import { Grid, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material';
import { BookOutlined, PlusCircleOutlined } from '@ant-design/icons';
import List from '@mui/material/List';
import { lista_juegos } from './components/globals';
import Divider from '@mui/material/Divider';
import MainCard from 'components/MainCard';
import ModalGames from './components/modalGames';
import ModalNewList from './components/modalNewList';
import { useDispatch } from 'react-redux';
import { setGameList } from 'store/reducers/gamesListSlice';

// import hook
import { useExternalApi as useListGameResponse } from 'hooks/listGamesResponse';
import ChargingCard from 'components/ChargingCard';

// ==============================|| LIBRARY PAGE ||============================== //

const Library = () => {
    const { getListGames } = useListGameResponse();
    const dispatch = useDispatch();
    const [listGames, setListGames] = useState(undefined);
    const [openModalGames, setOpenModalGames] = useState(false);
    const [openModalNewList, setOpenModalNewList] = useState(false);
    const [list, setList] = useState({})

    useEffect(() => {
        getListGames(setListGames);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCloseModal = () => {
        setOpenModalGames(false);
        setOpenModalNewList(false)
    };
    const handleListItemClick = (event, list) => {
        setList(list);
        dispatch(setGameList({ "gamesList": list }))
        setOpenModalGames(true);
    };

    return (
        <MainCard title="Mi biblioteca" darkTitle>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    startIcon={<PlusCircleOutlined />}
                    style={{ marginRight: '10px', marginTop: '10px' }}
                    onClick={() => setOpenModalNewList(true)}
                >
                    Nueva lista
                </Button>
            </div>
            {listGames ?
                <Grid item xs={12} md={7} lg={8}>
                    <List component="nav">
                        {listGames?.map((item) => (
                            <>
                                <ListItemButton
                                    key={item.id}
                                    onClick={(event) => handleListItemClick(event, item)}
                                >
                                    <ListItemIcon>
                                        <BookOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                                <Divider />
                            </>
                        ))}
                    </List>
                </Grid> 
                :
                <ChargingCard />
                }
            <ModalGames list={list} open={openModalGames} handleClose={handleCloseModal} />
            <ModalNewList open={openModalNewList} handleClose={handleCloseModal} />
        </MainCard>
    )


};

export default Library;