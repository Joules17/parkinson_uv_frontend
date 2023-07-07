// phaser library
import Phaser from 'phaser';
import '../styles.css'
// music import
import blue_island from '../assets/music/blue-island.mp3'

// Clase no visible para cargar assets e inicializar el juego
export default class NumbersInit extends Phaser.Scene {
    constructor () {
        super({key: 'NumbersInit', backgroundColor: '#3f1651'});
    }

    preload() {
        this.load.audio('main_music', blue_island)
    }

    create () {
        this.cameras.main.setBackgroundColor('#0024ad');
        this.add.text(3000,3000, "", { fontFamily : 'TROUBLE', fill: '#ffffff'}).setFontSize(20)
        this.pass()
    }

    pass () {
        this.scene.start('NumbersMenu')
    }
}