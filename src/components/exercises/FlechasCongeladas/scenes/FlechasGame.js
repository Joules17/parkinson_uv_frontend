// Phaser
import Phaser from 'phaser'; 

// Styles
import 'components/exercises/general_assets/styles.css'

// Custom Classes Imported:
import Level from 'components/exercises/ArticRows/sprites/levelObj.js'; 
import FullScreenBttn from 'components/Factory/FullScreenBttn';

const log = {
    info: {
        tiempo_total: undefined,
        tiempo_rondas: undefined,
        errores: undefined,  
    }
}

export default class FlechasGame extends Phaser.Scene {
    constructor() {
        super({key: 'FlechasGame', backgroundColor: '#3f1651'});
    }

    preload () {}

    builder () {
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // Background
        this.bg = undefined;

        // Emitters
        this.emiter = undefined;
        this.glass_emitter = undefined; 
        this.flag_emitter = true; 

        // Cursors
        this.cursors = undefined;

        // Vars
        this.current_number = 1; 

        // Timers 
        this.gameTimeSec = 0; 
        this.gameTimeMin = 0;
        this.tiempo_rondas = []; 
        this.tiempo_por_ronda = 0; // sec

        // Flags 
        this.number_rounds = 30; 
        this.tries = 3; 
        this.tableros = [];
        this.tablero_actual = undefined
        this.flag = undefined;
        this.cursors = undefined;
        this.errores = 0; 
        this.error_flag = false; 
        
        // Effects 
        this.broken_glass = undefined; 

        // Config 
        this.levels_global = []; 

        this.level_config = {
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

    create() {
        // constructor aux
        this.builder();

        // game ---
        this.game = this.sys.game
        // Initialize 
        const settings = this.sys.settings.data.settings;

        // rondas 
        if (settings.rondas !== undefined) {
            this.number_rounds = settings.rondas;
        }

        // tries 
        if (settings.tries !== undefined) {
            this.tries = settings.tries;
        }

        // Background 
        this.bg = this.add.image(400, 300, 'BgNightSkySnow');

        // Cursor 
        this.cursors = this.input.keyboard.createCursorKeys();

        // Emitter
        this.emiter = this.add.particles(0, -10, 'SnowImg', {
            x: { min: 0, max: 800 },
            quantity: 2,
            lifespan: 2500,
            gravityY: 200,
            scale: { start: 0.01, end: 0.001 },
        }); 

        // Text Title 
        this.text_numberrondas = this.add
            .text(15, 15, 'Rondas: ' + this.current_number + '/' + this.number_rounds, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(40);
        this.tiempo_panel = this.add.graphics(); 
        this.tiempo_panel.fillStyle(0x000000, 0.5);
        this.tiempo_panel.fillRect(5, 550, 90, 100);
        this.texto_tiempototal = this.add
            .text(25, 560, this.gameTimeMin + ' : ' + this.gameTimeSec, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(35);
        this.number_errors_panel = this.add.graphics(); 
        this.number_errors_panel.fillStyle(0x000000, 0.5);
        this.number_errors_panel.fillRect(640, 550, 155, 100);
        this.texto_numbererros = this.add
            .text(650, 560, 'Errores: ' + this.errores, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(35);

        this.intentos_panel = this.add.graphics();
        this.intentos_panel.fillStyle(0x000000, 0.5);
        this.intentos_panel.fillRect(480, 550, 155, 100);
        this.texto_intentos = this.add
            .text(490, 560, 'Intentos: ' + this.tries, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(35);

        // Rounds 
        this.levels_global.push(this.level_config); 
        this.create_rounds(); 

        // Effects 
        this.broken_glass = this.add.image(400, 300, 'BrokenImg').setAlpha(0);
        this.broken_glass.setScale(1.39); 

        // Time
        this.time.addEvent({
            delay: 1000,
            callback: this.addTime,
            callbackScope: this,
            loop: true
        }); 

        // Fullscreen Bttn 
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    }

    update () {
        // Game Start -- Game on pause 
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
            this.texto_intentos.setText('Intentos: ' + this.tries);
            this.error_flag = false;
            this.check_lose(); 
        }
        if (this.fin_del_juego) {
            console.log('El juego termino correctamente'); 
            this.setLog(this.tiempo_rondas, this.texto_tiempototal, this.errores);
            this.scene.start('FlechasFin', log, {game: this.game});
            this.fin_del_juego = false; 
        }
    }
    
    // Custom Functions
    // Create_Rounds
    create_rounds() {
        for (let i = 0; i < this.number_rounds; i++) {
            this.tableros.push(new Level(this.levels_global[0]));
        }
        this.flag = true; 
    }

    // Pon Tablero
    pon_tablero () {
        if (this.tableros.length != 0) {
            this.tablero_actual = this.tableros.shift(); 
            // 
            this.tablero_actual.arrows_generated.dance_function(); 
            this.tablero_actual.set_active(true);
        } else {
            this.fin_del_juego = true; 
        }
        this.flag = false; 
     }

     // Add time 
    addTime () {
        this.gameTimeSec += 1;
        this.tiempo_por_ronda += 1; 
        if (this.gameTimeSec === 59) {
            this.gameTimeSec = 0;
            this.gameTimeMin += 1;
        }

        this.texto_tiempototal.setText(this.gameTimeMin + ' : ' + this.gameTimeSec); 
    }

    // Set Status
    set_status (status) {
        this.flag = status; 
    }

    // Effects 
    // Aparecer
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

    // Broke Screen
    broke_screen() {
        // emiter
        if (this.flag_emitter) {
            this.glass_emitter = this.add.particles(400, 300, 'GlassImg', {
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

    // Repair Screen
    repair_screen(scene) {
        scene.tweens.add({
            targets: [scene.broken_glass],
            alpha: 0,
            duration: 1000,
            ease: 'Power2'
        });
    }

    // Feedback
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

    // check_lose 
    check_lose () {
        if (this.tries <= 0) {
            const settings = this.sys.settings.data.settings; 
            this.scene.start('FlechasFailed', { settings }, { game: this.game });
        }
    }

    // Set Log 
    setLog(tiempo_rondas, tiempo_total, errores) {
        log.info.tiempo_rondas = tiempo_rondas; 
        log.info.tiempo_total = tiempo_total;
        log.info.errores = errores;
    }
}