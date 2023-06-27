import { Component } from 'react';
import Phaser from 'phaser';

// Escenas
import FrutasInit from 'components/exercises/Frutas/scenes/FrutasInit';
import FrutasMenu from 'components/exercises/Frutas/scenes/FrutasMenu';
import FrutasLoby from 'components/exercises/Frutas/scenes/FrutasLoby';
import finDelJuego from 'components/exercises/Frutas/scenes/finDelJuego';
import rondas from 'components/exercises/Frutas/scenes/rondas';

//css
import 'components/exercises/Frutas/styles.css';

class Numbers extends Component {
    componentDidMount() {
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
                autoCenter: Phaser.Scale.CENTER_BOTH // Centrado vertical y horizontal
            },
            scene: [FrutasInit, FrutasMenu, FrutasLoby, rondas, finDelJuego]
        };

        this.game = new Phaser.Game(config);
        
        
    }

    componentWillUnmount() {
        // destruir el juego al desmontar el componente
        this.game.destroy(true);
    }

    render() {
        return <div id="phaser-game-container" style = {{width: '800px', height: '600px'}} />;
    }
}

export default Numbers;
