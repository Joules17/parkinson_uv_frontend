import React, { useEffect, useState } from 'react';
import { Button, Modal, List, ListItemText, Box, Divider, ListItemAvatar, Avatar, Typography, Collapse, ListItemButton } from '@mui/material';
import { CloseOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import SettingsGameForm from './settingsGameForm';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGameList } from 'store/reducers/gamesListSlice';

const ModalNewList = ({ open, handleClose }) => {

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
                </Box>
            </Modal>
        </div>
    );
};

export default ModalNewList;