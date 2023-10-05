// phaser
import Phaser from 'phaser';

// Import custom classes
import Casilla from './Casilla';

export default class Board extends Phaser.GameObjects.Group {
    constructor (config) {
        super(config.scene);
        this.scene = config.scene;
        this.nivel = config.nivel;
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
                let casilla = new Casilla({scene: this.scene, board: this,  pos_x: this.pos_x + (j*51), pos_y: this.pos_y + (i*51), letter: this.sopa_letras[i][j]})
                this.add(casilla);
            }
        }
    }
    // Function para verificar si la palabra seleccionada es correcta
    check_selection() {
        console.log(this.nivel.current_word)
        let palabra_formada = '';
        this.selected_casillas.forEach(casilla => {
            palabra_formada += casilla.letter;
        })
        console.log(palabra_formada)
        if (palabra_formada === this.nivel.current_word) {
            console.log('Palabra correcta encontrada!', palabra_formada);
            this.selected_casillas.forEach(casilla => {
                casilla.discovered = true;
            });
            this.nivel.guessed_word();
        }
    }
    // Function para limpiar aquellas casillas que han sido seleccionadas erroneamente
    clean_casillas () {
        this.selected_casillas = [];
        this.selecting = false;
        this.children.iterate((casilla) => {
            casilla.limpiar();
        });
    }

    // Function para volver visible / invisible el trablero
    mostrar(bool) {
        this.children.iterate((sprite) => {
            sprite.setVisible(bool);
        });
    }


}