import { Card, CardContent, CardMedia, Typography, Stack, CardActionArea } from '@mui/material';
import Carousel from 'react-multi-carousel';
import { lista_juegos } from 'pages/library/components/globals';
import 'react-multi-carousel/lib/styles.css';
import { useExternalApi as useSessionResponse } from 'hooks/sessionResponse';

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
import GameLetrasMarinas from 'components/exercises/LetrasMarinas/GameLetrasMarinas';
import GameMemoryBubbles from 'components/exercises/MemoryBubbles/GameMemoryBubbles';

// ==============================|| GAMES PAGE ||============================== //

const RunListGames = () => {
    const gameListState = useSelector((state) => state.gamesList);
    const { getIdSession } = useSessionResponse()
    const [idSession, setIdSession] = useState()
    const [startGame, setStartGame] = useState({})
    const [cargado, setCargado] = useState(false);

    useEffect(() => {
        if (gameListState) {
            fetchIdSession();
        }
        setCargado(true);
    }, []);

    const fetchIdSession = async () => {
        const idSessionValue = await getIdSession(gameListState?.gamesList.id_activity, gameListState?.gamesList.id_patient);
        setIdSession(idSessionValue);
    }

    const cards = gameListState?.gamesList.games.map((game) => ({
        image: game.game_picture,
        title: game.name,
        description: game.dominio,
        setting: game.setting,
        active: game.is_played,
        id: game.id_game_list,
    }));

    console.log(gameListState)
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
        switch (startGame.title) {
            case "Objeto Intruso":
                return <ObjectIntruder setting={startGame.setting} id={startGame.id} idSession={idSession.session_id} fromActivity={true} />;
            case "Encuentra el número":
                return <GameNumbers setting={startGame.setting} id={startGame.id} idSession={idSession.session_id} fromActivity={true} />;
            case "Flechas Articas":
                return <GameArtic setting={startGame.setting} id={startGame.id} idSession={idSession.session_id} fromActivity={true} />;
            case "Recuerda y Encuentra":
                return <GameRememberAndFind setting={startGame.setting} id={startGame.id} idSession={idSession.session_id} fromActivity={true} />;
            case "Letras VS Numeros":
                return <LettersVsNumbers setting={startGame.setting} id={startGame.id} idSession={idSession.session_id} fromActivity={true} />;
            case "Palabras Ocultas":
                return <GameLetras setting={startGame.setting} id={startGame.id} idSession={idSession.session_id} fromActivity={true} />;
            case "Flechas Congeladas":
                return <GameFlechasCongeladas setting={startGame.setting} id={startGame.id} idSession={idSession.session_id} fromActivity={true} />;
            case "Letras Marinas":
                return <GameLetrasMarinas setting={startGame.setting} id={startGame.id} idSession={idSession.session_id} fromActivity={true} />;
            case "Burbujas de Memoria":
                return <GameMemoryBubbles setting={startGame.setting} id={startGame.id} idSession={idSession.session_id} fromActivity={true} />;
            default:
                return null;
        }
    };


    const renderCard = (card, index) => {
        return (
            <div style={card.active ? { pointerEvents: 'none' } : {}}>
                <Card key={index} sx={{ maxWidth: 230 }} style={card.active ? { backgroundColor: '#f5f5f5' } : {}}>
                    <CardActionArea onClick={() => setStartGame({ title: card.title, setting: card.setting, id: card.id })}>
                        <CardMedia
                            component="img"
                            height="90"
                            image={card.image}
                            alt={card.title}
                            style={card.active ? { filter: 'grayscale(100%)' } : {}}
                        />
                        <CardContent>
                            <Typography variant="h5">{card.title}</Typography>
                            <Typography variant="body2">{card.description}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>

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
        <MainCard title={lista_juegos[0].name} darkTitle={true}>
            <Stack spacing={2}>
                <Carousel responsive={responsive}>
                    {cards.map((card, index) => renderCard(card, index))}
                </Carousel>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {idSession.session_id !== undefined ? renderGame() : "Cargando..."}
                </div>
            </Stack>
        </MainCard>
    )

};

export default RunListGames;