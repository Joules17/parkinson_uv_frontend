// phaser library
import Phaser from 'phaser';
import '../styles.css';

// custom classes
import Board from '../sprites/Board';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// import sounds
import good from '../assets/music/correct.wav';
import bad from '../assets/music/bad.wav';
import hover from '../assets/music/hover.mp3';

// assets imports
import bushes from '../assets/img/bushes.png';
import bushes2 from '../assets/img/bushes2.png';
import monkey from '../assets/img/monkey.png';
import object_list from '../sprites/object_list';
import fullscreen from '../assets/img/fullscreen.png';

export default class FrutasticLoby extends Phaser.Scene {
    constructor() {
        super({ key: 'FrutasticLoby', backgroundColor: '#3f1651' });

        // dimensions
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // text
        this.title = undefined;
        this.explanation = undefined;
        this.explanation2 = undefined;
        this.good_description = undefined;
        this.bad_description = undefined;
        this.mensaje_final = undefined;

        // figures
        this.panel = undefined;
        this.divider = undefined;
        this.panel_explanation = undefined;
        this.bushes_sprite = undefined;
        this.bushes_sprite2 = undefined;
        this.panel_round = undefined;

        // board variables
        this.board = undefined;
        this.tablero_actual = undefined;
        this.lista_tablero = undefined;
        this.flag = false;
        this.fin_del_lobby = false;
        this.score = undefined;
        this.counter = undefined;

        // button
        this.go_button = undefined;

        // board config example
        this.board_config = {
            scene: this,
            game_width: 380,
            game_height: 200,
            pos_inity: 280,
            pos_initx: 120,
            number_objects: 5,
            padding: 50,
            spriteWidth: 40,
            spriteHeight: 5,
            sprite_scale: 0.17,
            category: ['frutas', 'comida', 'casa'],
            actual: false, // propiedad visible del tablero,
            color_wished: undefined
        };
    }

    preload() {
        // images
        this.load.image('bushes', bushes);
        this.load.image('bushes2', bushes2);
        this.load.image('monkey', monkey);
        this.load.image('fullscreenImg', fullscreen);

        for (let categoria in object_list) {
            // busca cada subcategoria para cargar su correspondiente imagen
            // console.log(`Elementos en la categoría ${categoria}:`)
            for (let subcategoria in object_list[categoria]) {
                this.load.image(object_list[categoria][subcategoria]['key'], object_list[categoria][subcategoria]['imagen']);
            }
        }

        // audio
        this.load.audio('bad', bad);
        this.load.audio('good', good);
        this.load.audio('hover', hover);
    }

    create() {
        this.cameras.main.setBackgroundColor(0x4e9de0);

        this.panel_round = this.add.graphics();
        this.panel_round.fillStyle(0xffffff, 1);
        this.panel_round.fillRect(50, 150, 700, 500);
        this.panel_round.setAlpha(0);

        // Figuras de fondo ------------------------------------------------------------------------------------------------------------
        this.bushes_sprite = this.add.sprite(100, 550, 'bushes').setScale(0.12);
        this.bushes_sprite2 = this.add.sprite(600, 550, 'bushes2').setScale(0.12);
        // titulo ------------------------------------------------------------------------------------------------------------
        this.title = this.add.text(50, 25, 'TUTORIAL', { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(100);
        this.explanation = this.add
            .text(240, 160, 'Mira las frutas a continuacion', { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(25);
        this.explanation2 = this.add
            .text(240, 155, 'Selecciona la fruta nueva, \nsi solo hay una, ¡haz click en ella!', { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(20);
        this.explanation2.setVisible(false);

        this.good_description = this.add
            .text(240, 155, '¡Excelente! Sigue asi, si necesitas\nayuda, haz click en el monito', { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(20);
        this.bad_description = this.add
            .text(230, 160, 'Error: Recuerda que debes seleccionar\n¡La fruta nueva! Haz click en el monito para mas ayuda', {
                fontFamily: 'TROUBLE',
                fill: '#000000'
            })
            .setFontSize(15);
        this.good_description.setVisible(false);
        this.bad_description.setVisible(false);

        this.mensaje_final = this.add
            .text(100, 350, '¡Muy bien! Ya estas listo, ', { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(40);
        this.mensaje_final.setVisible(false);

        // button ------------------------------------------------------------------------------------------------------------
        this.go_button = this.add
            .text(190, 400, 'HAZ CLICK AQUI', {
                fontFamily: 'TROUBLE',
                fill: '#4e9de0'
            })
            .setFontSize(50);
        this.go_button.setInteractive();
        this.go_button.setVisible(false);

        // board ------------------------------------------------------------------------------------------------------------
        this.board = new Board(this.board_config);
        this.lista_tablero = this.board.get_matrices();
        console.log('tableros creados', this.lista_tablero);

        // fullScreenButton ---------------------------------------------------------------------------------------------------
        new FullScreenBttn(this, 770, 30, 'fullscreenImg');

        // transitions ------------------------------------------------------------------------------------------------------------
        this.move_upside(this.bushes_sprite, -60, 2000, this);
        this.move_upside(this.bushes_sprite2, -60, 2000, this);
        // events ------------------------------------------------------------------------------------------------------------
        this.go_button.on('pointerdown', () => {
            this.sound.play('good');
            this.scene.start('FrutasticRondas');
        });

        this.go_button.on('pointerover', () => {
            this.sound.play('hover');
            this.tweens.add({
                targets: this.go_button,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 100,
                ease: 'Power2'
            });
        });

        this.go_button.on('pointerout', () => {
            this.tweens.add({
                targets: this.go_button,
                scaleX: 1,
                scaleY: 1,
                duration: 100,
                ease: 'Power2'
            });
        });
    }
    update() {
        if (this.flag) {
            if (!(this.tablero_actual === undefined)) {
                this.tablero_actual.setVisible(false);
            }
            this.pon_tablero();
        }
        if (this.fin_del_lobby) {
            console.log('el loby tutorial termino correctamente');
            this.mensaje_final.setVisible(true);
            this.go_button.setVisible(true);
            // this.scene.start('FrutasticRondas')
            this.fin_del_lobby = false;
        }
        if (this.score == -1 && this.counter == 0) {
            this.bad_description.setVisible(true);
            this.good_description.setVisible(false);
            this.explanation2.setVisible(false);
        }
        if (this.score == 1 && this.counter == 0) {
            this.bad_description.setVisible(false);
            this.good_description.setVisible(true);
            this.explanation2.setVisible(false);
        }
    }

    // Customs functions
    move_upside(spt, position, duration, scene) {
        spt.originalY = spt.originalY - position;
        this.tweens.add({
            targets: spt,
            y: spt.y - position,
            duration: duration,
            ease: 'Power2',
            yoyo: false,
            repeat: 0,
            onComplete: function () {
                scene.aparecer(scene.panel_round, scene);
            }
        });
    }

    aparecer(obj, scene) {
        this.tweens.add({
            targets: obj,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            onComplete: function () {
                scene.explanation.setVisible(false);
                scene.explanation2.setVisible(true);
                scene.flag = true;
            }
        });
    }

    pon_tablero() {
        if (this.lista_tablero.length != 0) {
            this.tablero_actual = this.lista_tablero.shift();
            // console.log('tablero actual: ', this.tablero_actual)
            this.tablero_actual.setVisible(true);
            this.flag = false;
        } else {
            this.fin_del_lobby = true;
            this.flag = false;
        }
    }

    getScore() {
        return this.score;
    }

    setScore(val) {
        this.score = val;
    }

    setStatus(val) {
        this.flag = val;
    }
}
