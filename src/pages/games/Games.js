// material-ui
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
import { Card, CardContent, CardMedia, Typography, Divider, Stack } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// project import
import MainCard from 'components/MainCard';

// ==============================|| GAMES PAGE ||============================== //
const cards = [
    {
        image: 'https://img.freepik.com/free-vector/directional-arrows-set-many-colors-shapes_1017-26863.jpg?w=360',
        title: 'Flechas',
        description: 'Descripción'
    },
    {
        image: 'https://www.abc.com.py/resizer/6u4qUkJ3mI5HApG9SefulVR2iuA=/fit-in/770xorig/smart/filters:format(webp)/cloudfront-us-east-1.images.arcpublishing.com/abccolor/3HB7IYAJQREF5IGEQVZE24CY7E.jpg',
        title: 'Números',
        description: 'Descripción'
    },
    {
        image: 'https://source.unsplash.com/featured/?forests',
        title: 'Bosques',
        description: 'Los bosques son misteriosos y hermosos.'
    },
    {
        image: 'https://source.unsplash.com/featured/?forests',
        title: 'Bosques',
        description: 'Los bosques son misteriosos y hermosos.'
    },
    {
        image: 'https://source.unsplash.com/featured/?forests',
        title: 'Bosques',
        description: 'Los bosques son misteriosos y hermosos.'
    },
    {
        image: 'https://source.unsplash.com/featured/?forests',
        title: 'Bosques',
        description: 'Los bosques son misteriosos y hermosos.'
    },
    {
        image: 'https://source.unsplash.com/featured/?forests',
        title: 'Bosques',
        description: 'Los bosques son misteriosos y hermosos.'
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

const renderCard = (card, index) => {
    return (
        <Card key={index} sx={{ maxWidth: 230 }}>
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
        </Card>
    );
};

const Games = () => (
    <MainCard title="Juegos" darkTitle="true">
        <Stack spacing={2}>


            <Typography variant="h5">Memoria</Typography>
            <Carousel responsive={responsive}>
                {cards.map((card, index) => renderCard(card, index))}
            </Carousel>

            <Divider />

            <Typography variant="h5">Atención</Typography>
            <Carousel responsive={responsive}>
                {cards.map((card, index) => renderCard(card, index))}
            </Carousel>

            <Divider />

            <Typography variant="h5">Habilidades visoconstructivas</Typography>
            <Carousel responsive={responsive}>
                {cards.map((card, index) => renderCard(card, index))}
            </Carousel>

            <Divider />

            <Typography variant="h5">Funciones ejecutivas</Typography>
            <Carousel responsive={responsive}>
                {cards.map((card, index) => renderCard(card, index))}
            </Carousel>
        </Stack>
    </MainCard>

);

export default Games;