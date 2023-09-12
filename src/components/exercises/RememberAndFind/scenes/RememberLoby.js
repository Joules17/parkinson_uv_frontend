// phaser library
import Phaser from 'phaser';

// css
import 'components/exercises/general_assets/styles.css';

// custom classes
import Board from '../sprites/Board';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class RememberLoby extends Phaser.Scene {
    constructor() {
        super({ key: 'RememberLoby', backgroundColor: '#3f1651' });

        // dimensions
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

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

    preload() { }

    create() {
        // Background ------------------------------------------------------------------------------------------------------------
        this.cameras.main.setBackgroundColor(0x4e9de0);
        this.bg = this.add.sprite(400, 300, 'BgSkye'); 

        // Title -----------------------------------------------------------------------------------------------------------------  
        this.welcome_title = this.add.text(50, 1000, 'TUTORIAL', { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(100)
        this.move_upside(this.welcome_title, 970, 1000, this, false)

        // Panel -----------------------------------------------------------------------------------------------------------------
        this.panel_round = this.add.graphics();
        this.panel_round.fillStyle(0xffffff, 1);
        this.panel_round.fillRect(0, 140, 1800, 600);
        this.panel_round.setAlpha(0);

        this.panel_title = this.add.graphics();
        this.panel_title.fillStyle(0x000000, 1);
        this.panel_title.fillRect(-10, 125, 1800, 60);
        this.panel_title.setAlpha(0);
    
        // Figuras de fondo ------------------------------------------------------------------------------------------------------------
        this.bushes_sprite = this.add.sprite(100, 550, 'FirstBush').setScale(0.12);
        this.bushes_sprite2 = this.add.sprite(600, 550, 'SecondBush').setScale(0.12);
        
        // Explanation Msg --------------------------------------------------------------------------------------------------------------
        this.explanation = this.add
            .text(60, 140, 'Mira los objetos a continuacion', { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(40)
            .setAlpha(0);

        this.explanation2 = this.add
            .text(120, 200, 'Selecciona el objeto nuevo, si solo hay uno, \n                  ¡haz click en el!', { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(40);
        this.explanation2.setVisible(false);

        this.good_description = this.add
            .text(250, 200, '¡Excelente! Sigue asi', { fontFamily: 'TROUBLE', fill: '#3bb173' })
            .setFontSize(40);
        this.bad_description = this.add
            .text(50, 200, 'Error: Recuerda que debes seleccionar La fruta nueva!', {
                fontFamily: 'TROUBLE',
                fill: '#e15554'
            })
            .setFontSize(40);
        this.good_description.setVisible(false);
        this.bad_description.setVisible(false);

        this.mensaje_final = this.add
            .text(220, 350, '¡Muy bien! Ya estas listo, ', { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(40);
        this.mensaje_final.setVisible(false);

        // Button: go ------------------------------------------------------------------------------------------------------------
        this.go_button = this.add
            .text(290, 400, 'HAZ CLICK AQUI', {
                fontFamily: 'TROUBLE',
                fill: '#4e9de0'
            })
            .setFontSize(50);
        this.go_button.setInteractive();
        this.go_button.setVisible(false);

        // Board -----------------------------------------------------------------------------------------------------------------
        this.board = new Board(this.board_config);
        this.lista_tablero = this.board.get_matrices();
        console.log('tableros creados', this.lista_tablero);

        // fullScreenButton ---------------------------------------------------------------------------------------------------
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        // transitions ------------------------------------------------------------------------------------------------------------
        this.move_upside(this.bushes_sprite, -60, 2000, this, true);
        this.move_upside(this.bushes_sprite2, -60, 2000, this, true);
        // events ------------------------------------------------------------------------------------------------------------
        this.go_button.on('pointerdown', () => {
            const settings = this.sys.settings.data.settings;
            console.log('ALO? ', settings)
            this.sound.play('CorrectSound');
            this.scene.start('RememberRondas', { settings });
        });

        this.go_button.on('pointerover', () => {
            this.sound.play('HoverSound');
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
            // console.log('El loby tutorial termino correctamente');
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
    move_upside(spt, position, duration, scene,  cont) {
        spt.originalY = spt.originalY - position;
        this.tweens.add({
            targets: spt,
            y: spt.y - position,
            duration: duration,
            ease: 'Power2',
            yoyo: false,
            repeat: 0,
            onComplete: function () {
                if (cont) {
                    scene.aparecer(scene.panel_round, scene);
                    scene.aparecer(scene.panel_title, scene);
                    scene.aparecer(scene.explanation, scene);
                }
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
