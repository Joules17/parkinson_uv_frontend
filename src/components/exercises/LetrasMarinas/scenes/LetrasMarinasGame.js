// Phaser 
import Phaser from 'phaser'; 

// Styles
import 'components/exercises/general_assets/styles.css'; 

// Custom Classes Imported: 
import SteroidObject from 'components/Factory/SteroidObject.js';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import LetterSoup from '../sprites/LetterSoup';
import Casilla from '../sprites/Casilla';
import Level from '../sprites/Level';

export default class LetrasMarinasGame extends Phaser.Scene {
    constructor() {
        super({ key: 'LetrasMarinasGame', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;
    }

    preload () {}

    create () {
        // Background 
        this.bg = this.add.sprite(400, 300, 'SeaImg').setDepth(-2);
        const sopa = new LetterSoup({scene: this, num_palabras: 3, arreglo_palabras: ['HOLA', 'MUNDO', 'PRUEBA'], filas: 10, columnas: 10})
        const casilla = new Casilla({scene: this, pos_x: 300, pos_y: 400, letter: 'A'})
        const nivel = new Level({scene: this, pos_initx: 100, pos_inity: 100, number_cols : 10, number_rows : 10, number_words : 3, categories: ['animales', 'frutas']})

    }
}