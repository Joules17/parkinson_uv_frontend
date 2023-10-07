// Phaser 
import { Component } from "react";
import Phaser from "phaser";

// Escenas
import LetrasMarinasInit from 'components/exercises/LetrasMarinas/scenes/LetrasMarinasInit'; 
import LetrasMarinasMenu from 'components/exercises/LetrasMarinas/scenes/LetrasMarinasMenu'; 
import LetrasMarinasGame from 'components/exercises/LetrasMarinas/scenes/LetrasMarinasGame'; 
import LetrasMarinasEnd from 'components/exercises/LetrasMarinas/scenes/LetrasMarinasEnd'; 
//css
import 'components/exercises/general_assets/styles.css'

class GameLetrasMarinas extends Component {
  componentDidMount() {
    /* eslint-disable */
    const { setting } = this.props;
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
        autoCenter: Phaser.Scale.CENTER_BOTH // Centrado vertical y horizonta
      },
      scene: [LetrasMarinasInit, LetrasMarinasMenu, LetrasMarinasGame, LetrasMarinasEnd],
    }

    this.game = new Phaser.Game(config);
    this.game.scene.start('LetrasMarinasInit', {setting});
    this.game.scale.on('enterfullscreen', this.handleEnterFullScreen, this);
    this.game.scale.on('leavefullscreen', this.handleLeaveFullScreen, this);

  }

  componentWillUnmount() {
    this.game.scale.off('enterfullscreen', this.handleEnterFullScreen, this);
    this.game.scale.off('leavefullscreen', this.handleLeaveFullScreen, this);
    this.game.destroy(true);
  }

  handleEnterFullScreen() {
    const gameContainer = document.getElementById('phaser-game-container');
    gameContainer.style.width = window.innerWidth + 'px';
    gameContainer.style.height = window.innerHeight + 'px';
    gameContainer.style.justifyContent = 'center';
    gameContainer.style.alignItems = 'center';
  }

  handleLeaveFullScreen() {
    const gameContainer = document.getElementById('phaser-game-container');

    // Restablecer las dimensiones del contenedor
    gameContainer.style.width = `${this.game.config.width}px`;
    gameContainer.style.height = `${this.game.config.height}px`;
    this.game.scale.resize(this.game.config.width, this.game.config.height);
  }


  render() {
    return <div id="phaser-game-container" style = {{ height: '600px', width: '800px'}} />;
  }
}

export default GameLetrasMarinas;
