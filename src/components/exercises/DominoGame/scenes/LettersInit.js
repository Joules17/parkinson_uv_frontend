import Phaser from 'phaser';

// ------------------------------------------------ ASSETS IMPORTS ------------------------------------------------
// images
import BgForest from 'components/exercises/general_assets/images/textures/green_texture.png'
import FullscreenImg from 'components/exercises/general_assets/images/objects/others/fullscreen.png'
import TreeImg from 'components/exercises/general_assets/images/objects/others/TreeImg.png'

// sounds
import HoverSound from 'components/exercises/general_assets/sounds/hover.mp3'
import CorrectSound from 'components/exercises/general_assets/sounds/correct.wav'
import BadSound from 'components/exercises/general_assets/sounds/bad.wav'

// styles
import 'components/exercises/general_assets/styles.css'

// Clase no visible para cargar assets e inicializar el juego
export default class LettersInit extends Phaser.Scene {
    constructor () {
        super({key: 'LettersInit', backgroundColor: '#3f1651'});
    }

    preload() {
        // images
        this.load.image('BgForest', BgForest); 
        this.load.image('FullscreenImg', FullscreenImg);
        this.load.image('TreeImg', TreeImg);

        // sounds 
        this.load.audio('HoverSound', HoverSound);
        this.load.audio('CorrectSound', CorrectSound);
        this.load.audio('BadSound', BadSound);
    }

    create() {
        this.cameras.main.setBackgroundColor('#3f1651');
        this.add.text(3000,3000, "", { fontFamily : 'TROUBLE', fill: '#ffffff'}).setFontSize(20)
        this.pass()
    }

    pass () {
        const settings = this.sys.settings.data.setting;
        console.log('AQUI LLEGO BIEN?', settings)
        this.scene.start('LettersMenu', {settings})
    }
}