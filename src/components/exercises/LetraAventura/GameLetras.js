import { Component } from "react";
import Phaser from "phaser";

// Escenas
import LetrasInit from 'components/exercises/LetraAventura/scenes/LetrasInit';
import LetrasMenu from 'components/exercises/LetraAventura/scenes/LetrasMenu';
import LetrasTuto from 'components/exercises/LetraAventura/scenes/LetrasTuto';
import LetrasGame from 'components/exercises/LetraAventura/scenes/LetrasGame'; 
import LetrasOver from 'components/exercises/LetraAventura/scenes/LetrasOver'; 
//css
import 'components/exercises/LetraAventura/styles.css'

class GameLetras extends Component {
  componentDidMount() {
    const config = {
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
          autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
        },
        scene: [LetrasInit, LetrasMenu, LetrasTuto, LetrasGame, LetrasOver],
  }

  this.game = new Phaser.Game(config);
  }
  
  componentWillUnmount() {
    // destruir el juego al desmontar el componente
    this.game.destroy(true);
  }

  render() {
    return (
      <div id="phaser-game-container" />
    );
  }
}

export default GameLetras;
