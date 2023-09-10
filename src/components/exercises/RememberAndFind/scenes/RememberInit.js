// phaser library
import Phaser from 'phaser';

// css
import 'components/exercises/general_assets/styles.css'

// ---------------------- ASSETS IMPORT -----------------------
// ---------------------- IMAGES ------------------------------
// objects
import FirstBush from 'components/exercises/general_assets/images/objects/others/bushes.png'; 
import SecondBush from 'components/exercises/general_assets/images/objects/others/bushes2.png';

// object_list
import object_list from 'components/exercises/general_assets/images/objects/object_list.js'; 

// textures
import BgSkye from 'components/exercises/general_assets/images/textures/skye_texture.png';

// others 
import FullscreenImg from 'components/exercises/general_assets/images/objects/others/fullscreen.png';

// sounds
import HoverSound from 'components/exercises/general_assets/sounds/hover.mp3';
import CorrectSound from 'components/exercises/general_assets/sounds/correct.wav';
import BadSound from 'components/exercises/general_assets/sounds/bad.wav'; 

// Clase no visible para cargar assets e inicializar el juego
export default class RememberInit extends Phaser.Scene {
    constructor () {
        super({key: 'RememberInit', backgroundColor: '#3f1651'});
    }

    preload() {
        // images
        this.load.image('FirstBush', FirstBush);
        this.load.image('SecondBush', SecondBush); 
        this.load.image('BgSkye', BgSkye); 
        this.load.image('FullscreenImg', FullscreenImg);

        // object_list import: 
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

    create () {
        this.cameras.main.setBackgroundColor('#3f1651');
        this.add.text(3000,3000, "", { fontFamily : 'TROUBLE', fill: '#ffffff'}).setFontSize(20)
        this.pass()
    } 

    pass () {
        this.scene.start('RememberMenu')
    }
}