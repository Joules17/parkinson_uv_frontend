import { useState } from 'react';
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

// import OrderTable from './components/OrdersTable';

// ==============================|| LIBRARY PAGE ||============================== //

const Library = () => {
    const dispatch = useDispatch();
    const [openModalGames, setOpenModalGames] = useState(false);
    const [openModalNewList, setOpenModalNewList] = useState(false);
    const [list, setList] = useState({})

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
                    onClick={() =>setOpenModalNewList(true)}
                >
                    Nueva lista
                </Button>
            </div>
            <Grid item xs={12} md={7} lg={8}>
                <List component="nav">
                    {lista_juegos.map((item) => (
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
            <ModalGames list={list} open={openModalGames} handleClose={handleCloseModal} />
            <ModalNewList open={openModalNewList} handleClose={handleCloseModal} />
        </MainCard>
    )


};

export default Library;