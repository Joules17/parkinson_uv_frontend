import { useState } from 'react';
// material-ui
import { Grid, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { BookOutlined } from '@ant-design/icons';
import List from '@mui/material/List';
import { lista_juegos } from './components/globals';
import Divider from '@mui/material/Divider';
import MainCard from 'components/MainCard';
import ModalGames from './components/modalGames';
import { useDispatch } from 'react-redux';
import { setGameList } from 'store/reducers/gamesListSlice';

// import OrderTable from './components/OrdersTable';

// ==============================|| LIBRARY PAGE ||============================== //

const Library = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [list, setList] = useState({})

    const handleCloseModal = () => {
        setOpen(false);
        setOpen(false); //ELIMINAR ES UNA PRUEBA
    };

    const handleListItemClick = (event, list) => {
        setList(list);
        dispatch(setGameList({ "gamesList": list }))
        setOpen(true);
    };

    return (
        <MainCard title="Mi biblioteca" darkTitle>
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
            <ModalGames list={list} open={open} handleClose={handleCloseModal}/>
        </MainCard>
    )


};

export default Library;