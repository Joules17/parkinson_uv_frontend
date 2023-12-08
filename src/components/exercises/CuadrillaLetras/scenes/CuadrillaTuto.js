// phaser library
import Phaser from 'phaser';

// styles
import 'components/exercises/general_assets/styles.css'

// custom classes imported:
import LevelObj from 'components/exercises/CuadrillaLetras/sprites/LevelObj'
import FullScreenBttn from 'components/Factory/FullScreenBttn';

export default class CuadrillaTuto extends Phaser.Scene {
    constructor() {
        super({key: 'CuadrillaTuto', backgroundColor: '#3f1651'});
    }

    preload() {}

    builder () {
        // dimensions
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // vars
        this.tableros = [];
        this.tablero_actual = undefined;
        this.active_listener = false; 

        this.first_level_config = {
            scene: this,
            posx: 100,
            posy: 95,
            game_width: 600,
            game_height: 220,
            sprite_scale: 150,
            actual: false,
            side_selected: 'upper_right',
            correct_option: 'yes'
        };

        // 2nd tutorial config
        this.second_level_config = {
            scene: this,
            posx: 100,
            posy: 95,
            game_width: 600,
            game_height: 220,
            sprite_scale: 150,
            actual: false,
            side_selected: 'upper_left',
            correct_option: 'no'
        }

        // 3rd tutorial config
        this.third_level_config = {
            scene: this,
            posx: 100,
            posy: 95,
            game_width: 600,
            game_height: 220,
            sprite_scale: 150,
            actual: false,
            side_selected: 'lower_right',
            correct_option: 'yes'
        }

        // 4rd tutorial config
        this.four_level_config = {
            scene: this,
            posx: 100,
            posy: 95,
            game_width: 600,
            game_height: 220,
            sprite_scale: 150,
            actual: false,
            side_selected: 'lower_left',
            correct_option: 'no'
        }

        // 5th level config
        this.fifth_level_config = {
            scene: this,
            posx: 100,
            posy: 95,
            game_width: 600,
            game_height: 220,
            sprite_scale: 150,
            actual: false,
            side_selected: undefined,
            correct_option: undefined
        }
    }

    create () {
        // constructor aux
        this.builder();

        // game ---
        this.game = this.sys.game
        this.add.sprite(400, 300, 'BgForest');
        
        // fullScreenButton
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        // Listeners del teclado --------------------------------------------------
        this.input.keyboard.on('keydown', this.handle_keydown, this); 

        // panel
        this.panel_upper_izq_shade = this.add.graphics();
        this.panel_upper_izq_shade.fillStyle(0x000000, 0.8);
        this.panel_upper_izq_shade.fillRoundedRect(60, 75, 340, 175, 20);
        this.panel_upper_izq = this.add.graphics(); 
        this.panel_upper_izq.fillStyle(0xe0bc28, 1);
        this.panel_upper_izq.fillRoundedRect(60, 70, 340, 175, 20); 
        
        this.panel_upper_der_shade = this.add.graphics();
        this.panel_upper_der_shade.fillStyle(0x000000, 0.8);
        this.panel_upper_der_shade.fillRoundedRect(410, 75, 340, 175, 20);
        this.panel_upper_der = this.add.graphics();
        this.panel_upper_der.fillStyle(0xffffff, 1);
        this.panel_upper_der.fillRoundedRect(410, 70, 340, 175, 20);

        this.panel_lower_izq_shade = this.add.graphics();
        this.panel_lower_izq_shade.fillStyle(0x000000, 0.8);
        this.panel_lower_izq_shade.fillRoundedRect(60, 265, 340, 175, 20);
        this.panel_lower_izq = this.add.graphics();
        this.panel_lower_izq.fillStyle(0xffffff, 1);
        this.panel_lower_izq.fillRoundedRect(60, 260, 340, 175, 20);

        this.panel_lower_der_shade = this.add.graphics();
        this.panel_lower_der_shade.fillStyle(0x000000, 0.8);
        this.panel_lower_der_shade.fillRoundedRect(410, 265, 340, 175, 20);
        this.panel_lower_der = this.add.graphics();
        this.panel_lower_der.fillStyle(0xe0bc28, 1);
        this.panel_lower_der.fillRoundedRect(410, 260, 340, 175, 20); 

        this.panel_tuto = this.add.graphics();
        this.panel_tuto.fillStyle(0x000000, 1);
        this.panel_tuto.fillRect(10, 5, 160, 55);

        // text
        this.title = this.add.text(20, 15, 'TUTORIAL', {
            fontFamily: 'TROUBLE',
            fill: '#eb3724',
        }).setFontSize(50);
        
        // panel explanation 
        this.panel_explanation = this.add.graphics(); 
        this.panel_explanation.fillStyle(0x000000, 1);        
        this.panel_explanation.fillRect(60, 530, 700, 60); 
        this.text_explanation = this.add.text(80, 540, 'Bienvenido al tutorial', {
            fontFamily: 'TROUBLE', 
            fill: '#eb3724',
        }).setFontSize(40); 

        // circles
        // yes circle 
        this.circle_yes = this.add.graphics();
        this.circle_yes.fillStyle(0x000000, 1);
        this.circle_yes.fillRect(420, 460, 120, 60);

        this.text_yes = this.add.text(480, 490, 'SI', {fontFamily: 'TROUBLE', fill: '#3bb173'}).setFontSize(60);
        this.text_yes.setOrigin(0.5);
        this.text_yes.setDepth(2)
        this.text_yes.setInteractive();

        this.circle_yes.setAlpha(0); 
        this.text_yes.setAlpha(0); 
        
        // no circle 
        this.circle_no = this.add.graphics();
        this.circle_no.fillStyle(0x000000, 1);
        this.circle_no.fillRect(260, 460, 120, 60);
        this.circle_no.setDepth(1)

        this.text_no = this.add.text(325, 490, 'NO', {fontFamily: 'TROUBLE', fill: '#eb3724'}).setFontSize(60);
        this.text_no.setOrigin(0.5);
        this.text_no.setDepth(2)
        this.text_no.setInteractive();

        this.circle_no.setAlpha(0); 
        this.text_no.setAlpha(0);

        // Divider --------------------------------------------------------------------------------------------
        this.divider = this.add.graphics(); 
        this.divider.fillStyle(0x000000, 1);
        this.divider.fillRect(398, 460, 4, 60);

        // arrows --------------------------------------------------------------------------------------------
        this.arrow_right = this.add.sprite(580, 490, 'NeutralArrowRight').setScale(0.1);
        this.arrow_left = this.add.sprite(220, 490, 'NeutralArrowLeft').setScale(0.1);

        // button play 
        this.play_button = this.add.text(650, 540, "JUGAR", {
            fontFamily: 'TROUBLE',
            fill: '#ffffff'
        }).setFontSize(40)  

        this.play_button.setInteractive(); 
        this.play_button.setVisible(false); 

        // listeners
        this.text_yes.on('pointerover', () => {
            this.sound.play('HoverSound')
        });

        this.text_no.on('pointerover', () => {
            this.sound.play('HoverSound')
        });

        this.text_yes.on('pointerout', () => {
            this.circle_yes.x = 0;
        });

        // 
        this.text_yes.on('pointerdown', () => {
            if (this.active_listener) {
                if (!(this.correct_actual_option === undefined)) {
                    if (this.correct_actual_option === 'yes') {
                        this.correct_answer();
                    } else {
                        this.incorrect_answer();
                    }
                }
            }
        });

        this.text_no.on('pointerdown', () => {
            if (this.active_listener) {
                if (!(this.correct_actual_option === undefined)) {
                    if (this.correct_actual_option === 'no') {
                        this.correct_answer();
                    } else {
                        this.incorrect_answer();
                    }
                }
            }
        });

        this.text_no.on('pointerout', () => {
            this.circle_no.x = 0;
        });

        this.play_button.on('pointerdown', () => {
              const settings = this.sys.settings.data.settings;
              this.sound.play('CorrectSound')
              this.scene.start('CuadrillaMain', {settings}, {game: this.game})
        }); 
      
        this.play_button.on('pointerover', () => {
            this.sound.play('HoverSound')
            this.tweens.add({
              targets: this.play_button,
              scaleX: 1.1,
              scaleY: 1.1,
              duration: 100,
              ease: 'Power2'
            });
        });
      
        this.play_button.on('pointerout', () => {
            this.tweens.add({
                targets: this.play_button,
                scaleX: 1,
                scaleY: 1,
                duration: 100,
                ease: 'Power2'
            });
        });

        // auxiliar texts 
        this.helper_upper_left = this.add.text(190, 200, 'PARES', {fontFamily: 'TROUBLE', stroke: '#000000', strokeThickness: 4, fill: '#ffffff'}).setFontSize(40);
        this.helper_lower_left = this.add.text(180, 390, 'IMPARES', {fontFamily: 'TROUBLE', stroke: '#000000', strokeThickness: 4, fill: '#ffffff'}).setFontSize(40);
        this.helper_upper_right = this.add.text(480, 200, 'CONSONANTES', {fontFamily: 'TROUBLE', stroke: '#000000', strokeThickness: 4, fill: '#ffffff'}).setFontSize(40);
        this.helper_lower_right = this.add.text(510, 390, 'VOCALES', {fontFamily: 'TROUBLE', stroke: '#000000', strokeThickness: 4, fill: '#ffffff'}).setFontSize(40);
        this.tweens.add({
            targets: [this.helper_upper_left, this.helper_lower_left, this.helper_upper_right, this.helper_lower_right],
            scaleX: 1.1,  // Escala X a 1.2 (crecer)
            scaleY: 1.1,  // Escala Y a 1.2 (crecer)
            duration: 1000,  // Duración en milisegundos
            yoyo: true,  // Hacer que el Tween vuelva a la escala original
            repeat: -1  // Repetir indefinidamente
          });
        // create rounds
        this.create_rounds();
        this.aparecer_botones([this.circle_yes, this.circle_no, this.text_yes, this.text_no], this); 
    }

    update() {
        if (this.flag) {
            if (!(this.tablero_actual === undefined)) {
                if (!(typeof(this.tablero_actual) === 'string')) {
                    this.tablero_actual.set_visible(false);
                } 
            } 
            this.pon_tablero();
        }
        if (this.fin_del_juego) {
            console.log('Tutorial acabado')
            this.fin_del_juego = false;
        }

    }

    create_rounds() {
        for (let i = 0; i < 3; i++) {
            this.tableros.push(new LevelObj(this.first_level_config));
        }
        this.tableros.push('En cambio si hay numeros en la derecha es NO');
        for (let i = 0; i < 3; i++) {
            this.tableros.push(new LevelObj(this.second_level_config));
        }
        this.tableros.push('Tambien es NO si hay letras en la izquierda')
        for (let i = 0; i < 3; i++) {
            this.tableros.push(new LevelObj(this.four_level_config));
        }
        this.tableros.push('Izquierda es SI solo para numeros');
        for (let i = 0; i < 3; i++) {
            this.tableros.push(new LevelObj(this.third_level_config));
        }
        this.tableros.push('Izquierda numeros, Derecha letras, siempre recuerdalo');
        for (let i = 0; i < 10; i++) {
            this.tableros.push(new LevelObj(this.fifth_level_config));
        }
        this.tableros.push('Has completado el tutorial, ¡estas listo!')
        for (let i = 0; i < 100; i++) {
            this.tableros.push(new LevelObj(this.fifth_level_config));
        }

        this.flag = true;
    }

    incorrect_answer () {
        this.sound.play('BadSound')
    }

    correct_answer() {
        this.sound.play('CorrectSound')
        this.flag = true; 
    }

    pon_tablero () {
        
        if (this.tableros.length != 0) {
            this.tablero_actual = this.tableros.shift();
            if (typeof(this.tablero_actual) === 'string') {
                this.text_explanation.setText(this.tablero_actual)
                if (this.tablero_actual.length >= 50) {
                    this.text_explanation.setFontSize(35)
                }
                if (this.tablero_actual === 'Has completado el tutorial, ¡estas listo!') {
                    this.play_button.setVisible(true); 
                }
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

    aparecer_botones (list, scene) {
        this.tweens.add({
            targets: list, 
            alpha: 1, 
            duration: 4000, 
            ease: 'Power2', 
            onComplete: function () {
                if (!scene.eventFinished) {
                    scene.text_explanation.setText('Oprima SI cuando las letras esten a la derecha')
                    scene.active_listener = true; 
                }
            }

        })
    }

    handle_keydown(event) {
        // right - yes
        if (event.keyCode === 39) {
            if (!(this.correct_actual_option === undefined)) {
                if (this.correct_actual_option === 'yes') {
                    this.correct_answer();
                } else {
                    this.incorrect_answer();
                }
            }
        }
        // left - no
        if (event.keyCode === 37) {
            if (!(this.correct_actual_option === undefined)) {
                if (this.correct_actual_option === 'no') {
                    this.correct_answer();
                } else {
                    this.incorrect_answer();
                }
            }
        }
    }


}