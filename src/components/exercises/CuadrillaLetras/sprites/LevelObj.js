// custom classes 
import SteroidChar from "./SteroidChar";

export default class LevelObj {
    constructor (config) {
        this.scene = config.scene; 
        this.posx = config.posx;
        this.posy = config.posy;
        this.game_width = config.game_width;
        this.game_height = config.game_height;
        this.sprite_scale = config.sprite_scale;
        this.actual = config.actual;

        this.consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
        this.vocals = 'AEIOU';

        this.pares = '2468'
        this.impares = '13579'
        
        // vars
        this.side_option = ['upper_right', 'upper_left', 'lower_right', 'lower_left'];
        this.side_selected = config.side_selected;
        this.answer_option = ['yes', 'no'];
        this.object_option = undefined; 
        this.correct_option = config.correct_option;

        // gen_env function 
        this.gen_env(); 
    }

    gen_env() {
        if (this.side_selected === undefined && this.correct_option === undefined) {
            this.side_selected = this.side_option[Math.floor(Math.random() * this.side_option.length)];
            this.correct_option = this.answer_option[Math.floor(Math.random() * this.answer_option.length)];
        } 
        var content, gen_x, gen_y, color; 
        gen_y = (this.game_height / 2) + 15
        if (this.side_selected === 'upper_right') {
            gen_x = this.posx + (this.game_width - (this.game_width / 4))-40;
            gen_y = gen_y - 70
            color = '#032670'; // blue
            content = 
                this.correct_option === 'yes'
                    ? this.consonants.charAt(Math.floor(Math.random() * this.consonants.length))
                    : this.random_unit([1]); 
        } 
        if (this.side_selected === 'upper_left') {
            gen_x = this.posx + (this.game_width / 4) - 80;
            gen_y = gen_y - 70
            color = '#ffffff';
            content = 
                this.correct_option === 'yes'
                    ? this.pares.charAt(Math.floor(Math.random() * this.pares.length))
                    : this.random_unit([4]);
        } 
        if (this.side_selected === 'lower_right') {
            gen_x = this.posx + (this.game_width - (this.game_width / 4))-40; 
            gen_y = gen_y + 110
            color = '#ffffff'; 
            content = 
                this.correct_option === 'yes'
                    ? this.vocals.charAt(Math.floor(Math.random() * this.vocals.length))
                    : this.random_unit([2]);
        }
        if (this.side_selected === 'lower_left') {
            gen_x = this.posx + (this.game_width / 4) - 80;
            gen_y = gen_y + 110
            color = '#032670'; // blue
            content = 
                this.correct_option === 'yes'
                    ? this.impares.charAt(Math.floor(Math.random() * this.impares.length))
                    : this.random_unit([3]);
        }

        this.object_option = new SteroidChar({
            scene: this.scene,
            posx: gen_x,
            posy: gen_y,
            key: content,
            original_scale: this.sprite_scale,
            correct_option: this.correct_option,
            color: color,
            actual: this.actual
        })
    }

    get_correct_option() {
        return this.correct_option;
    }

    set_visible (bool) {
        this.object_option.set_visible(bool);
    }

    // Retorna un random_unit entre consonantes, vocales y numeros
    random_unit(exception) {
        var options = [1, 2, 3, 4].filter(option => !exception.includes(option));
        
        var option = options.length > 0
          ? options[Math.floor(Math.random() * options.length)]
          : null;
      
        var content;
      
        if (option === 1) {
          content = this.consonants.charAt(Math.floor(Math.random() * this.consonants.length));
        } else if (option === 2) {
          content = this.vocals.charAt(Math.floor(Math.random() * this.vocals.length));
        } else if (option === 3) {
          content = this.impares.charAt(Math.floor(Math.random() * this.impares.length));
        } else if (option === 4) {
          content = this.pares.charAt(Math.floor(Math.random() * this.pares.length));
        }
      
        return content;
      }
}