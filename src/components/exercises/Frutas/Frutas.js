// React
import  { useEffect, useRef, useState } from "react";

// phaser library
import Phaser from "phaser";

// phaser scenes
import FrutasInit from 'components/exercises/Frutas/scenes/FrutasInit'
import FrutasMenu from 'components/exercises/Frutas/scenes/FrutasMenu'
import FrutasLoby from 'components/exercises/Frutas/scenes/FrutasLoby'
import rondas from 'components/exercises/Frutas/scenes/rondas'

// ==============================|| FRUITS GAMES ||============================== //
const GameFruits = () => {
  const gameContainer = useRef(null);
  const [cargado, setCargado] = useState(false);
  const [cantGame, setCantGame] = useState(0);

  useEffect(() => {
    setCargado(true)
    // console.log('its me again')
  }, []);

  useEffect(() => {
    // console.log('acabe de agregar algo a phaser')
    if (cargado && cantGame === 0) {
      new Phaser.Game({
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
        scene: [FrutasInit, FrutasMenu, FrutasLoby, rondas],
      });
      setCantGame(cantGame+1);
    }
  }, [cantGame, cargado])

  if (cargado) {
    return (
      <div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}} ref={gameContainer} />
      </div>
      )
  } 
};

export default GameFruits;