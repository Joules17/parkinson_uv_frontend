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
import SnowImg from 'components/exercises/general_assets/images/objects/others/snowflake.png';
import GlassImg from 'components/exercises/general_assets/images/objects/others/glass.png'; 
import BrokenImg from 'components/exercises/general_assets/images/objects/others/broken.png';
import KeycapImg from 'components/exercises/general_assets/images/objects/others/arrow_keys.png'; 

// arrow list
import arrow_list from 'components/exercises/general_assets/images/objects/arrow_list.js';

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
        this.load.image('SnowImg', SnowImg);
        this.load.image('GlassImg', GlassImg);
        this.load.image('BrokenImg', BrokenImg);
        this.load.image('KeycapImg', KeycapImg); 

        // sprites
        for (let tipo in arrow_list) {
            // busca cada tipo para cargar su correspondiente imagen
            // console.log(`Elementos en el tipo ${tipo}:`)
            for (let dir in arrow_list[tipo]) {
                this.load.image(arrow_list[tipo][dir]['key'], arrow_list[tipo][dir]['imagen']);
            }
        }
        
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
        const settings = this.sys.settings.data.setting;
        console.log(settings, 'verificando como va todo por aqui')
        this.scene.start('ArticMenu', {settings})
    }
}