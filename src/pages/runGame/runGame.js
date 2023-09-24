import { Card, CardContent, CardMedia, Stack, CardActionArea, Box, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import { useLocation } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';

// project import
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ObjectIntruder from 'components/exercises/ObjectIntruder/GameObjectIntruder'
import GameNumbers from 'components/exercises/Numbers/GameNumbers';
import GameArtic from 'components/exercises/ArticRows/GameArtic';
import GameFlechasCongeladas from 'components/exercises/FlechasCongeladas/GameFlechasCongeladas';
import GameRememberAndFind from 'components/exercises/RememberAndFind/GameRemember';
import LettersVsNumbers from 'components/exercises/DominoGame/GameLetterVsNumbers'
import GameLetras from 'components/exercises/LetraAventura/GameLetras';

// ==============================|| GAMES PAGE ||============================== //

const RunGame = () => {
    const location = useLocation();
    
    const queryParams = new URLSearchParams(location.search);
    const game = queryParams.get('game');
    const description = queryParams.get('description'); 
    const gameListState = useSelector((state) => state.gamesList);
    const [startGame, setStartGame] = useState({})

    const setting = location.state
    console.log(setting, 'HOLA HOLA HOLA')
    // console.log(setting)

    const renderGame = () => {
        switch (game) {
            case "Objeto Intruso":
                return <ObjectIntruder setting={setting}/>;
            case "Encuentra el número":
                return <GameNumbers setting={setting}/>;
            case "Flechas Articas":
                return <GameArtic setting={setting}/>;
            case "Recuerda y Encuentra":
                return <GameRememberAndFind setting={setting}/>;
            case "Letras VS Numeros":
                return <LettersVsNumbers setting={setting}/>;
            case "Palabras Ocultas":
                return <GameLetras setting={setting}/>;
            case "Flechas Congeladas": 
                return <GameFlechasCongeladas setting={setting}/>; 
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