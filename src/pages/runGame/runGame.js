import { Card, CardContent, CardMedia, Stack, CardActionArea, Box, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import { useLocation } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';

// project import
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GameFruits from 'components/exercises/Frutas/GameObjectIntruder'
import GameNumbers from 'components/exercises/Numbers/GameNumbers';
import GameArtic from 'components/exercises/ArticRows/GameArtic';
import GameFrutastic from 'components/exercises/Frutastico/GameFrutastic';
import GameDomino from 'components/exercises/DominoGame/GameDomino'
import GameLetras from 'components/exercises/LetraAventura/GameLetras';

// ==============================|| GAMES PAGE ||============================== //

const RunGame = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const game = queryParams.get('game');
    const description = queryParams.get('description'); 
    const gameListState = useSelector((state) => state.gamesList);
    const [startGame, setStartGame] = useState({})

    const setting = {
        rondas: 2 
    }

    const renderGame = () => {
        switch (game) {
            case "Frutas Locas":
                return <GameFruits setting={setting}/>;
            case "Encuentra el número":
                return <GameNumbers setting={setting}/>;
            case "Flechas Articas":
                return <GameArtic setting={setting}/>;
            case "Frutastico":
                return <GameFrutastic setting={setting}/>;
            case "Letras VS Numeros":
                return <GameDomino setting={setting}/>;
            case "Letra Aventura":
                return <GameLetras setting={setting}/>;
            default:
                return null;
        }
    };

    return (
        <div style = {{ flex: 1 }}>
            <MainCard title={game} darkTitle>
                <Typography variant="h6" sx = {{ mb: '2rem'}}>
                    {description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {renderGame()}
                </Box>
            </MainCard>
        </div>
    )

};

export default RunGame;