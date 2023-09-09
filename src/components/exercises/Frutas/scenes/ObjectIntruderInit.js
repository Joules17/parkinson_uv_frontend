// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css'

// ---------------------------- ASSETS --------------------------------------
// resources imports 
import PalmeraImg from 'components/exercises/general_assets/images/objects/others/palmera.png'; 
import FullscreenImg from 'components/exercises/general_assets/images/objects/others/fullscreen.png';
// fruits imports
import CocoImg from 'components/exercises/general_assets/images/objects/fruits/coco.png';
import MangoImg from 'components/exercises/general_assets/images/objects/fruits/mango.png';
// object_list
import object_list from 'components/exercises/general_assets/images/objects/object_list.js'; 
// textures
import BgImg from 'components/exercises/general_assets/images/textures/sand_texture.png';
import BgSky from 'components/exercises/general_assets/images/textures/skye_texture.png'; 
// sounds
import HoverSound from 'components/exercises/general_assets/sounds/hover.mp3'; 
import CorrectSound from 'components/exercises/general_assets/sounds/correct.wav';
import BadSound from 'components/exercises/general_assets/sounds/bad.wav';

// Clase no visible para cargar assets e inicializar el juego
export default class ObjectInit extends Phaser.Scene {
    constructor() {
        super({ key: 'ObjectInit', backgroundColor: '#3f1651' });
    }

    preload() { 
        // assets images: 
        this.load.image('PalmeraImg', PalmeraImg);
        this.load.image('CocoImg', CocoImg);
        this.load.image('MangoImg', MangoImg);
        this.load.image('FullscreenImg', FullscreenImg);

        // textures
        this.load.image('BgImg', BgImg); 
        this.load.image('BgSky', BgSky); 

        // object_list 
        for (let categoria in object_list) {
            // busca cada subcategoria para cargar su correspondiente imagen
            // console.log(`Elementos en la categoría ${categoria}:`)
            for (let subcategoria in object_list[categoria]) {
              this.load.image(object_list[categoria][subcategoria]["key"], object_list[categoria][subcategoria]["imagen"])
            }
          }

        // assets - audio 
        this.load.audio('HoverSound', HoverSound);
        this.load.audio('CorrectSound', CorrectSound);
        this.load.audio('BadSound', BadSound); 
    }

    create() {
        this.add.text(3000, 3000, "", { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(20); 
        this.pass()
    }

    pass() {
        const settings = this.sys.settings.data.setting;
        this.scene.start('ObjectMenu', {settings})
    }
}