// phaser library 
import Phaser from 'phaser';

// styles
import 'components/exercises/general_assets/styles.css'

// custom classes imported: 
import Level from 'components/exercises/LetraAventura/sprites/levelObj.js';
import keyboard from 'components/exercises/LetraAventura/sprites/keyboard';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class LetrasTuto extends Phaser.Scene {
    constructor() {
        super({key: 'LetrasTuto', backgroundColor: '#3f1651'});
    }

    preload () {}

    builder () {
        this.write_flag = true; 
        this.worldSizeWidth = 800; 
        this.worldSizeHeight = 600;

        // vars
        this.next_flag = false; 
        this.number_rounds = 3; 
        this.tableros = []; 
        this.tablero_actual = undefined; 
        this.flag = undefined; 
        this.time_flag = true;
        this.cursors = undefined; 
        this.errores = 0; 
        this.first_phase = false; 

        // alphabet
        this.alphabet = [
            'Q',
            'W',
            'E',
            'R',
            'T',
            'Y',
            'U',
            'I',
            'O',
            'P',
            'A',
            'S',
            'D',
            'F',
            'G',
            'H',
            'J',
            'K',
            'L',
            'Z',
            'X',
            'C',
            'V',
            'B',
            'N',
            'Ñ',
            'M'
        ];

        this.keyboard = undefined; 

        // config 
        this.level_config = {
            scene: this,
            min: 2, 
            limit: 10,
            game_width: this.worldSizeWidth,
            sprite_scale: 0.15,
            actual: false
        };
    }

    create () {
        // constructor aux 
        this.builder();

        // game --- 
        this.game = this.sys.game
        // Background 
        this.add.image(400, 300, 'BgMint'); 

        // Main_Panel 
        this.main_panel = this.add.graphics(); 
        this.main_panel.fillStyle(0xffffff, 1);
        this.main_panel.fillRect(0, 200, 800, 200);

        // Execution 
        this.create_rounds(); 

        // KeyBoard
        this.keyboard = new keyboard(this, 800, 30, 460, 35, this.alphabet, { fontFamily: 'TROUBLE',  fill: '#000000'}, (key) => {
            this.comprobar(key); 
        }); 

        // Listeners del teclado 
        this.input.keyboard.on('keydown', this.handle_keydown, this); 

        // Dialog 
        this.dialog_box = this.add.graphics(); 
        this.dialog_box.fillStyle(0x7768ad, 0.99);
        this.dialog_box.fillRect(100, 50, 600, 450).setAlpha(0);
        this.dialog_title = this.add.text(300, 70, 'BIENVENIDO', {fontFamily: 'TROUBLE', fontSize: '60px', fill: '#ffffff'}).setAlpha(0); 
        this.dialog_text = this.add.text(170, 130, 'PARA JUGAR UTILIZA EL TECLADO O EL RATON', {fontFamily: 'TROUBLE', fontSize: '35px', fill: '#000000'}).setAlpha(0)
        this.panel_circle = this.add.graphics(); 
        this.panel_circle.fillStyle(0xffffff, 1);
        this.panel_circle.fillCircle(400, 300, 120);
        this.panel_circle.lineStyle(5, 0x3bb173)
        this.panel_circle.strokeCircle(400, 300, 120).setAlpha(0);

        this.panel_circle_example = this.add.graphics(); 
        this.panel_circle_example.fillStyle(0xffffff, 1);
        this.panel_circle_example.fillCircle(250, 330, 70);
        this.panel_circle_example.lineStyle(5, 0x3bb173)
        this.panel_circle_example.strokeCircle(250, 330, 70).setAlpha(0);

        this.arrow = this.add.image(420, 330, 'RightArrowImg').setAlpha(0).setScale(0.15); 
        
        this.animation_movement(this.arrow, 'izquierda')

        this.panel_circle_example_letter = this.add.graphics(); 
        this.panel_circle_example_letter.fillStyle(0xffffff, 1);
        this.panel_circle_example_letter.fillCircle(550, 330, 70);
        this.panel_circle_example_letter.lineStyle(5, 0x3bb173)
        this.panel_circle_example_letter.strokeCircle(550, 330, 70).setAlpha(0);
        
        this.letter_sprite = this.add.sprite(250, 330, this.alphabet[0]).setScale(0.15).setAlpha(0); 
        this.letter_text = this.add.text(530, 290, this.alphabet[0], { fontFamily: 'TROUBLE', color: "#0000FF"}).setFontSize(100).setAlpha(0);

        this.panel_keyboard = this.add.image(400, 290, 'KeyboardAndMouseImg').setScale(0.3).setAlpha(0);
        this.panel_button = this.add.graphics(); 
        this.panel_button.fillStyle(0xffffff, 1);
        this.panel_button.fillRect(330, 440, 150, 50).setAlpha(0);
        this.button_continue = this.add.text(340, 450, 'ENTENDIDO', { fontFamily: 'TROUBLE', fontSize: '40px', fill: '#000000' }).setAlpha(0);
        this.button_continue.setInteractive(); 

        this.panel_button_fin = this.add.graphics(); 
        this.panel_button_fin.fillStyle(0xffffff, 1);
        this.panel_button_fin.fillRect(330, 440, 150, 50).setAlpha(0);
        this.button_continue_fin = this.add.text(340, 450, 'PRACTICAR', { fontFamily: 'TROUBLE', fontSize: '40px', fill: '#000000' }).setAlpha(0);
        this.button_continue_fin.setInteractive(); 
        
        // Dialog_End
        this.dialog_box_end = this.add.graphics();
        this.dialog_box_end.fillStyle(0x7768ad, 0.99);
        this.dialog_box_end.fillRect(100, 150, 600, 220).setAlpha(0);
        this.dialog_title_end = this.add.text(265, 170, 'FIN DEL TUTORIAL', { fontFamily: 'TROUBLE', fontSize: '60px', fill: '#ffffff' }).setAlpha(0);
        this.dialog_text_end = this.add.text(140, 250, 'Has terminado el tutorial, haz click en Jugar!', { fontFamily: 'TROUBLE', fontSize: '35px', fill: '#000000' }).setAlpha(0);
        
        // button_start_game
        this.panel_button_start_game = this.add.graphics();
        this.panel_button_start_game.fillStyle(0xffffff, 1);
        this.panel_button_start_game.fillRect(360, 310, 100, 50).setAlpha(0);
        this.button_start_game = this.add.text(370, 320, 'JUGAR', { fontFamily: 'TROUBLE', fontSize: '40px', fill: '#000000' }).setAlpha(0);
        
        this.button_start_game.setInteractive(); 
        // button_start_game
        this.button_start_game.on('pointerdown', () => {
            this.sound.play('FlipSound'); 
            const settings = this.sys.settings.data.settings
            this.scene.start('LetrasGame', {settings}, {game: this.game}); 
        }); 

        this.button_start_game.on('pointerover', () => {
            this.sound.play('HoverSound')
            this.button_start_game.setColor('#FF0000')
            this.tweens.add({
                targets: this.button_start_game,
                scale: 1.05,
                duration: 100,
                ease: 'Power2'
            });
        }); 

        this.button_start_game.on('pointerout', () => {
            this.button_start_game.setColor('#000000')
            this.tweens.add({
                targets: this.button_start_game,
                scaleX: 1,
                scaleY: 1,
                duration: 100,
                ease: 'Power2'
                });
        });
    
        // button_continue
        this.button_continue.on('pointerdown', () => {
            if (this.next_flag) {
                this.sound.play('FlipSound')
                this.aparecer([this.panel_circle, this.panel_keyboard, this.panel_button, this.button_continue], 0, 1000, this)
                this.open_dialogs(2)
            }
        }); 

        this.button_continue.on('pointerover', () => {
            this.sound.play('HoverSound')
            this.button_continue.setColor('#FF0000')
            this.tweens.add({
                targets: this.button_continue,
                scale: 1.05,
                duration: 100,
                ease: 'Power2'
            });
        });

        this.button_continue.on('pointerout', () => {
            this.button_continue.setColor('#000000')
            this.tweens.add({
                targets: this.button_continue,
                scaleX: 1,
                scaleY: 1,
                duration: 100,
                ease: 'Power2'
                });
        });

        // button_continue_fin 
        this.button_continue_fin.on('pointerdown', () => {
            this.sound.play('FlipSound')
            this.open_dialogs(3)
        }); 

        this.button_continue_fin.on('pointerover', () => {
            this.sound.play('HoverSound')
            this.button_continue_fin.setColor('#FF0000')
            this.tweens.add({
                targets: this.button_continue_fin,
                scale: 1.05,
                duration: 100,
                ease: 'Power2'
            });
        }); 

        this.button_continue_fin.on('pointerout', () => {
            this.button_continue_fin.setColor('#000000')
        }); 

        // Fullscreen Bttn 
        new FullScreenBttn(this, 770, 30, 'FullscreenImg'); 

        var current_index = 0

        this.time.addEvent({
            delay: 2000, 
            loop: true, 
            callback: () =>  {
                // current_index
                current_index = Phaser.Math.RND.between(0, this.alphabet.length - 1); 

                // Cambio de sprite y de Letra
                this.letter_sprite.setTexture(this.alphabet[current_index]);
                this.letter_text.setText(this.alphabet[current_index]);
            }
        })
    }

    update () {
        if (this.flag) {
            if (!(this.tablero_actual === undefined)) {
                this.tablero_actual.set_visible(false); 
            }

            this.pon_tablero();
        }
        if (this.first_phase) {
            this.open_dialogs(1); 
            this.first_phase = false; 
        }

        if (this.fin_del_juego) {
            console.log('El tutorial culmino exitosamente'); 
            this.open_dialogs(4); 
            this.fin_del_juego = false; 
        }
    }

    // create_rounds 
    create_rounds () {
        for (let i = 0; i < this.number_rounds; i++) {
            this.tableros.push(new Level(this.level_config)); 
        }
        this.flag = true; 
        this.first_phase = true; 
    }

    // pon_tablero
    pon_tablero () {
        this.sound.play('FlipSound');
        this.write_flag = true; 
        if (this.tableros.length != 0) {
            this.tablero_actual = this.tableros.shift(); 
            this.tablero_actual.set_visible(true);
            this.flag = false; 
        } else {
            this.fin_del_juego = true; 
            this.flag = false; 
        }
    }

    // comprobar 
    comprobar (key) {
        if (this.tablero_actual.get_correct_word().includes(key)) {
            this.pon_letra(key);
        } else {
            this.incorrect_answer();
        }
    }

    // handle_keydown 
    handle_keydown(event) {
        const char = event.key.toUpperCase();
        if (/^[A-Z]$/.test(char)) {
            if (this.write_flag) {
                this.comprobar(char)
            }
        }
    }

    // inspect 
    inspection() {
        let aux = true;
        this.tablero_actual.letter_space.forEach((element) => {
            if (!element.covered) {
                aux = false;
            }
        });

        return aux;
    }

    // pon_letra
    pon_letra(key) {
        this.tablero_actual.letter_space.forEach((element) => {
            // key coincide y que ya no se halla mostrado antes
            if (element.letter === key && !element.covered) {
                this.sound.play('TypingSound');
                element.set_covered(true);
            }
        });
         // siguiente ronda?
         if (this.inspection()) {
            var aux = []
            this.write_flag = false; 
            this.tablero_actual.letter_space.forEach((element) => {
                aux.push(element.letter_text)
            })
            this.time_flag = false;
            var scene = this
            this.sound.play('GoodSound')
            console.log(aux)
            this.tweens.add({
                targets: aux,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                yoyo: true,
                onComplete: function () {
                    // si, la palabra se ha descubierto
                    scene.time_flag = true;
                    scene.tablero_actual.set_hiden();
                    scene.current_number += 1;
                    scene.flag = true;
                }
            });
        }
    }

    // incorrect_answer
    incorrect_answer() {
        this.sound.play('FailSound');
        this.errores += 1;
    }

    // open_dialog
    open_dialogs (number) {
        if (number === 1) {
            this.aparecer([this.dialog_box, this.dialog_title, this.dialog_text, this.panel_circle, this.panel_keyboard, this.panel_button, this.button_continue], 1, 4000, this)
        }
        if (number === 2) {
            this.dialog_title.setText('  TUTORIAL')
            this.dialog_text.setText('EN ESTE JUEGO DEBERAS DESCUBRIR LA PALABRA OCULTA POR\n\nMEDIO DE IMAGENES. LA INICIAL DE CADA FIGURA PERTENECE A\n\n                  UNA LETRA DE LA PALABRA MISTERIOSA').setFontSize('25px')
            this.aparecer([this.panel_circle_example, this.panel_circle_example_letter, this.arrow, this.letter_sprite, this.letter_text, this.panel_button_fin, this.button_continue_fin], 1, 2000, this)
        }
        if (number === 3) {
            this.aparecer([this.dialog_box, this.dialog_title, this.dialog_text, this.panel_circle, this.panel_keyboard, this.panel_button, this.button_continue, this.panel_circle_example, this.panel_circle_example_letter, this.arrow, this.letter_sprite, this.letter_text, this.panel_button_fin, this.button_continue_fin], 0, 1000, this)
        }
        if (number === 4) {
            this.aparecer([this.dialog_box_end, this.dialog_title_end, this.dialog_text_end, this.panel_button_start_game, this.button_start_game], 1, 2000, this)
        }
    }

    // Effects 
    aparecer(listObj, light, duration, scene) {
        this.tweens.add({
            targets: listObj,
            alpha: light,
            duration: duration,
            ease: 'Power2',
            onComplete: function () {
                scene.next_flag = true; 
            }
        });
    }

    animation_movement(sprt) {
        this.tweens.add({
          targets: sprt,
          x: '-=30',
          ease: 'Power1',
          duration: 400,
          yoyo: true,
          repeat: -1
        });
      }
}