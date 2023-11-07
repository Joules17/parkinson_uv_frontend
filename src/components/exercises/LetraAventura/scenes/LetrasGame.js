// phaser library
import Phaser from 'phaser';

// styles
import 'components/exercises/general_assets/styles.css'

// custom classes imported:
import Level from 'components/exercises/LetraAventura/sprites/levelObj.js';
import keyboard from 'components/exercises/LetraAventura/sprites/keyboard';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

const log = {
    info: {
        tiempo_total: undefined,
        tiempo_rondas: undefined,
        number_rondas: undefined,
        errores: undefined
    }
};

export default class LetrasGame extends Phaser.Scene {
    constructor() {
        super({ key: 'LetrasGame', backgroundColor: '#3f1651' });
    }

    preload() {}

    builder () {
        this.write_flag = true; 
        // dimensions
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // timers
        this.current_number = 1;
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
        this.tiempo_rondas = [];
        this.tiempo_por_ronda = 0; // en segundos

        // vars
        this.number_rounds = 20;
        this.tries = 3; // intentos
        this.tableros = [];
        this.tablero_actual = undefined;
        this.flag = undefined;
        this.time_flag = true;
        this.cursors = undefined;
        this.errores = 0;

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

    create() {
        // constructor aux 
        this.builder(); 

        // game ---
        this.game = this.sys.game
        const settings = this.sys.settings.data.settings;
        this.number_rounds = settings.rondas;

        // Tries
        if (settings.tries !== undefined) { 
            this.tries = settings.tries; 
        }

        // Initialize Data
        if (settings.longitudPalabra !== undefined) {
            this.number_max = parseInt(settings.longitudPalabra);
            this.level_config.limit = this.number_max; 
        } 

        if (settings.longitudMinPalabra !== undefined) {
            this.number_min = parseInt(settings.longitudMinPalabra);
            this.level_config.min = this.number_min; 
        } 

        // Background 
        this.bg = this.add.image(400, 300, 'BgMint');

        // main_panel
        this.main_bottom_panel = this.add.graphics(); 
        this.main_bottom_panel.fillStyle(0x3F3464, 1);
        this.main_bottom_panel.fillRect(0, 190, 800, 220);

        this.main_panel = this.add.graphics(); 
        this.main_panel.fillStyle(0xffffff, 1);
        this.main_panel.fillRect(0, 200, 800, 200);

        // text
        this.top_panel = this.add.graphics(); 
        this.top_panel.fillStyle(0x3F3464, 0.3);
        this.top_panel.fillRect(5, 0, 150, 45);

        this.text_numberrondas = this.add
            .text(10, 10, 'Rondas: ' + this.current_number + '/' + this.number_rounds, { fontFamily: 'TROUBLE', fill: '#FFFFFF' })
            .setFontSize(35);

        this.top_secondpanel = this.add.graphics(); 
        this.top_secondpanel.fillStyle(0x3F3464, 0.3);
        this.top_secondpanel.fillRect(160, 0, 160, 45);
        this.text_tries = this.add
            .text(165, 10, 'Intentos: ' + this.tries, { fontFamily: 'TROUBLE', fill: '#FFFFFF' })
            .setFontSize(35);
        
        this.time_panel = this.add.graphics(); 
        this.time_panel.fillStyle(0x3F3464, 0.3);
        this.time_panel.fillRect(700, 550, 90, 60); 
            this.texto_tiempototal = this.add
            .text(720, 555, this.gameTimeMin + ':' + this.gameTimeSec, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(40);

        // execution
        this.create_rounds();

        this.keyboard = new keyboard(this, 800, 30, 460, 35, this.alphabet, { fontFamily: 'TROUBLE', fill: '#000000' }, (key) => {
            this.comprobar(key);
        });

        //  Listeners del teclado ---------------------------------------------
        this.input.keyboard.on('keydown', this.handle_keydown, this);

        // Fullscreen Bttn ----------------------------------------------------
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
        // time
        this.time.addEvent({ delay: 1000, callback: this.addTime, callbackScope: this, loop: true });
    }

    update() {
        if (this.flag) {
            if (!(this.tablero_actual === undefined)) {
                this.tablero_actual.set_visible(false);
                this.tiempo_rondas.push(this.tiempo_por_ronda);
                this.tiempo_por_ronda = 0;
            }
            this.text_numberrondas.setText('Rondas: ' + this.current_number + '/' + this.number_rounds);
            this.pon_tablero();
        }
        if (this.fin_del_juego) {
            console.log('el juego acabo correctamente');
            this.set_log(this.tiempo_rondas, this.texto_tiempototal, this.number_rounds, this.errores)
            this.scene.start('LetrasOver', log, {game: this.game})
            this.fin_del_juego = false;
        }
    }

    // create rounds
    create_rounds() {
        for (let i = 0; i < this.number_rounds; i++) {
            this.tableros.push(new Level(this.level_config));
        }
        this.flag = true;
    }

    // pon_tablero
    pon_tablero() {
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
    comprobar(key) {
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
    // revisa que todas las cards hayan sido reveladas
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

    // incorrect
    incorrect_answer() {
        this.sound.play('FailSound');
        this.errores += 1;
        this.tries -= 1; 
        this.text_tries.setText('Intentos: ' + this.tries); 
        this.check_lose(); 
    }

    // time
    addTime() {
        if (this.time_flag) {
            this.gameTimeSec += 1;
            this.tiempo_por_ronda += 1;
            if (this.gameTimeSec >= 60) {
                this.gameTimeSec = 0;
                this.gameTimeMin += 1;
            }
            this.texto_tiempototal.setText(this.gameTimeMin + ':' + this.gameTimeSec);
        }
    }

    check_lose () {
        if (this.tries <= 0) {
            if (this.tries <= 0) {
                const settings = this.sys.settings.data.settings; 
                this.scene.start('LetrasFailed', { settings }, { game: this.game });
            }
        }
    }
    // logs
    set_log(tiempo_rondas, tiempo_total, number_rondas, errores) {
        log.info.tiempo_rondas = tiempo_rondas;
        log.info.tiempo_total = tiempo_total;
        log.info.number_rondas = number_rondas;
        log.info.errores = errores;
    }
}
