import React, { Component } from "react";
import Phaser from "phaser";

// Escenas
import FrutasInit from 'components/exercises/Frutas/scenes/FrutasInit'
import FrutasMenu from 'components/exercises/Frutas/scenes/FrutasMenu'
import FrutasLoby from 'components/exercises/Frutas/scenes/FrutasLoby'
import rondas from 'components/exercises/Frutas/scenes/rondas'

//css
import 'components/exercises/Frutas/styles.css'

class GameFruits extends Component {
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
        scene: [FrutasInit, FrutasMenu , FrutasLoby, rondas],
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

export default GameFruits;
