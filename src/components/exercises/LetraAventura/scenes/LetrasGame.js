// phaser library
import Phaser from 'phaser';
import '../styles.css';

// custom classes imported:
import Level from 'components/exercises/LetraAventura/sprites/Level.js';
import keyboard from 'components/exercises/LetraAventura/sprites/keyboard';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
// assets imports
import bg from 'components/exercises/LetraAventura/assets/images/bg_game.png';
import piece from 'components/exercises/LetraAventura/assets/images/piece_paper_2.png';
import fullscreen from '../assets/images/fullscreen.png';
// music
import typing from 'components/exercises/LetraAventura/assets/music/type.mp3';
import fail from 'components/exercises/LetraAventura/assets/music/fail.mp3';
import flip_round from 'components/exercises/LetraAventura/assets/music/flip_round.mp3';
import good from 'components/exercises/LetraAventura/assets/music/good.mp3'

// alphabet images
import letter_list from '../sprites/letter_list';

// sounds
// import sounds here
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
        // dimensions
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // decoration (assets...)

        // text
        this.text_numberrondas = undefined;
        this.texto_tiempototal = undefined;
        this.current_number = 1;

        // timers
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
        this.tiempo_rondas = [];
        this.tiempo_por_ronda = 0; // en segundos

        // vars
        this.number_rounds = 20;
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
            limit: 10,
            game_width: this.worldSizeWidth,
            sprite_scale: 0.15,
            actual: false
        };
    }

    preload() {
        this.load.image('bg', bg);
        this.load.image('piece', piece);
        this.load.image('fullscreenImg', fullscreen);
        // sprites
        for (let tipo in letter_list) {
            for (let dir in letter_list[tipo]) {
                this.load.image(letter_list[tipo][dir]['key'], letter_list[tipo][dir]['imagen']);
            }
        }

        // audio
        this.load.audio('typing', typing);
        this.load.audio('fail', fail);
        this.load.audio('flip_round', flip_round);
        this.load.audio('good', good); 
    }

    create() {
        const settings = this.sys.settings.data.settings;
        this.number_rounds = settings.rondas
        // bg image
        this.bg = this.add.image(400, 300, 'bg');

        // panel
        this.panel = this.add.image(400, 300, 'piece').setScale(0.255);
        // text
        this.text_numberrondas = this.add
            .text(25, 25, 'Rondas: ' + this.current_number + '/' + this.number_rounds, { fontFamily: 'ComicSans', fill: '#000000' })
            .setFontSize(20);
        this.texto_tiempototal = this.add
            .text(720, 555, this.gameTimeMin + ':' + this.gameTimeSec, { fontFamily: 'ComicSans', fill: '#000000' })
            .setFontSize(35);

        // execution
        this.create_rounds();

        this.keyboard = new keyboard(this, 800, 30, 460, 35, this.alphabet, { fontFamily: 'ComicSans', fill: '#000000' }, (key) => {
            this.comprobar(key);
        });
        // fullScreenButton
        new FullScreenBttn(this, 770, 30, 'fullscreenImg');
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
            this.scene.start('LetrasOver', log)
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
        this.sound.play('flip_round');
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
    // inspect
    // revisa que todas las cards hallan sido reveladas
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
                this.sound.play('typing');
                element.set_covered(true);
            }
        });

        // siguiente ronda?
        if (this.inspection()) {
            var aux = []
            this.tablero_actual.letter_space.forEach((element) => {
                aux.push(element.letter_text)
            })
            this.time_flag = false; 
            var scene = this
            this.sound.play('good')
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
        this.sound.play('fail');
        this.errores += 1;
    }

    // time
    addTime() {
        if (this.time_flag) {
            this.gameTimeSec += 1;
            if (this.gameTimeSec >= 60) {
                this.gameTimeSec = 0;
                this.gameTimeMin += 1;
            }
            this.texto_tiempototal.setText(this.gameTimeMin + ':' + this.gameTimeSec);
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
