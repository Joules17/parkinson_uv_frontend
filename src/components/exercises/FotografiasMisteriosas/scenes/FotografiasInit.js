// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css';

// ---------------------------- ASSETS --------------------------------------
// resources imports

import FullscreenImg from 'components/exercises/general_assets/images/objects/others/fullscreen.png';

// textures
import BgRed from 'components/exercises/general_assets/images/textures/red_texture.png';
import CameraImg from 'components/exercises/general_assets/images/objects/others/CameraImg.png';
import RolloImg from 'components/exercises/general_assets/images/objects/others/Rollo.jpg';
import RepeatImg from 'components/exercises/general_assets/images/objects/others/repeat.png';
import PlayImg from 'components/exercises/general_assets/images/objects/others/play.png';

// object_list
import object_list from 'components/exercises/general_assets/images/objects/object_list.js';

// sounds
import HoverSound from 'components/exercises/general_assets/sounds/hover.mp3';
import CorrectSound from 'components/exercises/general_assets/sounds/correct.wav';
import BadSound from 'components/exercises/general_assets/sounds/bad.wav';
import CameraSound from 'components/exercises/general_assets/sounds/camera.mp3';

// Clase no visible para cargar assets e inicializar el juego
export default class FotografiasInit extends Phaser.Scene {
    constructor() {
        super({ key: 'FotografiasInit', backgroundColor: '#3f1651' });
    }

    preload() {
        // assets images:
        this.load.image('FullscreenImg', FullscreenImg);
        this.load.image('CameraImg', CameraImg);
        this.load.image('RolloImg', RolloImg);
        this.load.image('RepeatImg', RepeatImg); 
        this.load.image('PlayImg', PlayImg); 

        // object_list
        for (let categoria in object_list) {
            // busca cada subcategoria para cargar su correspondiente imagen
            // console.log(`Elementos en la categoría ${categoria}:`)
            for (let subcategoria in object_list[categoria]) {
                this.load.image(object_list[categoria][subcategoria]['key'], object_list[categoria][subcategoria]['imagen']);
            }
        }

        // textures
        this.load.image('BgRed', BgRed);

        // assets - audio
        this.load.audio('HoverSound', HoverSound);
        this.load.audio('CorrectSound', CorrectSound);
        this.load.audio('BadSound', BadSound);
        this.load.audio('CameraSound', CameraSound);
    }

    create() {
        this.game = this.sys.game;
        this.add.text(3000, 3000, 'ESTO ES UN TEXTO DE INICIALIZACION', { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(20);
        this.pass();
    }

    pass() {
        const settings = this.sys.settings.data.setting;
        this.scene.start('FotografiasMenu', { settings }, { game: this.game });
    }
}
