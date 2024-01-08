import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';

// project import
import MainCard from 'components/MainCard';
// import { useSelector } from 'react-redux';
import ObjectIntruder from 'components/exercises/ObjectIntruder/GameObjectIntruder'
import GameNumbers from 'components/exercises/Numbers/GameNumbers';
import GameArtic from 'components/exercises/ArticRows/GameArtic';
import GameFlechasCongeladas from 'components/exercises/FlechasCongeladas/GameFlechasCongeladas';
import GameRememberAndFind from 'components/exercises/RememberAndFind/GameRemember';
import LettersVsNumbers from 'components/exercises/DominoGame/GameLetterVsNumbers'
import GameLetras from 'components/exercises/LetraAventura/GameLetras';
import GameLetrasMarinas from 'components/exercises/LetrasMarinas/GameLetrasMarinas';
import GameMemoryBubbles from 'components/exercises/MemoryBubbles/GameMemoryBubbles';
import GameCatchMouse from 'components/exercises/AtrapaRaton/GameCatchMouse';
import GameFotografias from 'components/exercises/FotografiasMisteriosas/GameFotografias'; 
import GameCuadrilla from 'components/exercises/CuadrillaLetras/GameCuadrillaLetras'; 
import GameTe from 'components/exercises/Te/GameTe';
import GameBubbleParty from 'components/exercises/BubbleParty/GameBubbleParty';

// ==============================|| GAMES PAGE ||============================== //

const RunGame = () => {
    const location = useLocation();
    
    const queryParams = new URLSearchParams(location.search);
    const game = queryParams.get('game');
    const description = queryParams.get('description'); 
    // const gameListState = useSelector((state) => state.gamesList);

    const setting = location.state
    // console.log(setting)

    const renderGame = () => {
        switch (game) {
            case "Objeto Intruso":
                return <ObjectIntruder setting={setting} fromActivity={false} />;
            case "Encuentra el número":
                return <GameNumbers setting={setting} fromActivity={false}/>;
            case "Flechas Articas":
                return <GameArtic setting={setting} fromActivity={false}/>;
            case "Recuerda y Encuentra":
                return <GameRememberAndFind setting={setting} fromActivity={false}/>;
            case "Letras VS Numeros":
                return <LettersVsNumbers setting={setting} fromActivity={false}/>;
            case "Palabras Ocultas":
                return <GameLetras setting={setting} fromActivity={false}/>;
            case "Flechas Congeladas": 
                return <GameFlechasCongeladas setting={setting} fromActivity={false}/>; 
            case "Letras Marinas": 
                return <GameLetrasMarinas setting={setting} fromActivity={false}/>;
            case "Burbujas de Memoria":
                return <GameMemoryBubbles setting={setting} fromActivity={false}/>;
            case "Atrapa el ratón":
                return <GameCatchMouse setting={setting} fromActivity={false}/>
            case "Fotografias Misteriosas":
                return <GameFotografias setting={setting} fromActivity={false}/>;
            case "Cuadrilla de Letras y Numeros":
                return <GameCuadrilla setting={setting} fromActivity={false}/>;    
            case "La hora del té": 
                return <GameTe setting={setting} fromActivity={false}/>;
            case "Fiesta de Burbujas": 
                return <GameBubbleParty setting={setting} fromActivity={false}/>;
            default:
                return null;
        }
    };

    return (
        <div style = {{ flex: 1 }}>
            <MainCard title={game} darkTitle={true}>
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