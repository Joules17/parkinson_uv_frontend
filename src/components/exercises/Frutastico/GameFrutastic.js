import { Component } from "react";
import Phaser from "phaser";

// Escenas
import FrutasticInit from 'components/exercises/Frutastico/scenes/FrutasticInit'
import FrutasticMenu from 'components/exercises/Frutastico/scenes/FrutasticMenu'
import FrutasticLoby from 'components/exercises/Frutastico/scenes/FrutasticLoby'
import FrutasticRondas from 'components/exercises/Frutastico/scenes/FrutasticRondas'
import FrutasticEnd from 'components/exercises/Frutastico/scenes/FrutasticEnd'

//css
import 'components/exercises/Frutastico/styles.css'


class GameFrutastic extends Component {
  componentDidMount() {
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
      scene: [FrutasticInit, FrutasticMenu, FrutasticLoby, FrutasticRondas, FrutasticEnd],
    }

    this.game = new Phaser.Game(config);
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
    console.log(gameContainer)
  }

  handleLeaveFullScreen() {
    const gameContainer = document.getElementById('phaser-game-container');

    // Restablecer las dimensiones del contenedor
    gameContainer.style.width = `${this.game.config.width}px`;
    gameContainer.style.height = `${this.game.config.height}px`;
    console.log(gameContainer)
    this.game.scale.resize(this.game.config.width, this.game.config.height);
  }


  render() {
    return <div id="phaser-game-container" style = {{ height: '600px', width: '800px'}} />;
  }
}

export default GameFrutastic;
