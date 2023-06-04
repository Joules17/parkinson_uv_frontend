import { Component } from "react";
import Phaser from "phaser";

// Escenas

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
        scene: [ArticInit, ArticMenu, ArticGame, ArticOver],
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

export default GameArtic;
