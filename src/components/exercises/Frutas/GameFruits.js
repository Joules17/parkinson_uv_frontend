import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";

import FrutasInit from 'components/exercises/Frutas/scenes/FrutasInit'
import FrutasMenu from 'components/exercises/Frutas/scenes/FrutasMenu'
import FrutasLoby from 'components/exercises/Frutas/scenes/FrutasLoby'
import rondas from 'components/exercises/Frutas/scenes/rondas'

const GameFruits = () => {
  const gameContainer = useRef(null);
  const [cargado, setCargado] = useState(false);
  const [cantGame, setCantGame] = useState(0);

  useEffect(() => {
    if (!cargado) {
      const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
          default: 'arcade',
          arcade: {
            debug: false,
          },
        },
        scale: {
          mode: Phaser.Scale.NONE,
          autoCenter: Phaser.Scale.NO_CENTER,
        },
        parent: gameContainer.current,
        scene: [FrutasInit, FrutasMenu , FrutasLoby, rondas],
      });
      setCargado(true);
      setCantGame(1);
    }
  }, [cargado]);

  useEffect(() => {
    // console.log('acabe de agregar algo a phaser')
    if (cargado && cantGame === 1) {
      // no hagas nada aquí, solo actualiza cantGame
      setCantGame(2);
    }
  }, [cantGame, cargado]);

  if (cargado) {
    return (
      <div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}} ref={gameContainer} />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default GameFruits;
