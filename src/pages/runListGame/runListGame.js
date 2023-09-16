import { Card, CardContent, CardMedia, Typography, Stack, CardActionArea } from '@mui/material';
import Carousel from 'react-multi-carousel';
import { lista_juegos } from 'pages/library/components/globals';
import 'react-multi-carousel/lib/styles.css';

// project import
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ObjectIntruder from 'components/exercises/ObjectIntruder/GameObjectIntruder'
import GameNumbers from 'components/exercises/Numbers/GameNumbers';
import GameArtic from 'components/exercises/ArticRows/GameArtic';
import GameRememberAndFind from 'components/exercises/RememberAndFind/GameRemember';
import LettersVsNumbers from 'components/exercises/DominoGame/GameLetterVsNumbers'
import GameLetras from 'components/exercises/LetraAventura/GameLetras';

// ==============================|| GAMES PAGE ||============================== //

const RunListGames = () => {
    const gameListState = useSelector((state) => state.gamesList);
    const [games, setGames] = useState({})
    const [startGame, setStartGame] = useState({})
    const [cargado, setCargado] = useState(false);

    useEffect(() => {
        setCargado(true);
    }, []);

    useEffect(() => {
        setGames(gameListState.gamesList.games)
    }, [gameListState]);

    // useEffect(() => {
    //     setStartGame(games[0])

    // }, [games]);
    const cards = gameListState?.gamesList.games.map((game) => ({
        image: game.game_picture,
        title: game.name,
        description: game.dominio,
        setting: game.setting
    }));
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 1024 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 1024, min: 800 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    const renderGame = () => {
        console.log(startGame.title)
        switch (startGame.title) {
            case "Objeto Intruso":
                return <ObjectIntruder setting={startGame.setting}/>;
            case "Encuentra el número":
                return <GameNumbers setting={startGame.setting}/>;
            case "Flechas Articas":
                return <GameArtic setting={startGame.setting}/>;
            case "Recuerda y Encuentra":
                return <GameRememberAndFind setting={startGame.setting}/>;
            case "Letras VS Numeros":
                return <LettersVsNumbers setting={startGame.setting}/>;
            case "Letra Aventura":
                return <GameLetras setting={startGame.setting}/>;
            default:
                return null;
        }
    };


    const renderCard = (card, index) => {
        return (
            <Card key={index} sx={{ maxWidth: 230 }}>
                <CardActionArea onClick={() => setStartGame({title: card.title, setting: card.setting})}>
                    <CardMedia
                        component="img"
                        height="90"
                        image={card.image}
                        alt={card.title}
                    />
                    <CardContent>
                        <Typography variant="h5">{card.title}</Typography>
                        <Typography variant="body2">{card.description}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    };

    // useEffect(() => {
    //     const firstUnplayedGame = lista_juegos[0].games.find(
    //         (game) => !game.played
    //     );

    //     if (firstUnplayedGame) {
    //         setStartGame(firstUnplayedGame.name);
    //     }
    // }, []);


    return (
        <MainCard title={lista_juegos[0].name} darkTitle>
            <Stack spacing={2}>
                <Carousel responsive={responsive}>
                    {cards.map((card, index) => renderCard(card, index))}
                </Carousel>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {renderGame()}
                </div>
            </Stack>
        </MainCard>
    )

};

export default RunListGames;