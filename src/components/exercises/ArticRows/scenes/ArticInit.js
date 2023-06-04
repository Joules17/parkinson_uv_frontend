// phaser library
import Phaser from 'phaser';
import '../styles.css'

// Clase no visible para cargar assets e inicializar el juego
export default class ArticInit extends Phaser.Scene {
    constructor () {
        super({key: 'ArticInit', backgroundColor: '#3f1651'});
    }

    preload() {
        
    }

    create () {
        this.cameras.main.setBackgroundColor('#3f1651');
        this.add.text(3000,3000, "", { fontFamily : 'StayPixelRegular', fill: '#ffffff'}).setFontSize(20)
        this.add.text(3000,3000, "", { fontFamily : 'kongtext', fill: '#ffffff'}).setFontSize(20)
        // Musica ---------------
        /*
        ... codigo de musica
        */

        this.pass()
    } 

    pass () {
        this.scene.start('ArticMenu')
    }
}