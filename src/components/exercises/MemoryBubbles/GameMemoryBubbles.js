// Phaser Component 
import { Component } from 'react'; 
import Phaser from 'phaser'; 

// Scenes
import MemoryBubblesInit from 'components/exercises/MemoryBubbles/scenes/MemoryBubblesInit';
import MemoryBubblesMenu from 'components/exercises/MemoryBubbles/scenes/MemoryBubblesMenu';
import MemoryBubblesGame from 'components/exercises/MemoryBubbles/scenes/MemoryBubblesGame'; 

// css
import 'components/exercises/general_assets/styles.css';    

class GameMemoryBubbles extends Component {
    componentDidMount () {
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
                    debug: true,
                },
            },
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH // Centrado vertical y horizonta
            },
            scene: [MemoryBubblesInit, MemoryBubblesMenu, MemoryBubblesGame],
        }

        this.game = new Phaser.Game(config);
        this.game.scene.start('MemoryBubblesInit', {setting});
        this.game.scale.on('enterfullscreen', this.handleEnterFullScreen, this);
        this.game.scale.on('leavefullscreen', this.handleLeaveFullScreen, this);
    }

    componentWillUnmount() {
        this.game.scale.off('enterfullscreen', this.handleEnterFullScreen, this);
        this.game.scale.off('leavefullscreen', this.handleLeaveFullScreen, this);
        this.game.destroy(true);
    }

    handleEnterFullScreen () {
        const gameContainer = document.getElementById('phaser-game-container');
        gameContainer.style.width = window.innerWidth + 'px';
        gameContainer.style.height = window.innerHeight + 'px';
        gameContainer.style.justifyContent = 'center';
        gameContainer.style.alignItems = 'center';
    }

    handleLeaveFullScreen () {
        const gameContainer = document.getElementById('phaser-game-container');

        // Restablecer las dimensiones del contenedor
        gameContainer.style.width = `${this.game.config.width}px`;
        gameContainer.style.height = `${this.game.config.height}px`;
        gameContainer.style.justifyContent = 'unset';
        gameContainer.style.alignItems = 'unset';
    }

    render () {
        return <div id="phaser-game-container" style = {{ height: '600px', width: '800px'}} />;
    }
}

export default GameMemoryBubbles;