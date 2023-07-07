import { Card, CardContent, CardMedia, Typography, Stack, CardActionArea } from '@mui/material';
import Carousel from 'react-multi-carousel';
import { useLocation } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';

// project import
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GameFruits from 'components/exercises/Frutas/GameFruits'
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
    const gameListState = useSelector((state) => state.gamesList);
    const [startGame, setStartGame] = useState({})

    const settings = {settings: {
        rondas: 5
    }}


    const renderGame = () => {
        switch (game) {
            case "Frutas":
                return <GameFruits settings={settings}/>;
            case "Encuentra el número":
                return <GameNumbers settings={settings}/>;
            case "Flechas Articas":
                return <GameArtic settings={settings}/>;
            case "Frutastico":
                return <GameFrutastic settings={settings}/>;
            case "Purple Domino":
                return <GameDomino settings={settings}/>;
            case "Letra Aventura":
                return <GameLetras settings={settings}/>;
            default:
                return null;
        }
    };

    return (
        <MainCard title={game} darkTitle>
            <Stack spacing={2}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {renderGame()}
                </div>
            </Stack>
        </MainCard>
    )

};

export default RunGame;