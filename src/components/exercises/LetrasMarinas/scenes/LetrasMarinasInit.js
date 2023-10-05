// Phaser Library 
import Phaser from 'phaser'; 

// Styles
import 'components/exercises/general_assets/styles.css'

// Assets
// object_list
import object_list from 'components/exercises/general_assets/images/objects/object_list.js'; 

// Img
import SeaImg from 'components/exercises/general_assets/images/textures/sea_texture.png'
import CoralImg from 'components/exercises/general_assets/images/objects/others/coral.png'
import CoralOrange from 'components/exercises/general_assets/images/objects/others/coral_orange.png'
import AlgaeImg from 'components/exercises/general_assets/images/objects/others/algae.png'
import FullscreenImg from 'components/exercises/general_assets/images/objects/others/fullscreen.png'
import BubbleImg from 'components/exercises/general_assets/images/objects/others/Bubble.png'; 
// Audio
import HoverSound from 'components/exercises/general_assets/sounds/hover.mp3'

export default class LetrasMarinasInit extends Phaser.Scene {
    constructor () {
        super({key: 'LetrasMarinasInit', backgroundColor: '#3f1651'});
    }

    preload () {
        // images
        this.load.image('SeaImg', SeaImg); 
        this.load.image('CoralImg', CoralImg); 
        this.load.image('CoralOrange', CoralOrange);
        this.load.image('AlgaeImg', AlgaeImg);
        this.load.image('FullscreenImg', FullscreenImg); 
        this.load.image('BubbleImg', BubbleImg);

        // object_list import: 
        // object_list 
        for (let categoria in object_list) {
            // busca cada subcategoria para cargar su correspondiente imagen
            // console.log(`Elementos en la categoría ${categoria}:`)
            for (let subcategoria in object_list[categoria]) {
              this.load.image(object_list[categoria][subcategoria]["key"], object_list[categoria][subcategoria]["imagen"])
            }
        }
        
        // audio
        this.load.audio('HoverSound', HoverSound);

    }

    create () {
        this.cameras.main.setBackgroundColor('#3f1651');
        this.add.text(3000,3000, "", { fontFamily : 'TROUBLE', fill: '#ffffff'}).setFontSize(20)
        this.pass() 
    }

    pass () {
        const settings = this.sys.settings.data.setting; 
        this.scene.start('LetrasMarinasMenu', {settings});
    }
}