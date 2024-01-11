// Custom classes imported
import Casilla from './Casilla';

export default class Tablero {
    constructor (config) {
        this.scene = config.scene;
        // mxn
        this.filas = config.filas;
        this.columnas = config.columnas;
        // palabra oculta:
        this.answer_option = config.answer_option;
        // Posible Letters
        this.letras_posibles = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // Visible var
        this.visible = config.visible;
        // gen_tablero
        this.gen_figure();
        this.matriz = this.gen_tablero();

        if (!this.visible) {
            this.hide();
        }
    }


    gen_figure () {
        this.figure = this.scene.add.sprite(665, 225, this.answer_option).setScale(0.4);
    }

    // Casillas - Creador
    gen_tablero() {
        const matriz = [];

        // Filling Matrix
        for (let fila = 0; fila < this.filas; fila++) {
            matriz[fila] = [];
            for (let columna = 0; columna < this.columnas; columna++) {
                const letra = this.gen_random_letter();
                matriz[fila][columna] = new Casilla({ scene: this.scene, posx: columna, posy: fila, letra: letra, visible: true });
            }
        }

        console.log('Matriz llenada de randoms: ')
        for (let i = 0; i < this.filas; i++) {
            console.log(matriz[i]);
        }

        // Ubicar la palabra en posiciones aleatorias
        const palabraPosiciones = this.getPalabraPosiciones();

        for (let i = 0; i < this.answer_option.length; i++) {
            const { fila, columna } = palabraPosiciones[i];
            matriz[fila][columna].set_letter(this.answer_option[i]);
        }

        return matriz;
    }

    getPalabraPosiciones() {
        const posiciones = [];

        for (let i = 0; i < this.answer_option.length; i++) {
            let fila, columna;
            do {
                // Obtener posiciones aleatorias
                fila = Math.floor(Math.random() * this.filas);
                columna = Math.floor(Math.random() * this.columnas);
            } while (this.posicionOcupada(posiciones, fila, columna));

            posiciones.push({ fila, columna });
        }

        return posiciones;
    }

    posicionOcupada(posiciones, fila, columna) {
        // Verificar si la posición ya está ocupada
        return posiciones.some(pos => pos.fila === fila && pos.columna === columna);
    }

    gen_random_letter () {
        return (this.letras_posibles[Math.floor(Math.random() * this.letras_posibles.length)])
    }

    move_row_right (fila) {
        const lastColumn = this.columnas - 1;
        // console.log(this.matriz)
        const temp = this.matriz[fila][lastColumn].get_letter();

        for (let col = lastColumn; col > 0; col--) {
            this.matriz[fila][col].set_letter(this.matriz[fila][col - 1].get_letter());
        }

        this.matriz[fila][0].set_letter(temp);
    }

    move_row_left (fila) {
        const lastColumn = this.columnas - 1;
        const temp = this.matriz[fila][0].get_letter();

        for (let col = 0; col < lastColumn; col++) {
            this.matriz[fila][col].set_letter(this.matriz[fila][col + 1].get_letter());
        }

        this.matriz[fila][lastColumn].set_letter(temp);
    }

    move_column_up (columna) {
        const lastRow = this.filas - 1;
        const temp = this.matriz[0][columna].get_letter();

        for (let row = 0; row < lastRow; row++) {
            this.matriz[row][columna].set_letter(this.matriz[row + 1][columna].get_letter());
        }

        this.matriz[lastRow][columna].set_letter(temp);
    }

    move_column_down (columna) {
        const lastRow = this.filas - 1;
        const temp = this.matriz[lastRow][columna].get_letter();

        for (let row = lastRow; row > 0; row--) {
            this.matriz[row][columna].set_letter(this.matriz[row - 1][columna].get_letter());
        }

        this.matriz[0][columna].set_letter(temp);
    }

    check_complete() {
        const answerLowerCase = this.answer_option.toLowerCase();

        for (let col = 0; col < this.columnas; col++) {
            const currentLetter = this.matriz[2][col].get_letter().toLowerCase();
            if (currentLetter !== answerLowerCase[col]) {
                return false;
            }
        }

        return true;
    }

    hide () {
        this.visible = false; 
        this.figure.setVisible(false);
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                this.matriz[fila][columna].hide();
            }
        }
    }

    show () {
        this.visible = true; 
        this.figure.setVisible(true);
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                this.matriz[fila][columna].show();
            }
        }
    }
}