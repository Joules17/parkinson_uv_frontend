import Phaser from 'phaser'; 
import '../styles.css'

// music import 

// clase no visible para cargar assets e inicializar el juego
export default class LetrasInit extends Phaser.Scene {
    constructor () {
        super({ ket: 'LetrasInit', backgroundColor: '#3f1651'});
    }

    preload () {

    }

    create () {
        this.cameras.main.setBackgroundColor('#3f1651');
        this.add.text(3000,3000, "", { fontFamily : 'ComicSans', fill: '#ffffff'}).setFontSize(20)
        this.pass(); 
    }

    pass () {
        this.scene.start('LetrasMenu')
    }
}