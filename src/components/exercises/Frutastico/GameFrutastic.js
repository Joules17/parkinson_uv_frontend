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
    const { settings } = this.props;
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
        scene: [FrutasticInit, FrutasticMenu, FrutasticLoby, FrutasticRondas, FrutasticEnd],
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

export default GameFrutastic;
