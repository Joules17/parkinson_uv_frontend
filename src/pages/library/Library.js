import { useEffect, useState } from 'react';

// material-ui
import {
    Grid,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Typography,
    IconButton
} from '@mui/material';

// ant-design
import { BookOutlined, PlusCircleOutlined, NotificationOutlined } from '@ant-design/icons';

// import { lista_juegos } from './components/globals';

// project Import
import MainCard from 'components/MainCard';
import ModalGames from './components/modalGames';
import ModalNewList from './components/modalNewList';
import ChargingCard from 'components/ChargingCard';

import { useDispatch } from 'react-redux';
import { setGameList } from 'store/reducers/gamesListSlice';

// auth0
import { useAuth0 } from '@auth0/auth0-react';

// import hook
import { useExternalApi as useListGameResponse } from 'hooks/listGamesResponse';

// ==============================|| LIBRARY PAGE ||============================== //
export default function Library() {
    // api
    const { getListGamesDetailed, deleteListGames, checkListGames } = useListGameResponse();

    // Auth 0
    const { user } = useAuth0();

    // dispatch
    const dispatch = useDispatch();

    // vars
    const [listGames, setListGames] = useState(undefined);
    const [onLoading, setOnLoading] = useState(true);
    const [warningModal, setWarningModal] = useState(false);
    const [deletedStatus, setDeletedStatus] = useState(false);
    const [failedStatus, setFailedStatus] = useState(false);

    const [createdStatus, setCreatedStatus] = useState(false);
    const [createdListModal, setCreatedListModal] = useState(false);
    const [successDeleteModal, setSuccessDeleteModal] = useState(false);

    // modals
    const [openModalGames, setOpenModalGames] = useState(false);
    const [openModalNewList, setOpenModalNewList] = useState(false);

    // selected list
    const [list, setList] = useState({});

    // handlers ------------------------------
    const handleCloseModal = () => {
        setOpenModalGames(false);
        setOpenModalNewList(false);
    };

    const handleCloseWarningModal = () => {
        setWarningModal(false);
    };

    const handleListItemClick = (event, list) => {
        setList(list);
        dispatch(setGameList({ gamesList: list }));
        setOpenModalGames(true);
    };

    const handleDeleteList = async () => {
        setSuccessDeleteModal(true);

        const isAssigned = await checkListGames(list.id);
        if (isAssigned) {
            setFailedStatus(true); 
        } else {
            deleteListGames(list.id).then(() => {
                getListGamesDetailed(user.sub, setListGames).then(() => {
                    setDeletedStatus(true);
                });
            });
        }
    };

    const handleCloseSuccessDeleteModal = () => {
        setSuccessDeleteModal(false);
        setDeletedStatus(false);
        setFailedStatus(false);
        setWarningModal(false);
        setOpenModalGames(false);
        setOpenModalNewList(false);
    };

    const handleCloseCreatedModal = () => {
        setCreatedListModal(false); 
        setCreatedStatus(false); 
        
    }; 
    // useEffects ----------------------------
    useEffect(() => {
        getListGamesDetailed(user.sub, setListGames).then(() => setOnLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onLoading]);

    // render
    return (
        <MainCard title="Mi biblioteca" darkTitle={true}>
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
            {!onLoading ? (
                <Grid item xs={12} md={7} lg={8}>
                    <List component="nav">
                        {listGames?.map((item) => (
                            <div key={item.id}>
                                <ListItemButton onClick={(event) => handleListItemClick(event, item)}>
                                    <ListItemIcon>
                                        <BookOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </Grid>
            ) : (
                <ChargingCard />
            )}

            {/* Dialogs */}
            {/* Warning: Deleting List */}
            <Dialog open={warningModal} onClose={handleCloseWarningModal}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography fontWeight="bold" fontSize="1.25rem">
                        Advertencia
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>Al eliminar la lista, esta no podrá ser recuperada ni sus actividades? asociadas</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteList} color="primary">
                        Eliminar Lista
                    </Button>
                    <Button onClick={handleCloseWarningModal} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* success deleted list / failed deleting list */}
            <Dialog open={successDeleteModal} onClose={handleCloseSuccessDeleteModal}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography fontWeight="bold" fontSize="1.25rem">
                        Notificación
                    </Typography>
                    <IconButton edge="end" color="inherit">
                        <NotificationOutlined />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {deletedStatus ? (
                        <Typography>La lista se ha eliminado correctamente</Typography>
                    ) : failedStatus ? (
                        <Typography>
                            La lista no pudo ser eliminada porque está relacionada con una actividad, por favor elimine todos los registros
                            asociados e intente nuevamente.
                        </Typography>
                    ) : (
                        <ChargingCard />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessDeleteModal} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* new list creates notification */}
            <Dialog open={createdListModal} onClose={handleCloseCreatedModal}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography fontWeight="bold" fontSize="1.25rem">
                        Notificación
                    </Typography>
                    <IconButton edge="end" color="inherit">
                        <NotificationOutlined />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {createdStatus ? (
                        <Typography>La lista se ha creado correctamente</Typography>
                    ) : (
                        <ChargingCard />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreatedModal} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>


            <ModalGames
                list={list}
                openModal={openModalGames}
                handleClose={handleCloseModal}
                idList={list.id}
                setWarningModal={setWarningModal}
            />
            <ModalNewList open={openModalNewList} handleClose={handleCloseModal} setCreatedListModal = {setCreatedListModal} setCreatedStatus = {setCreatedStatus} />
        </MainCard>
    );
}
