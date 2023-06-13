import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Card, CardContent, CardMedia, Typography, Divider, Stack, Box } from '@mui/material';
import Carousel from 'react-multi-carousel';
import { lista_juegos } from 'pages/library/components/globals';
import 'react-multi-carousel/lib/styles.css';

// project import
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GameFruits from 'components/exercises/Frutas/GameFruits'
import GameNumbers from 'components/exercises/Numbers/GameNumbers';

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
        setGames(gameListState.gamesList.juegos)
    }, [gameListState]);

    useEffect(() => {
        setStartGame(games[0])
    }, [games]);

    const cards = lista_juegos[0].juegos.map((juego) => ({
        image: juego.urlImage,
        title: juego.name,
        description: juego.dominio
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

    const renderCard = (card, index) => {
        return (
            <Card key={index} sx={{ maxWidth: 230 }}>
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
            </Card>
        );
    };

    // useEffect(() => {
    //     const firstUnplayedGame = lista_juegos[0].juegos.find(
    //         (juego) => !juego.played
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
                
                {startGame?.name == "Frutas" && (<GameFruits />)} : 
                {startGame?.name == "Numeros" && (<GameNumbers />)}
            </Stack>
        </MainCard>
    )

};

export default RunListGames;