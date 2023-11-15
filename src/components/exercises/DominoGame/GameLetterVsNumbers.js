import { useEffect } from 'react';

// prop
import PropTypes from 'prop-types';

// phaser
import Phaser from 'phaser';
import { markGameAsPlayed } from 'store/reducers/gamesListSlice';

// scenes
import LettersInit from 'components/exercises/DominoGame/scenes/LettersInit';
import LettersMenu from 'components/exercises/DominoGame/scenes/LettersMenu';
import LettersGame from 'components/exercises/DominoGame/scenes/LettersGame';
import LettersTutorial from 'components/exercises/DominoGame/scenes/LettersTutorial';
import LettersEndGame from 'components/exercises/DominoGame/scenes/LettersEndGame';
import LettersFailed from 'components/exercises/DominoGame/scenes/LettersFailed'; 

import { useDispatch } from 'react-redux';
import { useExternalApi as useLogsResponse } from 'hooks/logsResponse';
// css
import 'components/exercises/general_assets/styles.css';

function LettersVsNumbers(props) {
    const dispatch = useDispatch();
    const { id, idSession, fromActivity } = props;
    const { createLog } = useLogsResponse();
    useEffect(() => {
        const { setting } = props;

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

            scene: [LettersInit, LettersMenu, LettersTutorial, LettersGame, LettersEndGame, LettersFailed]
        };

        const game = new Phaser.Game(config);
        game.scene.start('LettersInit', { setting }, { game });
        game.scale.on('enterfullscreen', handleEnterFullScreen);
        game.scale.on('leavefullscreen', handleLeaveFullScreen);
        game.events.on('dataToReactComponent', handleDataFromPhaser);

        return () => {
            game.events.off('dataToReactComponent', handleDataFromPhaser);
            game.scale.off('enterfullscreen', handleEnterFullScreen);
            game.scale.off('leavefullscreen', handleLeaveFullScreen);
            game.destroy(true);
        };
    }, []);

    const handleDataFromPhaser = (data) => {
        if (fromActivity) {
            const dataLog = {
                id_session: idSession,
                id_game_list: id,
                log: data
            };
            createLog(dataLog);
            console.log('Datos recibidos desde Phaser:', data);
            dispatch(markGameAsPlayed({ gameName: 'Letras VS Numeros' })); // Utiliza dispatch aquí
        }
    };

    const handleEnterFullScreen = () => {
        const gameContainer = document.getElementById('phaser-game-container');
        gameContainer.style.width = window.innerWidth + 'px';
        gameContainer.style.height = window.innerHeight + 'px';
        gameContainer.style.justifyContent = 'center';
        gameContainer.style.alignItems = 'center';
        console.log(gameContainer);
    };

    const handleLeaveFullScreen = () => {
        const gameContainer = document.getElementById('phaser-game-container');
        gameContainer.style.width = '800px';
        gameContainer.style.height = '600px';
        console.log(gameContainer);
    };

    return <div id="phaser-game-container" className="game-container" style={{ height: '600px', width: '800px' }} />;
}

// class LettersVsNumbers extends Component {
//     componentDidMount() {
//         /* eslint-disable */
//         const { setting } = this.props;
//         const config = {
//             type: Phaser.AUTO,
//             parent: 'phaser-game-container',
//             width: 800,
//             height: 600,
//             physics: {
//                 default: 'arcade',
//                 arcade: {
//                     debug: false
//                 }
//             },
//             scale: {
//                 mode: Phaser.Scale.FIT,
//                 autoCenter: Phaser.Scale.CENTER_BOTH
//             },
//             scene: [LettersInit, LettersMenu, LettersTutorial, LettersGame, LettersEndGame]
//         };

//         this.game = new Phaser.Game(config);
//         this.game.scene.start('LettersInit', { setting });
//         this.game.scale.on('enterfullscreen', this.handleEnterFullScreen, this);
//         this.game.scale.on('leavefullscreen', this.handleLeaveFullScreen, this);

//     }

//     componentWillUnmount() {
//         this.game.scale.off('enterfullscreen', this.handleEnterFullScreen, this);
//         this.game.scale.off('leavefullscreen', this.handleLeaveFullScreen, this);
//         this.game.destroy(true);
//     }

//     handleEnterFullScreen() {
//         const gameContainer = document.getElementById('phaser-game-container');
//         gameContainer.style.width = window.innerWidth + 'px';
//         gameContainer.style.height = window.innerHeight + 'px';
//         gameContainer.style.justifyContent = 'center';
//         gameContainer.style.alignItems = 'center';
//     }

//     handleLeaveFullScreen() {
//         const gameContainer = document.getElementById('phaser-game-container');

//         // Restablecer las dimensiones del contenedor
//         gameContainer.style.width = `${this.game.config.width}px`;
//         gameContainer.style.height = `${this.game.config.height}px`;
//         this.game.scale.resize(this.game.config.width, this.game.config.height);
//     }

//     render() {
//         return <div id="phaser-game-container" style={{ height: '600px', width: '800px' }} />;
//     }
// }

export default LettersVsNumbers;

LettersVsNumbers.propTypes = {
    setting: PropTypes.object.isRequired,
    id: PropTypes.number,
    idSession: PropTypes.number,
    fromActivity: PropTypes.bool
};
