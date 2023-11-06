import { Component } from 'react';

// prop
import PropTypes from 'prop-types';

// phaser
import Phaser from 'phaser';

// Escenas
import NumbersInit from 'components/exercises/Numbers/scenes/NumbersInit';
import NumbersMenu from 'components/exercises/Numbers/scenes/NumbersMenu';
import NumbersLoby from 'components/exercises/Numbers/scenes/NumbersLoby';
import rondas from 'components/exercises/Numbers/scenes/rondas';

//css
import 'components/exercises/general_assets/styles.css';

class GameNumbers extends Component {
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
            scene: [NumbersInit, NumbersMenu, NumbersLoby, rondas]
        };

        this.game = new Phaser.Game(config);
        this.game.scene.start('NumbersInit', { setting });
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
        console.log(gameContainer);
        this.game.scale.resize(this.game.config.width, this.game.config.height);
    }

    render() {
        return <div id="phaser-game-container" style={{ height: '600px', width: '800px' }} />;
    }
}

export default GameNumbers;

GameNumbers.propTypes = {
    setting: PropTypes.object.isRequired
};
