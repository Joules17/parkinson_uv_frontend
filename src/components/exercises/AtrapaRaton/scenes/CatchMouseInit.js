import Phaser from 'phaser'; 


// Styles
import 'components/exercises/general_assets/styles.css'

// Assets 
// Images
import mouseImg from 'components/exercises/general_assets/images/objects/mouse/mouse.png'; 
import bgTexture from 'components/exercises/general_assets/images/textures/grass_texture.png'; 
import redImg from 'components/exercises/general_assets/images/objects/mouse/malla.png'
import trapImg from 'components/exercises/general_assets/images/objects/mouse/trampa.png';

// Arrow list 
import arrow_list from 'components/exercises/general_assets/images/objects/arrow_list.js';

// Audio
import StartButtonSound from 'components/exercises/general_assets/sounds/start_button.mp3'; 
import CrackingSound from 'components/exercises/general_assets/sounds/cracking.mp3';

// Clase no visible para cargar assets e inicializar el juego: 
export default class CatchMouseInit extends Phaser.Scene {
    constructor () {
        super({key: 'CatchMouseInit', backgroundColor: '#3f1651'});
    }

    preload () {
        // images
        this.load.image('mouseImg', mouseImg);
        this.load.image('bgTexture', bgTexture);
        this.load.image('redImg', redImg);
        this.load.image('trapImg', trapImg);

        // sounds
        // this.load.audio('HoverSound', HoverSound);
        // this.load.audio('CorrectSound', CorrectSound);
        // this.load.audio('BadSound', BadSound);
        // this.load.audio('BubblePopSound', BubblePopSound);
        // this.load.audio('PickBubbleSound', PickBubbleSound);
    }

    create () {
        this.game = this.sys.game
        this.cameras.main.setBackgroundColor('#8DBB6C');
        this.add.text(3000,3000, "", { fontFamily : 'TROUBLE', fill: '#ffffff'}).setFontSize(20)
        this.pass()
    }

    pass () {
        const settings = this.sys.settings.data.setting;
        this.scene.start('CatchMouseMenu', {settings}, {game: this.game});
    }
}