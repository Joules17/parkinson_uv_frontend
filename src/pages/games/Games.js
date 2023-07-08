// material-ui
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
import { Card, CardContent, CardMedia, Typography, Divider, Stack, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// project import
import MainCard from 'components/MainCard';

// ==============================|| GAMES PAGE ||============================== //
const cardsMemory = [
    {
        image: 'https://img.freepik.com/free-vector/directional-arrows-set-many-colors-shapes_1017-26863.jpg?w=360',
        title: 'Purple Domino',
        description: 'Descripción'
    },
    {
        image: 'https://i.imgur.com/OFtDruP_d.webp?maxwidth=760&fidelity=grand',
        title: 'Frutastico',
        description: 'Descripción'
    }
];

const cardsAtention = [
    {
        image: 'https://i.imgur.com/kH5I6T2_d.webp?maxwidth=760&fidelity=grand',
        title: 'Flechas Articas',
        description: 'Descripción'
    },
    {
        image: 'https://www.abc.com.py/resizer/6u4qUkJ3mI5HApG9SefulVR2iuA=/fit-in/770xorig/smart/filters:format(webp)/cloudfront-us-east-1.images.arcpublishing.com/abccolor/3HB7IYAJQREF5IGEQVZE24CY7E.jpg',
        title: 'Encuentra el número',
        description: 'Descripción'
    }
];

const cardsFunctions = [
    {
        image: 'https://i.imgur.com/CkG4TuB.png',
        title: 'Letra Aventura',
        description: 'Descripción'
    },
    {
        image: 'https://i.imgur.com/aKpxz47_d.webp?maxwidth=760&fidelity=grand',
        title: 'Frutas',
        description: 'Descripción'
    }
];
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
                <CardMedia
                    component="img"
                    height="150"
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

const Games = () => (
    <MainCard title="Juegos" darkTitle={true}>
        <Stack spacing={2}>
            <Typography variant="h5">Memoria</Typography>
            <Carousel responsive={responsive}>
                {cardsMemory.map((card, index) => (
                    <CardComponent key={index} card={card} />
                ))}
            </Carousel>
            <Divider />

            <Typography variant="h5">Atención</Typography>
            <Carousel responsive={responsive}>
                {cardsAtention.map((card, index) => (
                    <CardComponent key={index} card={card} />
                ))}
            </Carousel>
            <Divider />

            <Typography variant="h5">Funciones ejecutivas</Typography>
            <Carousel responsive={responsive}>
                {cardsFunctions.map((card, index) => (
                    <CardComponent key={index} card={card} />
                ))}
            </Carousel>
        </Stack>
    </MainCard>
);

export default Games;
