// react
import { useEffect } from 'react';

// prop
import PropTypes from 'prop-types';

// Phaser
import Phaser from 'phaser';

// others...
import { markGameAsPlayed } from 'store/reducers/gamesListSlice';
import { useDispatch } from 'react-redux';
import { useExternalApi as useLogsResponse } from 'hooks/logsResponse';
import { useExternalApi as useGameListResponse } from 'hooks/listGamesResponse'

import RememberInit from 'components/exercises/RememberAndFind/scenes/RememberInit';
import RememberMenu from 'components/exercises/RememberAndFind/scenes/RememberMenu';
import RememberLoby from 'components/exercises/RememberAndFind/scenes/RememberLoby';
import RememberRondas from 'components/exercises/RememberAndFind/scenes/RememberRondas';
import RememberEnd from 'components/exercises/RememberAndFind/scenes/RememberEnd';
import RememberFailed from 'components/exercises/RememberAndFind/scenes/RememberFailed';

// css
import 'components/exercises/general_assets/styles.css';

function GameRememberAndFind(props) {
    const { markGameListAsPlayed } = useGameListResponse()
    const dispatch = useDispatch();
    const { id, idSession, fromActivity, idList } = props;
    const { createLog } = useLogsResponse();
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
            scene: [RememberInit, RememberMenu, RememberLoby, RememberRondas, RememberEnd, RememberFailed]
        };

        const game = new Phaser.Game(config);
        game.scene.start('RememberInit', { setting }, { game });
        game.scale.on('enterfullscreen', handleEnterFullScreen);
        game.scale.on('leavefullscreen', handleLeaveFullScreen);
        game.events.on('dataToReactComponent', handleDataFromPhaser);

        return () => {
            game.events.off('dataToReactComponent', handleDataFromPhaser);
            game.scale.off('enterfullscreen', handleEnterFullScreen);
            game.scale.off('leavefullscreen', handleLeaveFullScreen);
            game.destroy(true);
        };

        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    const handleDataFromPhaser = (data) => {
        if (fromActivity) {
            const dataLog = {
                id_session: idSession,
                id_game_list: id,
                log: data
            };
            createLog(dataLog);
            console.log('Datos recibidos desde Phaser:', data);
            markGameListAsPlayed(idList,id)
            dispatch(markGameAsPlayed({ gameName: 'Recuerda y Encuentra' })); // Utiliza dispatch aquí
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

export default GameRememberAndFind;

GameRememberAndFind.propTypes = {
    id: PropTypes.number.isRequired,
    idSession: PropTypes.number.isRequired,
    setting: PropTypes.object.isRequired,
    fromActivity: PropTypes.bool.isRequired
};
