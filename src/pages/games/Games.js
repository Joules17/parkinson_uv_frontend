import { useState, useEffect } from 'react';

// prop
import PropTypes from 'prop-types';

// material-ui
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
import { Card, CardContent, CardMedia, Typography, Divider, Stack, CardActionArea, Dialog, DialogContent, DialogTitle, DialogActions, Button, IconButton} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// project import
import MainCard from 'components/MainCard';
import ChargingCard from 'components/ChargingCard';
import ViewGameForm from './ViewGameForm';

// icons 
import { EditOutlined } from '@ant-design/icons';

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
    // ----------------------------|| MODAL - DIALOG FORM ||---------------------------- //
    const [open, setOpen] = useState(false); 

    const handleOpenDialog = () => {
        setOpen(true); 
    }; 

    const handleCloseDialog = () => {   
        setOpen(false); 
    }; 

    const handleFormSubmit = (config) => {
        const settings = {}
        // general rounds 
        settings['rondas'] = config.rondas;
        settings['tries'] = config.tries;  
        

        // only letter soup games: 
        if (card.title === 'Letras Marinas') {
            settings['wordsperlevel'] = config.wordsperlevel; 
        }
        
        // only levels games: 
        if (card.title === 'Recuerda y Encuentra' || card.title === 'Letras Marinas') {
            settings['niveles'] = config.niveles; 
        } 

        // only categories games: 
        if (card.title === 'Objeto Intruso' || card.title === 'Recuerda y Encuentra' || card.title === 'Letras Marinas') {
            settings['categorias'] = config.categorias;
        }

        // only word length games:
        if (card.title === 'Palabras Ocultas') {
            settings['longitudMinPalabra'] = config.longitudMinPalabra; 
            settings['longitudPalabra'] = config.longitudPalabra; 
        }

        // only Artic Arrow game: 
        if (card.title === 'Flechas Articas') {
            settings['rondasFirst'] = config.rondasFirstArrow; 
            settings['rondasSecond'] = config.rondasSecondArrow;
        }

        console.log('Se envia las siguientes settings: ', settings)
        navigate(`/run-game?game=${card.title}&description=${card.description}`, {
            state: settings
        }); 
        setOpen(false); 
    }; 

    // ------------------------------------------------------------------------------------
    return (
        <>
        <Card sx={{ maxWidth: 230 }}>
            <CardActionArea onClick={handleOpenDialog}>
                <CardMedia component="img" height="150" image={card.image} alt={card.title} />
                <CardContent>
                    <Typography variant="h5">{card.title}</Typography>
                    <Typography variant="body2">{card.description}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle sx = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography fontWeight="bold" variant="1.25rem">
                    Configuracion - {card.title}
                </Typography>       
                <IconButton edge='end' color='inherit'>
                    <EditOutlined />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <ViewGameForm card = {card} handleCloseDialog = {handleCloseDialog} handleFormSubmit = {handleFormSubmit}/>   
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    Cerrar
                </Button>
            </DialogActions>

        </Dialog>
        </>
        
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
                            <div key= {card.title}>
                                <Typography variant="h5">{card.title}</Typography>
                                <Carousel responsive={responsive}>
                                    {card.list.map((cardItem, index) => (
                                        <CardComponent key={index} card={cardItem} />
                                    ))}
                                </Carousel>
                                <Divider />
                            </div>
                        ) : null
                    )}
                </Stack>
            </MainCard>
        );
    }
};

export default Games;

CardComponent.propTypes = {
    card: PropTypes.object.isRequired, 
}