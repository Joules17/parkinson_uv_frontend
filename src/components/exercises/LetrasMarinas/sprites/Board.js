// phaser 
import Phaser from 'phaser';

// Import custom classes
import Casilla from './Casilla';

export default class Board extends Phaser.GameObjects.Group {
    constructor (config) {
        super(config.scene); 
        this.scene = config.scene; 
        this.sopita = config.sopita; 
        this.pos_x = config.pos_x; 
        this.pos_y = config.pos_y;
        this.active = config.active; 
        this.sopa_letras = this.sopita.get_soup(); 
        this.selecting = false; 
        this.selected_casillas = []; 
        this.draw_board(); 
        this.mostrar(this.active); 
    }

    draw_board () {
        for (let i = 0; i < this.sopa_letras.length; i++) {
            for (let j = 0; j < this.sopa_letras[i].length; j++) {
                let casilla = new Casilla({scene: this.scene, board: this,  pos_x: this.pos_x + (j*45), pos_y: this.pos_y + (i*45), letter: this.sopa_letras[i][j]})
                this.add(casilla); 
            }
        }
    }

    mostrar(bool) { 
        this.children.iterate((sprite) => {
            sprite.setVisible(bool);
        });
    }


}