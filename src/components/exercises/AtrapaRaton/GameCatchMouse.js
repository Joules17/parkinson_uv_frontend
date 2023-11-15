// react
import { Component } from 'react';
import React, { useEffect } from "react";
// phaser
import Phaser from 'phaser';
import { markGameAsPlayed } from 'store/reducers/gamesListSlice';

// Escenas
import CatchMouseInit from './scenes/CatchMouseInit';
import CatchMouseMenu from './scenes/CatchMouseMenu';
import FlechasGame from 'components/exercises/FlechasCongeladas/scenes/FlechasGame';
import FlechasFin from 'components/exercises/FlechasCongeladas/scenes/FlechasFin';
import FlechasTuto from 'components/exercises/FlechasCongeladas/scenes/FlechasTuto';
import { useDispatch } from 'react-redux';
import { useExternalApi as useLogsResponse } from 'hooks/logsResponse';

// Styles
import 'components/exercises/general_assets/styles.css'

function GameCatchMouse(props) {
    const dispatch = useDispatch();
    const { id, idSession, fromActivity } = props;
    const { createLog } = useLogsResponse()
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
                    debug: false,
                },
            },
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            scene: [CatchMouseInit, CatchMouseMenu],
        }

        const game = new Phaser.Game(config);
        game.scene.start('CatchMouseInit', { setting }, { game });
        game.scale.on('enterfullscreen', handleEnterFullScreen);
        game.scale.on('leavefullscreen', handleLeaveFullScreen);
        game.events.on('dataToReactComponent', handleDataFromPhaser);

        return () => {
            game.events.off('dataToReactComponent', handleDataFromPhaser);
            game.scale.off('enterfullscreen', handleEnterFullScreen);
            game.scale.off('leavefullscreen', handleLeaveFullScreen);
            game.destroy(true);
        };

    }, []);

    const handleDataFromPhaser = (data) => {
        if (fromActivity) {
            const dataLog = {
                id_session: idSession,
                id_game_list: id,
                log: data
            }
            createLog(dataLog)
            console.log('Datos recibidos desde Phaser:', data);
            dispatch(markGameAsPlayed({ gameName: "Atrapa el ratón" })); // Utiliza dispatch aquí
        }
    }

    const handleEnterFullScreen = () => {
        const gameContainer = document.getElementById('phaser-game-container');
        gameContainer.style.width = window.innerWidth + 'px';
        gameContainer.style.height = window.innerHeight + 'px';
        gameContainer.style.justifyContent = 'center';
        gameContainer.style.alignItems = 'center';
        console.log(gameContainer);
    }

    const handleLeaveFullScreen = () => {
        const gameContainer = document.getElementById('phaser-game-container');
        gameContainer.style.width = '800px';
        gameContainer.style.height = '600px';
        console.log(gameContainer);
    }

    return <div id="phaser-game-container" className="game-container" style={{ height: '600px', width: '800px' }} />;
}

export default GameCatchMouse; 