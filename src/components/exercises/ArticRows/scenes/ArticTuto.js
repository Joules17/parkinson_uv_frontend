// phaser library
import Phaser from 'phaser';

// styles.css
import 'components/exercises/general_assets/styles.css'

// custom classes imported: 
import Level from '../sprites/levelObj.js';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// assets imports
import raindrop from 'components/exercises/ArticRows/assets/img/rain_drop.png';
import nightsky from 'components/exercises/ArticRows/assets/img/sky.jpg';
import broken_glass from 'components/exercises/ArticRows/assets/img/broken.png';
import glass from 'components/exercises/ArticRows/assets/img/glass.png';
import fullscreen from '../assets/img/fullscreen.png';

import arrow_list from '../sprites/arrow_list';

// audio
import start_button from 'components/exercises/ArticRows/assets/music/start_button.mp3';
import cracking from 'components/exercises/ArticRows/assets/music/cracking.mp3';
import keycap from 'components/exercises/ArticRows/assets/img/arrow_keys.png'

export default class ArticTuto extends Phaser.Scene {
    constructor() {
        super({ key: 'ArticTuto', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // bg
        this.bg = undefined;
        this.caps = undefined;

        // emiters
        this.emiter = undefined;

        // texts
        this.title = undefined;
        this.explanation = undefined;

        // panels
        this.conversation_panel = undefined;

        this.play_button = undefined; 

        // vars
        this.eventFinished = false;
        this.first_phase = false;
        this.tableros = []; // lista de tableros
        this.tablero_actual = undefined;
        this.good_rounds = 7;
        this.bad_rounds = 7;
        this.fin_del_tuto = false;
        this.bad_flag = false; 
        this.patron_flag = false; 
        this.contador = 0;         

        this.level_config_good = {
            scene: this,
            difficulty: 'easy',
            game_width: 800,
            game_heigth: 600,
            spriteWidth: 400,
            spriteHeigth: 400,
            sprite_scale: 0.6,
            spritePadding: 10,
            actual: false,
            tuto_option: 0
        };
        this.level_config_bad = {
            scene: this,
            difficulty: 'easy',
            game_width: 800,
            game_heigth: 600,
            spriteWidth: 400,
            spriteHeigth: 400,
            sprite_scale: 0.6,
            spritePadding: 10,
            actual: false,
            tuto_option: 1
        };
        this.level_config_patron = {
          scene: this,
          difficulty: 'hard',
          pos_initx: 100,
          pos_inity: 100,
          game_width: 800,
          game_height: 600,
          sprite_width: 50,
          sprite_height: 50,
          sprite_scale: 0.19,
          spritePadding: 10,
          actual: false,
          tuto_option: undefined
        };
    }

    preload() {
        // images
        this.load.image('sky', nightsky);
        this.load.image('rain', raindrop);
        this.load.image('keycap', keycap);
        this.load.image('fullscreenImg', fullscreen);
        // sprites
        for (let tipo in arrow_list) {
            // busca cada tipo para cargar su correspondiente imagen
            // console.log(`Elementos en el tipo ${tipo}:`)
            for (let dir in arrow_list[tipo]) {
                this.load.image(arrow_list[tipo][dir]['key'], arrow_list[tipo][dir]['imagen']);
            }
        }

        // other images
        this.load.image('broken_glass', broken_glass);
        this.load.image('glass', glass);
        // audio
        this.load.audio('start_button', start_button);
        this.load.audio('cracking', cracking);
    }

    create() {
        // bg image
        this.bg = this.add.image(400, 300, 'sky');

        // emiters
        this.glass_emitter = undefined;
        this.flag_emitter = true;

        // cursor
        this.input.keyboard.on('keydown', this.handle_keydown, this);

        // emiter
        this.emiter = this.add.particles(0, -10, 'rain', {
            x: { min: 0, max: 800 },
            quantity: 2,
            lifespan: 2500,
            gravityY: 200,
            scale: { start: 0.005, end: 0.001 }
        });

        this.caps = this.add.image(400, 300, 'keycap');
        this.caps.setAlpha(0);

        // panels
        this.conversation_panel = this.add.graphics();
        this.conversation_panel.fillStyle(0x000000, 1);
        this.conversation_panel.fillRect(50, 530, 700, 60, 5); // Crea el rectángulo con bordes curvos
        this.conversation_panel.strokeRect(50, 530, 700, 60, 5); // Dibuja los bordes negros

        // fullScreenButton
        new FullScreenBttn(this, 770, 30, 'fullscreenImg');

        // text ------------------------------------------------------------------------------------------------------------------------
        this.title = this.add.text(305, 20, 'TUTORIAL', { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(70);
        this.explanation = this.add
            .text(100, 550, 'Bienvenido a flechas articas, para jugar utiliza tu teclado', {
                fontFamily: 'TROUBLE',
                fill: '#ffffff'
            })
            .setFontSize(30);
        this.explanation.setAlpha(0);
        this.aparecer(this.explanation, this);
        this.aparecer(this.caps, this);

        // button 
        this.play_button = this.add.text(320, 240, 'JUGAR', {
          fontFamily: 'TROUBLE',
          fill: '#ffffff',
        }).setFontSize(80); 
        this.play_button.setVisible(false); 

        this.play_button.setInteractive(); 
        this.play_button.on('pointerdown', () => {
          this.sound.play('start_button')
          const settings = this.sys.settings.data.settings;
          this.scene.start('ArticGame', {settings})
        }); 
  
        this.play_button.on('pointerover', () => {
          this.play_button.setColor('#4ca2ba')
            this.tweens.add({
                targets: this.play_button,
                scale: 1.1,
                duration: 100,
                ease: 'Power2'
            }); 
        }); 
        
        this.play_button.on('pointerout', () => {
          this.play_button.setColor('#ffffff')
          this.tweens.add({
              targets: this.play_button,
              scaleX: 1,
              scaleY: 1,
              duration: 100, 
              ease: 'Power2'
            });
        });
    }

    update() {
      if (this.flag) {
        if (this.tablero_actual !== undefined) {
            if (!(this.tablero_actual === 'bad_explanation' || this.tablero_actual === 'patron_explanation')) {
                this.tablero_actual.set_active(false);
            }
        }
        this.pon_tablero();
      }
      if (this.first_phase) {
          this.explanation
              .setText(
                  'si el color es azul, la orientacion correcta a presionar es la misma de la flecha'
              )
              .setFontSize(22);
          this.caps.setVisible(false);
          this.createRounds();
          this.first_phase = false;
      }
      if (this.bad_flag) {
        this.explanation.setText('En cambio, las flechas rojas indican la orientacion contraria a la correcta').setFontSize(23); 
        this.bad_flag = false; 
      }
      if (this.patron_flag) {
        this.explanation.setText('Cuando las flechas sean blancas, quiere decir que debes oprimir \n             la orientación que no se repita')
        this.title.setVisible(false)
        this.patron_flag = false; 
      }
      if (this.fin_del_tuto) {
          this.explanation.setText('Excelente! Has completado el tutorial, haz click en Jugar!').setFontSize(30)
          this.play_button.setVisible(true); 
          this.fin_del_tuto = false; 
      }
    }

    createRounds() {
        this.contador += 1; 
        for (let i = 0; i < this.good_rounds; i++) {
            this.tableros.push(new Level(this.level_config_good));
        }
        this.tableros.push('bad_explanation');
        for (let i = 0; i < this.bad_rounds; i++) {
            this.tableros.push(new Level(this.level_config_bad));
        }
        this.flag = true;
    }

    pon_tablero() {
        if (this.tableros.length != 0) {
            this.tablero_actual = this.tableros.shift();
            if (this.tablero_actual === 'bad_explanation' || this.tablero_actual === 'patron_explanation') {
                if (this.tablero_actual === 'bad_explanation') {
                  this.bad_flag = true; 
                } else {
                  this.patron_flag = true; 
                }
            } else {
                // console.log('tablero_actual:', this.tablero_actual)
                this.tablero_actual.arrows_generated.dance_function(); // pone a bailar las flechas
                this.tablero_actual.set_active(true); // hace visible el siguiente tablero
                this.flag = false;
            }
        } else {
            this.fin_del_tuto = true;
            this.flag = false;
        }
    }
    // custom functions
    aparecer(obj, scene) {
        this.tweens.add({
            targets: obj,
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            onComplete: function () {
                if (!scene.eventFinished) {
                    scene.explanation.setText('       Oprime tecla espacio para continuar con el tutorial');
                    scene.eventFinished = true;
                }
            }
        });
    }

    handle_keydown(event) {
        if (this.eventFinished) {
            if (event.keyCode === 32 && this.contador === 0) {
                this.first_phase = true;
            }
        }
    }

    set_status(val) {
      this.flag = val;
    }

    broke_screen() {
      // emiter
      if (this.flag_emitter) {
          this.glass_emitter = this.add.particles(400, 300, 'glass', {
              speed: { min: 200, max: 400 },
              gravityY: 200,
              scale: { start: 0.1, end: 0.01 },
              lifespan: 1000
          });
          this.glass_emitter.setDepth(0);
          this.flag_emitter = false;
          this.time.delayedCall(300, () => {
              this.glass_emitter.stop();
              this.flag_emitter = true;
          });
      }

      this.tweens.add({
          targets: [this.broken_glass],
          alpha: 1,
          duration: 1000,
          ease: 'Power2',
          onComplete: () => {
              this.repair_screen(this);
          }
      });
  }

  repair_screen(scene) {
    scene.tweens.add({
        targets: [scene.broken_glass],
        alpha: 0,
        duration: 1000,
        ease: 'Power2'
    });
  }
  
  feedback(status) {
    let positions = [
        [600, 500],
        [600, 100],
        [200, 100],
        [200, 500]
    ];
    let selected = positions[Math.floor(Math.random() * positions.length)];
    const feedbackMessage = this.add.text(selected[0], selected[1], '', { fontFamily: 'TROUBLE', fontSize: 30 });
    feedbackMessage.setOrigin(0.5);
    feedbackMessage.setScale(0);
    if (status) {
        feedbackMessage.setText('¡Correcto!');
        feedbackMessage.setTint(0x00ff00);
    } else {
        feedbackMessage.setText('¡Incorrecto!');
        feedbackMessage.setTint(0xff0000);
    }
    // Animación de crecimiento del mensaje
    this.tweens.add({
        targets: feedbackMessage,
        scale: 1,
        duration: 500,
        ease: 'Back',
        onComplete: () => {
            // Animación de ocultamiento del mensaje
            this.tweens.add({
                targets: feedbackMessage,
                alpha: 0,
                duration: 500,
                delay: 100, // Retraso antes de que el mensaje se oculte
                onComplete: () => {
                    // Eliminar el mensaje de retroalimentación
                    feedbackMessage.destroy();
                }
            });
        }
    });
  }





}