// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css'

// --------------------------------------- ASSETS ---------------------------------------
// resources imports
import FullscreenImg from 'components/exercises/general_assets/images/objects/others/fullscreen.png'; 
import LupaImg from 'components/exercises/general_assets/images/objects/others/Lupa.png'; 
import ArrowImg from 'components/exercises/general_assets/images/objects/arrows/neutral/neutral_down.png'; 
// textures
import BgNumbers from 'components/exercises/general_assets/images/textures/numbers_texture.png'

// sounds 
import HoverSound from 'components/exercises/general_assets/sounds/hover.mp3';
import CorrectSound from 'components/exercises/general_assets/sounds/correct.wav';
import BadSound from 'components/exercises/general_assets/sounds/bad.wav';

// Clase no visible para cargar assets e inicializar el juego
export default class NumbersInit extends Phaser.Scene {
    constructor () {
        super({key: 'NumbersInit', backgroundColor: '#3f1651'});
    }

    preload() {
        // assets images: 
        this.load.image('FullscreenImg', FullscreenImg);
        this.load.image('LupaImg', LupaImg);
        this.load.image('BgNumbers', BgNumbers); 
        this.load.image('ArrowImg', ArrowImg);

        // assets - audio
        this.load.audio('HoverSound', HoverSound);
        this.load.audio('CorrectSound', CorrectSound);
        this.load.audio('BadSound', BadSound);
    }

    create () {
        this.cameras.main.setBackgroundColor('#0024ad');
        this.add.text(3000,3000, "", { fontFamily : 'TROUBLE', fill: '#ffffff'}).setFontSize(20)
        this.pass()
    }

    pass () {
        const settings = this.sys.settings.data.setting; 
        this.scene.start('NumbersMenu', {settings} )
    }
}