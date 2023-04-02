// phaser library
import Phaser from 'phaser';
import '../styles.css'

// Clase no visible para cargar assets e inicializar el juego
export default class FrutasInit extends Phaser.Scene {
    constructor () {
        super({key: 'FrutasInit', backgroundColor: '#3f1651'});
    }

    preload() {
    }

    create () {
        this.cameras.main.setBackgroundColor('#3f1651');
        this.add.text(3000,3000, "", { fontFamily : 'ARCO', fill: '#ffffff'}).setFontSize(20)
        this.pass()
    } 

    pass () {
        this.scene.start('FrutasMenu')
    }
}