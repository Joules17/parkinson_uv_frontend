import { useEffect } from 'react';

// prop
import PropTypes from 'prop-types';

// phaser
import Phaser from 'phaser';
import { markGameAsPlayed } from 'store/reducers/gamesListSlice';

// scenes
import CuadrillaInit from 'components/exercises/CuadrillaLetras/scenes/CuadrillaInit';
import CuadrillaMenu from 'components/exercises/CuadrillaLetras/scenes/CuadrillaMenu';
import CuadrillaTuto from 'components/exercises/CuadrillaLetras/scenes/CuadrillaTuto';
import CuadrillaMain from 'components/exercises/CuadrillaLetras/scenes/CuadrillaMain'; 
import CuadrillaEndGame from 'components/exercises/CuadrillaLetras/scenes/CuadrillaEndGame';
import CuadrillaFailed from 'components/exercises/CuadrillaLetras/scenes/CuadrillaFailed';

import { useDispatch } from 'react-redux';
import { useExternalApi as useLogsResponse } from 'hooks/logsResponse';
import { useExternalApi as useGameListResponse } from 'hooks/listGamesResponse'

// css
import 'components/exercises/general_assets/styles.css';

function CuadrillaGame(props) {
    const dispatch = useDispatch();
    const { id, idSession, fromActivity, idList } = props;
    const { createLog } = useLogsResponse();
    const { markGameListAsPlayed } = useGameListResponse()

    useEffect(() => {
        const { setting } = props;

        const config = {
            type: Phaser.AUTO,
            parent: 'phaser-game-container',
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },

            scene: [CuadrillaInit, CuadrillaMenu, CuadrillaTuto, CuadrillaMain, CuadrillaFailed, CuadrillaEndGame]
        };

        const game = new Phaser.Game(config);
        game.scene.start('CuadrillaInit', { setting }, { game });
        game.scale.on('enterfullscreen', handleEnterFullScreen);
        game.scale.on('leavefullscreen', handleLeaveFullScreen);
        game.events.on('dataToReactComponent', handleDataFromPhaser);

        return () => {
            game.events.off('dataToReactComponent', handleDataFromPhaser);
            game.scale.off('enterfullscreen', handleEnterFullScreen);
            game.scale.off('leavefullscreen', handleLeaveFullScreen);
            game.destroy(true);
        };
        // eslint-disable-next-line
    }, []);

    const handleDataFromPhaser = (data) => {
        if (fromActivity) {
            const dataLog = {
                id_session: idSession,
                id_game_list: id,
                log: data
            };
            createLog(dataLog);
            markGameListAsPlayed(idList,id)
            console.log('Datos recibidos desde Phaser:', data);
            dispatch(markGameAsPlayed({ gameName: 'Cuadrilla de Letras y Numeros' })); // Utiliza dispatch aquí
        }
    };

    const handleEnterFullScreen = () => {
        const gameContainer = document.getElementById('phaser-game-container');
        gameContainer.style.width = window.innerWidth + 'px';
        gameContainer.style.height = window.innerHeight + 'px';
        gameContainer.style.justifyContent = 'center';
        gameContainer.style.alignItems = 'center';
        console.log(gameContainer);
    };

    const handleLeaveFullScreen = () => {
        const gameContainer = document.getElementById('phaser-game-container');
        gameContainer.style.width = '800px';
        gameContainer.style.height = '600px';
        console.log(gameContainer);
    };

    return <div id="phaser-game-container" className="game-container" style={{ height: '600px', width: '800px' }} />;
}


export default CuadrillaGame;

CuadrillaGame.propTypes = {
    setting: PropTypes.object.isRequired,
    id: PropTypes.number,
    idSession: PropTypes.number,
    fromActivity: PropTypes.bool
};
