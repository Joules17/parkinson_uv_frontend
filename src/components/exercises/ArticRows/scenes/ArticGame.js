// phaser library
import Phaser from 'phaser';
import '../styles.css';

// custom classes imported:
import Level from 'components/exercises/ArticRows/sprites/levelObj.js'
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// assets imports
import raindrop from 'components/exercises/ArticRows/assets/img/rain_drop.png';
import nightsky from 'components/exercises/ArticRows/assets/img/sky.jpg';
import broken_glass from 'components/exercises/ArticRows/assets/img/broken.png';
import glass from 'components/exercises/ArticRows/assets/img/glass.png';
import snowflake from 'components/exercises/ArticRows/assets/img/snowflake.png'
import fullscreen from '../assets/img/fullscreen.png';

import arrow_list from '../sprites/arrow_list';

// audio
import start_button from 'components/exercises/ArticRows/assets/music/start_button.mp3';
import cracking from 'components/exercises/ArticRows/assets/music/cracking.mp3';

const log = {
    info: {
        tiempo_total: undefined,
        tiempo_rondas: undefined,
        tiempo_total: undefined,
        errores: undefined
    }
}

export default class ArticGame extends Phaser.Scene {
    constructor() {
        super({ key: 'ArticGame', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // bg
        this.bg = undefined;

        // emiters
        this.emiter = undefined;
        this.glass_emitter = undefined;
        this.flag_emitter = true;

        // texto
        this.title = undefined;

        // cursors:
        this.cursors = undefined;

        // texto
        this.text_numberrondas = undefined; 
        this.texto_tiempototal = undefined;
        this.current_number = 1;
        // timers
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
        this.tiempo_rondas = [];
        this.tiempo_por_ronda = 0; // en segundos

        // variables
        this.first_rounds = 30; 
        this.second_rounds = 20; 
        // Pendiente definir los settings de este juego
        this.number_rounds = this.first_rounds + this.second_rounds
        this.tableros = []; // lista de tableros
        this.tablero_actual = undefined; // tablero actual
        this.flag = undefined;
        this.cursors = undefined;
        this.errores = 0;
        this.error_flag = false;
        this.storm_flag = false;
        this.snow_flag = false;

        // effects
        this.broken_glass = undefined;
        // config
        this.levels_global = []; // lista de configuraciones globales de cada nivel
        this.level_config = {
            scene: this,
            difficulty: 'easy',
            game_width: 800,
            game_heigth: 600,
            spriteWidth: 400,
            spriteHeigth: 400,
            sprite_scale: 0.6,
            spritePadding: 10,
            actual: false, 
            tuto_option: undefined
        };
        this.level_config_2 = {
            scene: this,
            difficulty: 'medium',
            pos_initx: 100,
            pos_inity: 100,
            game_width: 600,
            game_height: 400,
            sprite_width: 50,
            sprite_height: 50,
            sprite_scale: 0.3,
            spritePadding: 10,
            actual: false,
            tuto_option: undefined
        };

        this.level_config_3 = {
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
        this.load.image('snowflake', snowflake);
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

        // cursor:
        this.cursors = this.input.keyboard.createCursorKeys();

        // emiter
        this.emiter = this.add.particles(0, -10, 'rain', {
            x: { min: 0, max: 800 },
            quantity: 2,
            lifespan: 2500,
            gravityY: 200,
            scale: { start: 0.005, end: 0.001 }
        });

        // text
        this.text_numberrondas = this.add
            .text(15, 15, 'Rondas: ' + this.current_number + '/' + this.number_rounds, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(40);
        this.texto_tiempototal = this.add
            .text(25, 560, this.gameTimeMin + ' : ' + this.gameTimeSec, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(40);
        this.texto_numbererros = this.add
            .text(600, 560, 'Errores: ' + this.errores, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(40);

        // rounds manager
        this.levels_global.push(this.level_config);
        this.levels_global.push(this.level_config_2);
        this.levels_global.push(this.level_config_3);
        this.createRounds();

        // effects
        this.broken_glass = this.add.image(400, 300, 'broken_glass').setAlpha(0);
        this.broken_glass.setScale(1.39);

        // time
        this.time.addEvent({ delay: 1000, callback: this.addTime, callbackScope: this, loop: true });
        
        // fullScreenButton
        new FullScreenBttn(this, 770, 30, 'fullscreenImg');
    }

    update() {
        // juego comienza -- juego en espera de accion
        if (this.flag) {
            if (this.tablero_actual !== undefined) {
                if (!(this.tablero_actual === 'medium' || this.tablero_actual === 'hard')) {
                    this.tablero_actual.set_active(false);
                    this.tiempo_rondas.push(this.tiempo_por_ronda);
                    this.tiempo_por_ronda = 0;
                }
            }
            this.text_numberrondas.setText('Rondas: ' + this.current_number + '/' + this.number_rounds);
            this.pon_tablero();
        }
        if (this.error_flag) {
            this.texto_numbererros.setText('Errores: ' + this.errores);
            this.error_flag = false;
        }
        if (this.storm_flag) {
            console.log('comenzo la segunda ronda');
            this.storm_rising(); 
            this.storm_flag = false;
        }
        if (this.snow_flag) {
            console.log('comenzo la tercera ronda');
            this.snow_falling(); 
            this.snow_flag = false;
        }
        if (this.fin_del_juego) {
            console.log('El juego termino correctamente');
            this.setLog(this.tiempo_rondas, this.texto_tiempototal, this.errores); 
            this.scene.start('ArticOver', log)
            this.fin_del_juego = false;
        }
    }

    // Customs functions ------------------------------------------------------------------------------------------------------------------------------
    // creacion de niveles / rondas
    createRounds() {
        for (let i = 0; i < this.first_rounds; i++) {
            this.tableros.push(new Level(this.levels_global[0]));
        }
        this.tableros.push('medium');
        for (let i = 0; i < this.second_rounds; i++) {
            this.tableros.push(new Level(this.levels_global[1]));
        }
        /*
        this.tableros.push('hard');
        for (let i = 0; i < this.third_rounds; i++) {
            this.tableros.push(new Level(this.levels_global[2]));
        }
        */
        this.flag = true;
    }

    // ------------------------------------------------------------------------------------------------------------------------------------------------
    pon_tablero() {
        if (this.tableros.length != 0) {
            this.tablero_actual = this.tableros.shift();
            if (this.tablero_actual === 'medium' || this.tablero_actual === 'hard') {
                if (this.tablero_actual === 'medium') {
                    this.storm_flag = true;
                } else {
                    this.snow_flag = true;
                }
                this.flag = true;
            } else {
                // console.log('tablero_actual:', this.tablero_actual)
                this.tablero_actual.arrows_generated.dance_function(); // pone a bailar las flechas
                this.tablero_actual.set_active(true); // hace visible el siguiente tablero
                this.flag = false;
            }
        } else {
            this.fin_del_juego = true;
            this.flag = false;
        }
    }
    // ------------------------------------------------------------------------------------------------------------------------------------------------
    addTime() {
        this.gameTimeSec += 1;
        this.tiempo_por_ronda += 1;
        if (this.gameTimeSec > 59) {
            this.gameTimeSec = 0;
            this.gameTimeMin += 1;
        }

        this.texto_tiempototal.setText(this.gameTimeMin + ' : ' + this.gameTimeSec);
    }
    // ------------------------------------------------------------------------------------------------------------------------------------------------
    set_status(val) {
        this.flag = val;
    }
    // ------------------------------------------------------------------------------------------------------------------------------------------------
    // Effects
    aparecer(obj, scene) {
        this.tweens.add({
            targets: obj,
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                scene.flag = true;
            }
        });
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
        const feedbackMessage = this.add.text(selected[0], selected[1], '', { fontFamily: 'TROUBLE', fontSize: 40 });
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

    storm_rising() {
        this.emiter.gravityY = 500;
        this.emiter.quantity = 10; 
        const feedbackMessage = this.add.text(50, 500, 'La tormenta se acerca', { fontFamily: 'TROUBLE', fontSize: 30 });
        feedbackMessage.setDepth(10)
        this.tweens.add({
            targets: feedbackMessage,
            scale: 1,
            x: '+=20', // Mover 20 unidades a la derecha
            duration: 1000,
            ease: 'Back',
            onComplete: () => {
                // Animación de ocultamiento del mensaje
                this.tweens.add({
                    targets: feedbackMessage,
                    alpha: 0,
                    x: '-=20', // Mover 20 unidades a la izquierda antes de desaparecer
                    duration: 1000,
                    delay: 100, // Retraso antes de que el mensaje se oculte
                    onComplete: () => {
                        // Eliminar el mensaje de retroalimentación
                        feedbackMessage.destroy();
                    }
                });
            }
        });
    }

    snow_falling() {
      this.emiter.quantity = 3; 
      this.emiter.gravityY = 200; 
      this.emiter.setTexture('snowflake')
      this.emiter.setParticleScale(1.5, 1);
      const feedbackMessage = this.add.text(50, 500, 'TORMENTA DE NIEVE!', { fontFamily: 'TROUBLE', fontSize: 50 });
      feedbackMessage.setDepth(10)
      this.tweens.add({
          targets: feedbackMessage,
          scale: 1,
          x: '+=20', // Mover 20 unidades a la derecha
          duration: 1000,
          ease: 'Back',
          onComplete: () => {
              // Animación de ocultamiento del mensaje
              this.tweens.add({
                  targets: feedbackMessage,
                  alpha: 0,
                  x: '-=20', // Mover 20 unidades a la izquierda antes de desaparecer
                  duration: 1000,
                  delay: 100, // Retraso antes de que el mensaje se oculte
                  onComplete: () => {
                      // Eliminar el mensaje de retroalimentación
                      feedbackMessage.destroy();
                  }
              });
          }
      });

    }

    // logs 
    setLog(tiempo_rondas, tiempo_total, errores) {
        log.info.tiempo_rondas = tiempo_rondas; 
        log.info.tiempo_total = tiempo_total;
        log.info.errores = errores;
    }
}
