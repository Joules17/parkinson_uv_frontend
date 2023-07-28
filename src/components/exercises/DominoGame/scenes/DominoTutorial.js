// phaser library
import Phaser from 'phaser';
import '../styles.css'

// custom classes imported:
import Level from 'components/exercises/DominoGame/sprites/levelObj'
import FullScreenBttn from 'components/Factory/FullScreenBttn';
// assets imports
import bg from 'components/exercises/DominoGame/assets/images/bg_bricks.jpg'
import bg_tuto from 'components/exercises/DominoGame/assets/images/bg_tuto.png'; 
import fullscreen from '../assets/images/fullscreen.png';

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
        this.load.spritesheet('bg_tuto', bg_tuto, { frameWidth: 800, frameHeight: 600 }); 
        this.load.image('fullscreenImg', fullscreen);
        // audio
        this.load.audio('hover', hover);
        this.load.audio('correct', correct);
    }

    create () {
        this.anims.create({
            key: 'bd_anim_game',
            frames: this.anims.generateFrameNumbers('bg_tuto', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        const sprite = this.add.sprite(400, 300, 'bg_tuto');
        sprite.play('bd_anim_game');
        
        // fullScreenButton
        new FullScreenBttn(this, 770, 30, 'fullscreenImg');

        
        // panel
        this.panel_title = this.add.graphics();
        this.panel_title.fillStyle(0x032670, 1);
        this.panel_title.lineStyle(2, 0xffffff);
        this.panel_title.fillRoundedRect(10, 10, 200, 50, 5); // Crea el rectángulo con bordes curvos
        this.panel_title.strokeRoundedRect(10, 10, 200, 50, 5); // Dibuja los bordes negros

        // text
        this.title = this.add.text(50, 15, 'TUTORIAL', {
            fontFamily: 'Atarian',
            fill: '#ffffff',
        }).setFontSize(40);
        
        // panel explanation 
        this.panel_explanation = this.add.graphics(); 
        this.panel_explanation.fillStyle(0x032670, 1);
        this.panel_explanation.lineStyle(2, 0xffffff);
        this.panel_explanation.fillRoundedRect(60, 530, 700, 60, 5); 
        this.panel_explanation.strokeRoundedRect(60, 530, 700, 60, 5); 
        this.text_explanation = this.add.text(80, 540, 'Bienvenido al tutorial', {
            fontFamily: 'Atarian', 
            fill: '#ffffff',
        }).setFontSize(40); 

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