import React, { useEffect } from "react";
import Phaser from "phaser";
import { markGameAsPlayed } from 'store/reducers/gamesListSlice';
import { useDispatch } from 'react-redux';

import RememberInit from 'components/exercises/RememberAndFind/scenes/RememberInit'
import RememberMenu from 'components/exercises/RememberAndFind/scenes/RememberMenu'
import RememberLoby from 'components/exercises/RememberAndFind/scenes/RememberLoby'
import RememberRondas from 'components/exercises/RememberAndFind/scenes/RememberRondas'
import RememberEnd from 'components/exercises/RememberAndFind/scenes/RememberEnd'

import 'components/exercises/general_assets/styles.css'

function GameRememberAndFind(props) {
  const dispatch = useDispatch(); 
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
      scene: [RememberInit, RememberMenu, RememberLoby, RememberRondas, RememberEnd],
    }

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

  }, []);

  const handleDataFromPhaser = (data) => {
    console.log('Datos recibidos desde Phaser:', data);
    dispatch(markGameAsPlayed({ gameName: "Recuerda y Encuentra" })); // Utiliza dispatch aquí
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

  return <div id="phaser-game-container" style={{ height: '600px', width: '800px' }} />;
}

export default GameRememberAndFind;
