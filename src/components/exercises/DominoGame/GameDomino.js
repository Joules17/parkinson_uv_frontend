import { Component } from 'react'; 
import Phaser from 'phaser';

// scenes
import DominoInit from 'components/exercises/DominoGame/scenes/DominoInit'; 
import DominoMenu from 'components/exercises/DominoGame/scenes/DominoMenu';
import DominoGame from 'components/exercises/DominoGame/scenes/DominoGame'; 
import DominoTutorial from 'components/exercises/DominoGame/scenes/DominoTutorial';
import DominoEndGame from 'components/exercises/DominoGame/scenes/DominoEndGame';

// css
import 'components/exercises/DominoGame/styles.css'

class Domino extends Component {
    componentDidMount() {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
            scale: {
                mode: Phaser.Scale.NONE,
                autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
            }, 
            scene: [DominoInit, DominoMenu, DominoTutorial, DominoGame, DominoEndGame]
        }; 

        this.game = new Phaser.Game(config);
    }

    componentWillUnmount() {
        // destruir el juego al desmontar el componente
        this.game.destroy(true);
    }

    render () {
        return <div id="phaser-game-container" />;
    }   
}

export default Domino;