// phaser library
import Phaser from 'phaser';
import '../styles.css'

// Clase no visible para cargar assets e inicializar el juego
export default class ObjectInit extends Phaser.Scene {
    constructor() {
        super({ key: 'ObjectInit', backgroundColor: '#3f1651' });
    }

    preload() {
        // assets  
    }

    create() {
        this.add.text(3000, 3000, "", { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(20); 
        this.pass()
    }

    pass() {
        const settings = this.sys.settings.data.settings;
        this.scene.start('ObjectMenu', {settings})
    }
}