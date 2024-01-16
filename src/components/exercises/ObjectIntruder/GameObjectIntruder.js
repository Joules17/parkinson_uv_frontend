import { useEffect } from "react";

// prop
import PropTypes from 'prop-types';

import Phaser from "phaser";
import { markGameAsPlayed } from 'store/reducers/gamesListSlice';
import { useDispatch } from 'react-redux';
import { useExternalApi as useLogsResponse } from 'hooks/logsResponse';
import { useExternalApi as useGameListResponse } from 'hooks/listGamesResponse'


// Escenas
import ObjectInit from 'components/exercises/ObjectIntruder/scenes/ObjectIntruderInit';
import ObjectMenu from 'components/exercises/ObjectIntruder/scenes/ObjectMenu';
import ObjectLoby from 'components/exercises/ObjectIntruder/scenes/ObjectLoby';
import ObjectEnd from 'components/exercises/ObjectIntruder/scenes/ObjectEnd';
import ObjectRondas from 'components/exercises/ObjectIntruder/scenes/ObjectRondas';
import ObjectFailed from 'components/exercises/ObjectIntruder/scenes/ObjectFailed';

//css
import 'components/exercises/general_assets/styles.css';

function ObjectIntruder(props) {
    const dispatch = useDispatch();
    const { id, idSession, fromActivity, idList } = props;
    const { createLog } = useLogsResponse()
    const { markGameListAsPlayed } = useGameListResponse()

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
                    debug: false,
                },
            },
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            scene: [ObjectInit, ObjectMenu, ObjectLoby, ObjectRondas, ObjectEnd, ObjectFailed],
        }

        const game = new Phaser.Game(config);
        game.scene.start('ObjectInit', { setting }, { game });
        game.scale.on('enterfullscreen', handleEnterFullScreen);
        game.scale.on('leavefullscreen', handleLeaveFullScreen);
        game.events.on('dataToReactComponent', handleDataFromPhaser);

        return () => {
            game.events.off('dataToReactComponent', handleDataFromPhaser);
            game.scale.off('enterfullscreen', handleEnterFullScreen);
            game.scale.off('leavefullscreen', handleLeaveFullScreen);
            game.destroy(true);
        };
        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    const handleDataFromPhaser = (data) => {
        if (fromActivity) {
            const dataLog = {
                id_session: idSession,
                id_game_list: id,
                log: data
            }
            createLog(dataLog)
            markGameListAsPlayed(idList,id)
            console.log('Datos recibidos desde Phaser:', data);
            dispatch(markGameAsPlayed({ gameName: "Objeto Intruso" })); // Utiliza dispatch aquí
        }
    }

    const handleEnterFullScreen = () => {
        const gameContainer = document.getElementById('phaser-game-container');
        gameContainer.style.width = window.innerWidth + 'px';
        gameContainer.style.height = window.innerHeight + 'px';
        gameContainer.style.justifyContent = 'center';
        gameContainer.style.alignItems = 'center';
        console.log(gameContainer);
    }

    const handleLeaveFullScreen = () => {
        const gameContainer = document.getElementById('phaser-game-container');
        gameContainer.style.width = '800px';
        gameContainer.style.height = '600px';
        console.log(gameContainer);
    }

    return <div id="phaser-game-container" className="game-container" style={{ height: '600px', width: '800px' }} />;
}

// class ObjectIntruder extends Component {
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
//                 autoCenter: Phaser.Scale.CENTER_BOTH // Centrado vertical y horizontal
//             },
//             scene: [ObjectInit, ObjectMenu, ObjectLoby, ObjectRondas, ObjectEnd]
//         };

//         this.game = new Phaser.Game(config);
//         this.game.scene.start('ObjectInit', {setting});
//         this.game.scale.on('enterfullscreen', this.handleEnterFullScreen, this);
//         this.game.scale.on('leavefullscreen', this.handleLeaveFullScreen, this);

//     }

//     componentWillUnmount() {
//         this.game.scale.off('enterfullscreen', this.handleEnterFullScreen, this);
//         this.game.scale.off('leavefullscreen', this.handleLeaveFullScreen, this);
//         this.game.destroy(true);
//       }

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
//         return <div id="phaser-game-container" style = {{ height: '600px', width: '800px'}} />;
//     }
// }

export default ObjectIntruder;

ObjectIntruder.propTypes = {
    setting: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    idSession: PropTypes.number.isRequired,
    fromActivity: PropTypes.bool.isRequired
}