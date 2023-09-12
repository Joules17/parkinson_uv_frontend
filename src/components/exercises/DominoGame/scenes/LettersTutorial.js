// phaser library
import Phaser from 'phaser';

// styles
import 'components/exercises/general_assets/styles.css'

// custom classes imported:
import Level from 'components/exercises/DominoGame/sprites/levelObj'
import FullScreenBttn from 'components/Factory/FullScreenBttn';

// assets imports
import bg_tuto from 'components/exercises/DominoGame/assets/images/bg_tuto.png'; 
import fullscreen from '../assets/images/fullscreen.png';

// audio
import hover from 'components/exercises/DominoGame/assets/music/hover.mp3'
import correct from 'components/exercises/DominoGame/assets/music/correct.wav'
import bad from 'components/exercises/DominoGame/assets/music/bad.wav';

export default class LettersTutorial extends Phaser.Scene {
    constructor() {
        super({key: 'LettersTutorial', backgroundColor: '#3f1651'});
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
        this.active_listener = false; 

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
        this.load.audio('bad', bad); 
        this.load.audio('hover', hover);
        this.load.audio('correct', correct);
    }

    create () {
        this.anims.create({
            key: 'bd_anim_tuto',
            frames: this.anims.generateFrameNumbers('bg_tuto', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        const sprite = this.add.sprite(400, 300, 'bg_tuto');
        sprite.play('bd_anim_tuto');
        
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

        // circles
        // yes circle 
        this.circle_yes = this.add.graphics(); 
        this.circle_yes.fillStyle(0x006400, 0.5);
        this.circle_yes.fillCircle(480, 475, 50);
        this.circle_yes.lineStyle(2, 0x004000);
        this.circle_yes.strokeCircle(480, 475, 50);
        this.circle_yes.setDepth(1)

        this.text_yes = this.add.text(480, 475, 'SI', {fontFamily: 'Atarian', fill: '#ffffff'}).setFontSize(60);
        this.text_yes.setOrigin(0.5);
        this.text_yes.setDepth(2)
        this.text_yes.setInteractive();

        this.circle_yes.setAlpha(0); 
        this.text_yes.setAlpha(0); 
        
        // no circle 
        this.circle_no = this.add.graphics();
        this.circle_no.fillStyle(0xFF0000, 0.5);
        this.circle_no.fillCircle(320, 475, 50);
        this.circle_no.lineStyle(2, 0x800000);
        this.circle_no.strokeCircle(320, 475, 50);
        this.circle_no.setDepth(1)

        this.text_no = this.add.text(325, 475, 'NO', {fontFamily: 'Atarian', fill: '#ffffff'}).setFontSize(60);
        this.text_no.setOrigin(0.5);
        this.text_no.setDepth(2)
        this.text_no.setInteractive();

        this.circle_no.setAlpha(0); 
        this.text_no.setAlpha(0);

        // button play 
        this.play_button = this.add.text(650, 540, "JUGAR", {
            fontFamily: 'Atarian',
            fill: '#ffffff'
        }).setFontSize(40)  

        this.play_button.setInteractive(); 
        this.play_button.setVisible(false); 

        // listeners
        this.text_yes.on('pointerover', () => {
            this.sound.play('hover')
        });

        this.text_no.on('pointerover', () => {
            this.sound.play('hover')
        });

        this.text_yes.on('pointerout', () => {
            this.circle_yes.x = 0;
        });

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
              this.sound.play('correct')
              this.scene.start('DominoGame', {settings})
        }); 
      
        this.play_button.on('pointerover', () => {
            this.sound.play('hover')
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
        this.tableros.push('Izquierda es SI solo para numeros');
        for (let i = 0; i < 10; i++) {
            this.tableros.push(new Level(this.third_level_config));
        }
        this.tableros.push('Izquierda numeros, Derecha letras, siempre recuerdalo');
        for (let i = 0; i < 15; i++) {
            this.tableros.push(new Level(this.fifth_level_config));
        }
        this.tableros.push('Has completado el tutorial, ¡estas listo!')
        for (let i = 0; i < 100; i++) {
            this.tableros.push(new Level(this.fifth_level_config));
        }

        this.flag = true;
    }

    incorrect_answer () {
        this.sound.play('bad')
    }

    correct_answer() {
        this.sound.play('correct')
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


}