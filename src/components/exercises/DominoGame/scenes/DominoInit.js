import Phaser from 'phaser';
import '../styles.css'

// music import
// music

// Clase no visible para cargar assets e inicializar el juego
export default class DominoInit extends Phaser.Scene {
    constructor () {
        super({key: 'DominoInit', backgroundColor: '#3f1651'});
    }

    preload() {

    }

    create() {
        this.cameras.main.setBackgroundColor('#3f1651');
        this.add.text(3000,3000, "", { fontFamily : 'ComicSans', fill: '#ffffff'}).setFontSize(20)
        this.pass()
    }

    pass () {
        const settings = this.sys.settings.data.settings;
        this.scene.start('DominoMenu', {settings})
    }
}