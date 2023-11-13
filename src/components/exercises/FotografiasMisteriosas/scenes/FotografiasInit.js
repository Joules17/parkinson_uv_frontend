// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css'

// ---------------------------- ASSETS --------------------------------------
// resources imports 

import FullscreenImg from 'components/exercises/general_assets/images/objects/others/fullscreen.png';

// textures
import BgRed from 'components/exercises/general_assets/images/textures/red_texture.png';
import CameraImg from 'components/exercises/general_assets/images/objects/others/CameraImg.png';
import RolloImg from 'components/exercises/general_assets/images/objects/others/Rollo.jpg'; 

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

        // textures
        this.load.image('BgRed', BgRed);

        // assets - audio 
        this.load.audio('HoverSound', HoverSound);
        this.load.audio('CorrectSound', CorrectSound);
        this.load.audio('BadSound', BadSound); 
        this.load.audio('CameraSound', CameraSound);
    }

    create() {
        this.game = this.sys.game
        this.add.text(3000, 3000, "ESTO ES UN TEXTO DE INICIALIZACION", { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(20); 
        this.pass()
    }

    pass() {
        const settings = this.sys.settings.data.setting;
        this.scene.start('FotografiasMenu', {settings}, {game: this.game})
    }
}