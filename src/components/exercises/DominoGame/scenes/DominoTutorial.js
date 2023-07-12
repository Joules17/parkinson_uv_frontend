// phaser library
import Phaser from 'phaser';
import '../styles.css'

// custom classes imported:
import Level from 'components/exercises/DominoGame/sprites/levelObj'
// assets imports
import bg from 'components/exercises/DominoGame/assets/images/bg_bricks.jpg'

// audio
import hover from 'components/exercises/DominoGame/assets/music/hover.mp3'
import correct from 'components/exercises/DominoGame/assets/music/correct.wav'

export default class DominoTutorial extends Phaser.Scene {
    constructor() {
        super({key: 'DominoTutorial', backgroundColor: '#3f1651'});
        // dimensions
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // panel title
        this.panel_title = undefined;
        this.panel_explanation = undefined;
        this.title = undefined;
        this.explanation = undefined;

        // vars
        this.tableros = [];
        this.tablero_actual = undefined;

        // panels
        // base
        /*
        this.rectangle_base = this.add.graphics();
        this.rectangle_base.fillStyle(0x00000, 1);
        this.rectangle_base.lineStyle(2, 0x000000);
        this.rectangle_base.fillRoundedRect(100, 95, 600, 320, 5);
        this.rectangle_base.strokeRoundedRect(100, 95, 600, 320, 5);

        // left side
        this.left_side_base = this.add.graphics();
        this.left_side_base.fillStyle(0x714097, 1);
        this.left_side_base.lineStyle(1, 0x000000);
        this.left_side_base.fillRoundedRect(105, 100, 295, 310, 5);
        this.left_side_base.strokeRoundedRect(105, 100, 295, 310, 5);

        // right side
        this.right_side_base = this.add.graphics();
        this.right_side_base.fillStyle(0xd8d8d8, 1);
        this.right_side_base.lineStyle(1, 0x000000);
        this.right_side_base.fillRoundedRect(405, 100, 290, 310, 5);
        this.right_side_base.strokeRoundedRect(405, 100, 290, 310, 5);
        */
        // first tutorial config
        this.first_level_config = {
            scene: this,
            posx: 100,
            posy: 95,
            game_width: 600,
            game_height: 220,
            sprite_scale: 20,
            actual: false,
            side_selected: 'right',
            correct_option: 'yes'
        };

        // 2nd tutorial config
        this.second_level_config = {
            scene: this,
            posx: 100,
            posy: 95,
            game_width: 600,
            game_height: 220,
            sprite_scale: 20,
            actual: false,
            side_selected: 'right',
            correct_option: 'no'
        }

        // 3rd tutorial config
        this.third_level_config = {
            scene: this,
            posx: 100,
            posy: 95,
            game_width: 600,
            game_height: 220,
            sprite_scale: 20,
            actual: false,
            side_selected: 'left',
            correct_option: 'yes'
        }

        // 4rd tutorial config
        this.four_level_config = {
            scene: this,
            posx: 100,
            posy: 95,
            game_width: 600,
            game_height: 220,
            sprite_scale: 20,
            actual: false,
            side_selected: 'left',
            correct_option: 'no'
        }

        // 5th level config
        this.fifth_level_config = {
            scene: this,
            posx: 100,
            posy: 95,
            game_width: 600,
            game_height: 220,
            sprite_scale: 20,
            actual: false,
            side_selected: undefined,
            correct_option: undefined
        }
    }

    preload() {
        //images
        this.load.image('bg', bg);
        // audio
        this.load.audio('hover', hover);
        this.load.audio('correct', correct);
    }

    create () {
        this.bg = this.add.image(400, 300, 'bg').setScale(0.8);

        // panel
        this.panel_title = this.add.graphics();
        this.panel_title.fillStyle(0x032670, 1);
        this.panel_title.lineStyle(2, 0xffffff);
        this.panel_title.fillRoundedRect(100, 20, 600, 100, 5); // Crea el rectángulo con bordes curvos
        this.panel_title.strokeRoundedRect(100, 20, 600, 100, 5); // Dibuja los bordes negros

        // text
        this.title = this.add.text(280, 30, 'TUTORIAL', {
            fontFamily: 'Atarian',
            fill: '#ffffff',
        }).setFontSize(80);

        this.panel_explanation = this.add.graphics();
        this.panel_title.fillStyle(0x032670, 1);
        this.panel_title.lineStyle(2, 0xffffff);
        this.panel_title.fillRoundedRect(100, 500, 600, 80, 5);
        this.panel_title.strokeRoundedRect(100, 500, 600, 80, 5);

        this.explanation = this.add.text(180, 520, '¿Hay una letra en la derecha? Haz click en Sí', {
            fontFamily: 'Atarian',
            fill: '#ffffff'
        }).setFontSize(30);
        // create rounds
        this.create_rounds();
    }

    update() {
        if (this.flag) {
            if (!(this.tablero_actual === undefined)) {
                if (!(typeof(this.tablero_actual) === 'string')) {
                    this.tablero_actual.set_visible(false);
                }
                this.pon_tablero();
            }
        }
        if (this.fin_del_juego) {
            console.log('Tutorial acabado')
            this.fin_del_juego = false;
        }

    }

    create_rounds() {
        for (let i = 0; i < 15; i++) {
            this.tableros.push(new Level(this.first_level_config));
        }
        this.tableros.push('En cambio si hay numeros en la derecha es NO');
        for (let i = 0; i < 8; i++) {
            this.tableros.push(new Level(this.second_level_config));
        }
        this.tableros.push('Tambien es NO si hay letras en la izquierda')
        for (let i = 0; i < 10; i++) {
            this.tableros.push(new Level(this.four_level_config));
        }
        this.tableros.push('Izquierda es solo para numeros');
        for (let i = 0; i < 10; i++) {
            this.tableros.push(new Level(this.third_level_config));
        }
        this.tableros.push('Izquierda numeros, Derecha letras, siempre recuerdalo');
        for (let i = 0; i < 15; i++) {
            this.tableros.push(new Level(this.fifth_level_config));
        }
        this.tableros.push('Has completado el tutorial, ¡estas listo!')

        this.flag = true;
    }

    pon_tablero () {
        if (this.tableros.length != 0) {
            this.tablero_actual = this.tableros.shift();
            if (typeof(this.tablero_actual) === 'string') {
                this.explanation.setText(this.tablero_actual)
            } else {
                this.tablero_actual.set_visible(true);
                this.correct_actual_option = this.tablero_actual.get_correct_option();
                this.flag = false;
            }
        } else {
            this.fin_del_juego = true;
            this.flag = false;
        }
    }


}