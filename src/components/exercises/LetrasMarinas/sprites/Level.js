// Assets
import object_list from 'components/exercises/general_assets/images/objects/object_list.js';
// Custom Classes Imported 
import LetterSoup from './LetterSoup';
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
        this.objects = object_list;
        this.selected_words = []; 
        this.sopita = []; 
        this.board = undefined; 
        this.gen_level(); 
    } 


    search_random_words (selected_categories, number_words) {
        let random_words = []; 
        let merge_category = [];    
        // Search only in selected categories
        for (let i = 0; i < selected_categories.length; i++) {
            merge_category = merge_category.concat(Object.keys(this.objects[selected_categories[i]]));
        }

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
        this.board = new Board({scene: this.scene, sopita: this.sopita, pos_x: this.pos_initx, pos_y: this.pos_inity, active: true})
    }
}