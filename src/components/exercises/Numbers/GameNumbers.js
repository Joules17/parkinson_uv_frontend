import React, { Component } from "react";
import Phaser from "phaser";

// Escenas
import NumbersInit from 'components/exercises/Numbers/scenes/NumbersInit'
import NumbersMenu from 'components/exercises/Numbers/scenes/NumbersMenu'
import NumbersLoby from 'components/exercises/Numbers/scenes/NumbersLoby'
import rondas from 'components/exercises/Numbers/scenes/rondas'

//css
import 'components/exercises/Frutas/styles.css'

class GameNumbers extends Component {
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
        scene: [NumbersInit, NumbersMenu, NumbersLoby, rondas],
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

export default GameNumbers;
