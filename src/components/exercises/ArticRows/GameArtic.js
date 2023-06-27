import { Component } from "react";
import Phaser from "phaser";

// Escenas
import ArticInit from 'components/exercises/ArticRows/scenes/ArticInit'
import ArticMenu from 'components/exercises/ArticRows/scenes/ArticMenu'
import ArticTuto from 'components/exercises/ArticRows/scenes/ArticTuto'
import ArticGame from 'components/exercises/ArticRows/scenes/ArticGame'
import ArticOver from 'components/exercises/ArticRows/scenes/ArticOver'
//css
import 'components/exercises/ArticRows/styles.css'

class GameArtic extends Component {
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
        scene: [ArticInit, ArticMenu, ArticTuto, ArticGame, ArticOver],
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
