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
        const { setting } = this.props;
        const config = {
            type: Phaser.AUTO,
            parent: 'phaser-game-container',
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            scene: [DominoInit, DominoMenu, DominoTutorial, DominoGame, DominoEndGame]
        };

        this.game = new Phaser.Game(config);
        this.game.scene.start('DominoInit', {setting});
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

export default Domino;