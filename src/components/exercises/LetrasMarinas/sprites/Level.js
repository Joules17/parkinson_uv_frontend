// Assets
import object_list from 'components/exercises/general_assets/images/objects/object_list.js';
// Custom Classes Imported
import LetterSoup from './LetterSoup';
import Bubble from './Bubble';
import Board from './Board';

export default class Level {
    constructor (config) {
        this.scene = config.scene;
        this.pos_initx = config.pos_initx;
        this.pos_inity = config.pos_inity;
        this.number_cols = config.number_cols;
        this.number_rows = config.number_rows;
        this.number_words = config.number_words;
        this.categories = config.categories;
        this.active = config.active; 
        this.objects = object_list;
        this.selected_words = [];
        this.current_bubble = undefined;
        this.current_word = undefined;
        this.current_index = 0;
        this.victory = false;
        this.sopita = [];
        this.board = undefined;
        this.bubbles = [];
        this.gen_level();
    }


    search_random_words (selected_categories, number_words) {
        let random_words = [];
        let merge_category = [];
        // Search only in selected categories
        for (let i = 0; i < selected_categories.length; i++) {
            merge_category = merge_category.concat(Object.keys(this.objects[selected_categories[i]]));
        }

        // Cleaning words with more than 10 letters
        merge_category = merge_category.filter(category => category.length < 10);
        // Merging Categories
        merge_category.sort(() => Math.random() - 0.5)
        // console.log(merge_category) // all categories merged
        random_words = merge_category.slice(0, number_words);
        // Las pasamos a mayusculas:
        random_words = random_words.map(word => word.toUpperCase());

        return random_words;
    }

    gen_level() {
        this.selected_words = this.search_random_words(this.categories, this.number_words);
        console.log(this.selected_words)
        this.sopita = new LetterSoup({scene: this.scene, num_palabras: this.number_words, arreglo_palabras: this.selected_words, filas: this.number_rows, columnas: this.number_cols})
        this.board = new Board({scene: this.scene, nivel: this, sopita: this.sopita, pos_x: this.pos_initx, pos_y: this.pos_inity, active: this.active})
        this.create_bubbles();

        this.board.mostrar(this.active); 
    }

    search_key_dictionary (word) {
        for (const categoria in this.objects) {
            const category_object = this.objects[categoria];
            for (const objeto in category_object) {
                if (objeto.toLowerCase() === word.toLowerCase()) {
                    return {
                        categoria: categoria,
                        key: category_object[objeto].key,
                        imagen: category_object[objeto].imagen,
                    };
                }
            }
        }

        return null;
    }

    create_bubbles() {
        this.selected_words.forEach(word => {
            this.bubbles.push(new Bubble({scene: this.scene, posx: 670, posy: 300, figure: this.search_key_dictionary(word).key , visible: false}))
        });
    }

    execute_level() {
        this.show_level(true); 
        this.current_word = this.selected_words[this.current_index];
        this.current_bubble = this.bubbles[this.current_index]
        this.current_bubble.mostrar(true);
    }

    guessed_word () {
        if (this.current_index !== this.selected_words.length-1) {
            this.current_index += 1;
            this.scene.words_text.setText('Palabras:'+this.current_index+'/'+this.selected_words.length)
            this.current_bubble.mostrar(false);
            this.current_word = this.selected_words[this.current_index];
            this.current_bubble = this.bubbles[this.current_index]
            this.current_hint = 0; 
            this.current_bubble.mostrar(true);
        } else {
            this.victory = true;
            this.victory_level(); 
        }
    }

    victory_level () {
        this.kill_bubbles()
        this.show_level(false); 
        this.scene.flag = true; 
    }

    kill_bubbles () {
        this.bubbles.forEach(bubble => {
            bubble.mostrar(false); 
        })
    }

    show_hint () {
        console.log(this.sopita)
        console.log(this.sopita.saved_locations)
        let pista_aux = this.sopita.saved_locations[this.current_index][0];
        console.log(pista_aux, 'QUE COÑOSS')
        let number_parada = (pista_aux[0]*10) + pista_aux[1]; 
        console.log(number_parada, 'QUE COÑOSS')
        this.board.getChildren()[number_parada].hinting(); 
    }

    show_level(bool)  {
        this.visible = bool; 
        this.board.mostrar(bool);
    }


}