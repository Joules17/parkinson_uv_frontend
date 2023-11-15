// Custom Classes Imported
import Bubble from '../sprites/Bubble';

export default class Level {
    constructor(config) {
        this.scene = config.scene;
        this.number_levels = config.number_levels;

        // vars
        this.answer_option = ['yes', 'no']
        this.figure_options = ['Triangle', 'Circle', 'Star']
        this.list_bubbles = [];
        // gen_bubble
        this.gen_bubbles();
    }

    gen_bubbles () {
        let selected_figure = undefined;
        let selected_option = undefined;
        let previous_one = undefined;
        let random_index = undefined;
        for (let i = 0; i < this.number_levels; i++) {
            if (i === 0) {
                selected_figure = this.figure_options[Math.floor(Math.random() * this.figure_options.length)];
                selected_option = 'first';
            } else {
                previous_one = this.list_bubbles[i-1].getFigureSkin();
                selected_option = this.answer_option[Math.floor(Math.random() * this.answer_option.length)];
                if (selected_option === 'yes') {
                    // If its YES it means it gotta be the same as the previous one
                    selected_figure = previous_one;
                } else {
                    // If its NO it means it gotta be different from the previous one
                    do {
                        random_index = Math.floor(Math.random() * this.figure_options.length);
                    } while (this.figure_options[random_index] === previous_one);
                    console.log(typeof random_index, random_index, this.figure_options[random_index])
                    selected_figure = this.figure_options[random_index];
                }
            }
            // Creating Bubble
            this.list_bubbles.push(new Bubble({scene: this.scene, posx: 400, posy: 300, type: selected_figure, correct_option: selected_option}));
        }
    }

    // Checking if all bubbles were completed
    check_win () {
        let aux = true;
        for (let i = 0; i < this.list_bubbles.length; i++) {
            console.log('Burbuja: ' + i+ ': ' + this.list_bubbles[i].completed); 
            if (!this.list_bubbles[i].completed) {
                aux = false;
            }
        }
        return aux;
    }
}