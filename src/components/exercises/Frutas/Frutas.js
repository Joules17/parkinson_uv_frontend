// React
import  { useEffect, useRef, useState } from "react";

// phaser library
import Phaser from "phaser";

// phaser scenes
import FrutasInit from 'components/exercises/Frutas/scenes/FrutasInit'
import FrutasMenu from 'components/exercises/Frutas/scenes/FrutasMenu'

// ==============================|| FRUITS GAMES ||============================== //
const GameFruits = () => {
  const gameContainer = useRef(null);
  const [cargado, setCargado] = useState(false);
  const [cantGame, setCantGame] = useState(0);

  useEffect(() => {
    setCargado(true)
    console.log('its me again')
  }, []);

  useEffect(() => {
    console.log('acabe de agregar algo a phaser')
    if (cargado && cantGame === 0) {
      new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
          default: 'arcade',
          arcade: {
              debug: true,
          },
        },
        parent: gameContainer.current,
        scene: [FrutasInit, FrutasMenu],
      });
      setCantGame(cantGame+1);
    } else {
      console.log('No se crea')
    }
  }, [cargado, cantGame])

  if (cargado) {
    
    return (
      <div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}} ref={gameContainer} />
      </div>
      )
  } else {
    console.log('No ha cargado');
  }
};

export default GameFruits;