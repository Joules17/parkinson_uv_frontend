// phaser library
import Phaser from 'phaser';

// styles
import 'components/exercises/general_assets/styles.css'

// assets
// images 
import RaindropImg from 'components/exercises/general_assets/images/objects/others/rain_drop.png'; 
import BgNightSky from 'components/exercises/general_assets/images/textures/night_sky_texture.jpg'; 
import FullscreenImg from 'components/exercises/general_assets/images/objects/others/fullscreen.png';
import RightArrowImg from 'components/exercises/general_assets/images/objects/arrows/good/good_right.png'; 

// audio
import StartButtonSound from 'components/exercises/general_assets/sounds/start_button.mp3'; 
import CrackingSound from 'components/exercises/general_assets/sounds/cracking.mp3';

// Clase no visible para cargar assets e inicializar el juego
export default class ArticInit extends Phaser.Scene {
    constructor () {
        super({key: 'ArticInit', backgroundColor: '#3f1651'});
    }

    preload() {
        // images
        this.load.image('RaindropImg', RaindropImg); 
        this.load.image('BgNightSky', BgNightSky); 
        this.load.image('RightArrowImg', RightArrowImg); 
        this.load.image('FullscreenImg', FullscreenImg);

        // audio 
        this.load.audio('StartButtonSound', StartButtonSound);
        this.load.audio('CrackingSound', CrackingSound);
    }
    create () {
        this.cameras.main.setBackgroundColor('#3f1651');
        this.add.text(3000,3000, "", { fontFamily : 'TROUBLE', fill: '#ffffff'}).setFontSize(20)
        this.pass()
    } 

    pass () {
        const settings = this.sys.settings.data.settings;
        this.scene.start('ArticMenu', {settings})
    }
}