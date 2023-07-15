import { useState, useEffect } from 'react';

// material-ui
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
import { Card, CardContent, CardMedia, Typography, Divider, Stack, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// project import
import MainCard from 'components/MainCard';
import ChargingCard from 'components/ChargingCard';

// hooks
import { useExternalApi as useGameResponse } from 'hooks/gameResponse';

// ==============================|| GAMES PAGE ||============================== //

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

const CardComponent = ({ card }) => {
    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 230 }}>
            <CardActionArea onClick={() => navigate(`/run-game?game=${card.title}&description=${card.description}`)}>
                <CardMedia component="img" height="150" image={card.image} alt={card.title} />
                <CardContent>
                    <Typography variant="h5">{card.title}</Typography>
                    <Typography variant="body2">{card.description}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

function game_type_distribute(games, setAtention, setMemory, setLanguage, setFunctions) {
    let memory = [];
    let atention = [];
    let language = [];
    let functions = [];
    for (let i in games) {
        let dict = {
            image: games[i].game_picture,
            title: games[i].name,
            description: games[i].description
        };

        switch (games[i].type) {
            case 'Memoria':
                memory.push(dict);
                break;
            case 'Atencion':
                atention.push(dict);
                break;
            case 'Lenguaje':
                language.push(dict);
                break;
            case 'Ejecucion':
                functions.push(dict);
                break;
            default:
                break;
        }
    }
    setMemory(memory);
    setAtention(atention);
    setLanguage(language);
    setFunctions(functions);
}

const Games = () => {
    const { getGames } = useGameResponse();

    const [games, setGames] = useState(undefined);
    const [cardsMemory, setMemory] = useState(undefined);
    const [cardsAtention, setAtention] = useState(undefined);
    const [cardsLanguage, setLanguage] = useState(undefined);
    const [cardsFunctions, setFunctions] = useState(undefined);

    // Llamada a la API para traer los juegos
    useEffect(() => {
        getGames(setGames);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Distribución de los juegos por tipo
    useEffect(() => {
        game_type_distribute(games, setAtention, setMemory, setLanguage, setFunctions);
    }, [games]);

    if (
        games === undefined ||
        cardsMemory === undefined ||
        cardsAtention === undefined ||
        cardsLanguage === undefined ||
        cardsFunctions === undefined
    ) {
        return <ChargingCard />;
    } else {
        const cardList = [
            { title: 'Memoria', list: cardsMemory },
            { title: 'Atencion', list: cardsAtention },
            { title: 'Lenguaje', list: cardsLanguage },
            { title: 'Funciones ejecutivas', list: cardsFunctions }
        ];
        return (
            <MainCard title="Juegos" darkTitle={true}>
                <Stack spacing={2}>
                    {cardList.map((card) =>
                        card.list.length !== 0 ? (
                            <>
                                <Typography variant="h5">{card.title}</Typography>
                                <Carousel responsive={responsive}>
                                    {card.list.map((cardItem, index) => (
                                        <CardComponent key={index} card={cardItem} />
                                    ))}
                                </Carousel>
                                <Divider />
                            </>
                        ) : null
                    )}
                </Stack>
            </MainCard>
        );
    }
};

export default Games;
