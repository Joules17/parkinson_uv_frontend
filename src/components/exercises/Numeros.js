// React
import  { useEffect, useRef } from "react";

// phaser library
import Phaser from "phaser";

// phaser scenes
import NumerosMain from 'components/exercises/scenes/NumerosMain'

// ==============================|| SAMPLE PAGE ||============================== //
const GameNumbers = () => {
  const gameContainer = useRef(null);

  useEffect(() => {
    new Phaser.Game({
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameContainer.current,
      scene: [NumerosMain],
    });
  }, []);

  return <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}} ref={gameContainer} />;
};

export default GameNumbers;