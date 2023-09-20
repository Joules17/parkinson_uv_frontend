import Phaser from 'phaser'; 

// css 
import 'components/exercises/general_assets/styles.css'

// assets 
// images
import BgMint from 'components/exercises/general_assets/images/textures/mint_texture.png'; 
import FullscreenImg from 'components/exercises/general_assets/images/objects/others/fullscreen.png'; 
import LupaImg from 'components/exercises/general_assets/images/objects/others/Lupa.png'; 
import DetectiveImg from 'components/exercises/general_assets/images/objects/others/detective.png'; 

// sounds 
import TypingSound from 'components/exercises/general_assets/sounds/type.mp3';
import FailSound from 'components/exercises/general_assets/sounds/fail.mp3';
import FlipSound from 'components/exercises/general_assets/sounds/flip_round.mp3';
import GoodSound from 'components/exercises/general_assets/sounds/good.mp3'; 
import WinSound from 'components/exercises/general_assets/sounds/win.mp3';

// alphabet images
import letter_list from 'components/exercises/general_assets/images/objects/letter_list.js';


// clase no visible para cargar assets e inicializar el juego
export default class LetrasInit extends Phaser.Scene {
    constructor () {
        super({ ket: 'LetrasInit', backgroundColor: '#3f1651'});
    }

    preload () {
        // images'
        this.load.image('BgMint', BgMint); 
        this.load.image('FullscreenImg', FullscreenImg); 
        this.load.image('LupaImg', LupaImg); 
        this.load.image('DetectiveImg', DetectiveImg);
        
        // sprites
        for (let tipo in letter_list) {
            for (let dir in letter_list[tipo]) {
                this.load.image(letter_list[tipo][dir]['key'], letter_list[tipo][dir]['imagen']);
            }
        }

        // audio
        this.load.audio('TypingSound', TypingSound);  
        this.load.audio('FlipSound', FlipSound); 
        this.load.audio('FailSound', FailSound);
        this.load.audio('GoodSound', GoodSound);
        this.load.audio('WinSound', WinSound);
    }

    create () {
        this.cameras.main.setBackgroundColor('#3f1651');
        this.add.text(3000,3000, "", { fontFamily : 'TROUBLE', fill: '#ffffff'}).setFontSize(20)
        this.pass(); 
    }

    pass () {
        this.scene.start('LetrasMenu')
    }
}