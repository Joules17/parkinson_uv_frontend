// Custom Classes Imported

export default class LetterSoup {
    constructor (config) {
        this.scene = config.scene; 
        this.num_palabras = config.num_palabras; 
        this.arreglo_palabras = config.arreglo_palabras;
        this.filas = config.filas; 
        this.columnas = config.columnas;
        this.possible_orientations = ['leftright', 'updown']
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        this.saved_locations = []
        this.soup = []
        this.gen_soup(); 
    }

    gen_empty_soup() {
        let soup = []; 
        for (let i = 0; i < this.filas; i++) {
            soup.push(Array(this.columnas).fill('_'));
        }
        return soup; 
    }

    place_words () {
        let word; 
        let word_length; 
        let placed;
        let orientation; 
        let step_x; 
        let step_y;
        let x_position;
        let y_position;
        let ending_x;
        let ending_y;
        let failed; 
        let letter;
        let new_pos_x;
        let new_pos_y;
        let letter_disposed; 

        for (let i = 0; i < this.num_palabras; i++) {
            word = this.arreglo_palabras[i]; 
            word_length = this.arreglo_palabras[i].length;
            placed = false; 

            while (!placed) {
                orientation = this.possible_orientations[Math.floor(Math.random()*this.possible_orientations.length)];
                if (orientation == 'leftright') {
                    step_x = 1; 
                    step_y = 0;
                }
                if (orientation === 'updown') {
                    step_x = 0; 
                    step_y = 1;
                }
                x_position = Math.floor(Math.random()*(this.columnas)); 
                y_position = Math.floor(Math.random()*(this.filas));

                ending_x = x_position + step_x*word_length;
                ending_y = y_position + step_y*word_length;

                // Can the word be placed? 
                // no, it cant 
                if (ending_x < 0 || ending_x >= this.columnas) {
                    continue; 
                }
                if (ending_y < 0 || ending_y >= this.filas) {
                    continue; 
                }
                // ofc it can!
                failed = false; 
                for (let j = 0; j < word_length; j++) {
                    letter = word.charAt(j);
                    // console.log('Buscando posicionar letra: ', letter)
                    new_pos_x = x_position + j*step_x;
                    new_pos_y = y_position + j*step_y;
                    // is there a letter in the position?
                    letter_disposed = this.soup[new_pos_x][new_pos_y];
                    if (letter_disposed === '_') {
                        continue;
                    } else if (letter_disposed === letter) {
                        continue;
                    } else {
                        failed = true;
                        break;
                    }
                }
                

                if (failed) {
                    continue; 
                } else {
                    let aux = []
                    for (let u = 0; u < word_length; u++) {
                        letter = word.charAt(u);
                        new_pos_x = x_position + u*step_x;
                        new_pos_y = y_position + u*step_y;
                        aux.push([new_pos_x, new_pos_y])
                        this.soup[new_pos_x][new_pos_y] = letter;
                    }
                    this.saved_locations.push(aux)
                    placed = true; 
                }
                

            }

        }
    }

    fill_soup () {
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                if (this.soup[i][j] === '_') {
                    this.soup[i][j] = this.alphabet.charAt(Math.floor(Math.random()*this.alphabet.length))
                }
            }
        }
    }

    print_soup() {
        for (let i = 0; i < this.filas; i++) {
            console.log(this.soup[i])
        }
        console.log(this.saved_locations)
    }

    gen_soup () {
        this.soup = this.gen_empty_soup();
        this.place_words();
        this.fill_soup();
        // this.print_soup(); 
    }
 
    
}