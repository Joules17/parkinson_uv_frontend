import { Component } from "react";

// phaser 
import Phaser from "phaser";

// Escenas
import LetrasInit from 'components/exercises/LetraAventura/scenes/LetrasInit';
import LetrasMenu from 'components/exercises/LetraAventura/scenes/LetrasMenu';
import LetrasTuto from 'components/exercises/LetraAventura/scenes/LetrasTuto';
import LetrasGame from 'components/exercises/LetraAventura/scenes/LetrasGame';
import LetrasOver from 'components/exercises/LetraAventura/scenes/LetrasOver';

//css
import 'components/exercises/general_assets/styles.css'

class GameLetras extends Component {
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
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: [LetrasInit, LetrasMenu, LetrasTuto, LetrasGame, LetrasOver],
    }

    this.game = new Phaser.Game(config);
    // console.log('ESTA ES LA FORMA EN LA QUE SE INICIA SETTINGS = ', {setting})
    console.log('SE ESTA ENVIANDO', {setting})
    this.game.scene.start('LetrasInit', {setting});
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
    return <div id="phaser-game-container" style={{ height: '600px', width: '800px' }} />;
  }
}

export default GameLetras;