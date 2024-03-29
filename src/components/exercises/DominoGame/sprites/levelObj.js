// custom classes
import steroid_object from './steroid_object'

export default class Level {
    constructor(config) {
        this.scene = config.scene;
        this.posx = config.posx;
        this.posy = config.posy;
        this.game_width = config.game_width;
        this.game_height = config.game_height;
        this.sprite_scale = config.sprite_scale;
        this.actual = config.actual;

        this.abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // vars
        this.side_option = ['right', 'left'];
        this.side_selected = config.side_selected;
        this.answer_option = ['yes', 'no'];
        this.object_option = undefined;
        this.correct_option = config.correct_option;

        // gen_env function
        this.gen_env();
    }

    gen_env() {
        if (this.side_selected === undefined && this.correct_option === undefined ) {
            this.side_selected = this.side_option[Math.floor(Math.random() * this.side_option.length)];
            this.correct_option = this.answer_option[Math.floor(Math.random() * this.answer_option.length)];
        }
        var content, gen_x, gen_y, color;
        gen_y = (this.game_height / 2) + 15
        if (this.side_selected === 'right') {
            gen_x = this.posx + (this.game_width - (this.game_width / 4)) - 50;
            color = '#032670'; // blue
            content =
                this.correct_option === 'yes'
                    ?  this.abecedario.charAt(Math.floor(Math.random() * this.abecedario.length))
                    : (Math.floor(Math.random() * 9) + 1).toString();
        } else {
            gen_x = this.posx + (this.game_width / 4) - 100;
            color = '#ffffff';
            content =
                this.correct_option === 'yes'
                    ? (Math.floor(Math.random() * 9) + 1).toString()
                    : this.abecedario.charAt(Math.floor(Math.random() * this.abecedario.length));
        }

        this.object_option = new steroid_object({
            scene: this.scene,
            posx: gen_x,
            posy: gen_y,
            key: content,
            original_scale: this.sprite_scale,
            correct_option: this.correct_option,
            color: color,
            actual: this.actual
        });
    }

    get_correct_option () {
        return this.correct_option;
    }

    set_visible(bool) {
        this.object_option.set_visible(bool);
    }
}
