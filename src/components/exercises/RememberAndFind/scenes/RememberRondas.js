// phaser library
import Phaser from 'phaser';

// css
import 'components/exercises/general_assets/styles.css';

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import Board from '../sprites/Board';

// log
const log = {
    info: {
        tiempo_total: undefined,
        tiempo_rondas: undefined,
        tiempo_total: undefined,
        errores: undefined
    }
};

export default class RememberRondas extends Phaser.Scene {
    constructor() {
        super({ key: 'RememberRondas', backgroundColor: '#4e9de0' });
    }

    preload() {}

    builder() {
        // timers
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
        this.tiempo_rondas = [];
        this.tiempo_por_ronda = 0; // en segundos

        // variables
        this.flag_init = undefined;
        this.error_flag = false;
        this.number_rounds = [5, 6, 10, 6];
        this.tries = 3;
        this.current_level = 1;
        this.current_number = 1;
        this.number_errors = 0;
        this.tablero_actual = undefined; 

        // config imported by apiRest
        this.tableros_config = [];

        for (let i = 0; i < this.number_rounds.length; i++) {
            this.tableros_config.push({
                scene: this,
                game_width: 500,
                game_height: 420,
                pos_initx: 80,
                pos_inity: 50,
                number_objects: this.number_rounds[i],
                padding: 30,
                spriteWidth: 5,
                spriteHeight: 5,
                sprite_scale: 0.17,
                category: ['frutas', 'casa', 'comida', 'animales'],
                actual: false,
                color_wished: undefined
            });
        }
    }
    create() {
        // constructor aux
        this.builder();

        // game ---
        this.game = this.sys.game;
        // Background ------------------------------------------------------------------------------------------------------------
        this.cameras.main.setBackgroundColor(0x4e9de0);
        this.bg = this.add.sprite(400, 300, 'BgSkye');

        // Number_Rounds - settings ------------------------------------------------------------------------------------------------------------
        const settings = this.sys.settings.data.settings;
        this.number_rounds = [];
        for (let i = 0; i < settings.niveles; i++) {
            this.number_rounds.push(settings.rondas);
        }

        // Number Tries - settings ------------------------------------------------------------------------------------------------------------
        if (settings.tries !== undefined) {
            this.tries = settings.tries;
        }

        // Figures -----------------------------------------------------------------------------------------------------------------
        this.bushes_sprite = this.add.sprite(100, 620, 'FirstBush').setScale(0.12);
        this.bushes_sprite2 = this.add.sprite(600, 620, 'SecondBush').setScale(0.12);
        this.bushes_spriteUp = this.add.sprite(600, -30, 'FirstBush').setScale(0.12).setAngle(180);
        this.bushes_sprite2Up = this.add.sprite(100, -30, 'SecondBush').setScale(0.12).setAngle(180);

        // Panels -----------------------------------------------------------------------------------------------------------------
        this.panel_round = this.add.graphics();
        this.panel_round.fillStyle(0xffffff, 1);
        this.panel_round.fillRect(30, 20, 750, 550);
        this.panel_round.lineStyle(2, 0x000000, 1);
        this.panel_round.strokeRect(30, 20, 750, 550);
        this.panel_round.setAlpha(0);

        this.panel_down = this.add.graphics();
        this.panel_down.fillStyle(0x3bb173, 1);
        this.panel_down.fillRect(30, 520, 750, 60);
        this.panel_down.lineStyle(2, 0x000000, 1);
        this.panel_down.strokeRect(30, 520, 750, 60);
        this.panel_down.setAlpha(0);

        this.circle_round = this.add.graphics();
        this.circle_round.lineStyle(2, 0x000000, 1);
        this.circle_round.fillStyle(0xe0bc28, 1);
        this.circle_round.fillCircle(50, 550, 50);
        this.circle_round.strokeCircle(50, 550, 50);
        this.circle_round.setAlpha(0);

        // Text -----------------------------------------------------------------------------------------------------------------
        this.text_numberrondas = this.add
            .text(110, 540, 'Rondas: ' + this.current_number + '/' + this.number_rounds[this.current_level - 1], {
                fontFamily: 'TROUBLE',
                fill: '#000000'
            })
            .setFontSize(35);
        this.texto_tiempototal = this.add
            .text(22, 538, this.gameTimeMin + ' : ' + this.gameTimeSec, { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(35);
        this.texto_errores = this.add
            .text(290, 540, 'ERRORES: ' + this.number_errors, { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(35);
        this.texto_niveles = this.add
            .text(450, 540, 'Nivel: ' + this.current_level + '/' + this.number_rounds.length, { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(35);

        this.texto_intentos = this.add
            .text(610, 540, 'Intentos: ' + this.tries, { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(35);

        this.texto_intentos.setVisible(false);
        this.texto_niveles.setVisible(false);
        this.texto_errores.setVisible(false);
        this.texto_tiempototal.setVisible(false);
        this.text_numberrondas.setVisible(false);

        this.aparecer(this.panel_round, this);
        this.aparecer(this.panel_down, this);
        this.aparecer(this.circle_round, this);

        // Board ---------------------------------------------------------------------------------------------------------------------------------------------------------------
        this.lista_tablero = [];
        let board;

        for (let i = 0; i < settings.niveles; i++) {
            this.tableros_config[i]['number_objects'] = settings.rondas;
            this.tableros_config[i]['category'] = settings.categorias;
            board = new Board(this.tableros_config[i]);
            if (i !== 0) {
                this.lista_tablero.push('cambio');
            }
            this.lista_tablero.push(...board.get_matrices());
        }

        // FullScreenButton ---------------------------------------------------------------------------------------------------
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    }

    update() {
        if (this.flag_init) {
            this.time.addEvent({ delay: 1000, callback: this.addTime, callbackScope: this, loop: true });
            this.texto_intentos.setVisible(true);
            this.texto_tiempototal.setVisible(true);
            this.text_numberrondas.setVisible(true);
            this.texto_errores.setVisible(true);
            this.texto_niveles.setVisible(true);
            this.flag_init = false;
            this.flag_game = true;
        } else if (this.flag_game) {
            if (this.tablero_actual !== undefined && this.tablero_actual !== 'cambio') {
                console.log('Por que estoy aqui?', this.tablero_actual)
                this.tablero_actual.setVisible(false);

                // time ---------------------------------------------------------------------------------------------------------------------------------------------------------------
                this.tiempo_rondas.push(this.tiempo_por_ronda);
                this.tiempo_por_ronda = 0;
                // ---------------------------------------------------------------------------------------------------------------------------------------------------------------
                this.text_numberrondas.setText('Rondas: ' + this.current_number + '/' + this.number_rounds[this.current_level - 1]);
                this.texto_niveles.setText('Nivel: ' + this.current_level + '/' + this.number_rounds.length);
            }
            this.pon_tablero();
        }
        if (this.error_flag) {
            this.texto_errores.setText('Errores: ' + this.number_errors);
            this.texto_intentos.setText('Intentos: ' + this.tries);
            this.error_flag = false;
            this.check_lose();
        }
        if (this.fin_del_juego) {
            console.log('El juego termino correctamente');
            this.setLog(this.tiempo_rondas, this.texto_tiempototal._text, this.number_errors);
            this.scene.start('RememberEnd', log, { game: this.game });
            this.fin_del_juego = false;
        }
    }

    // Customs functions
    aparecer(obj, scene) {
        this.tweens.add({
            targets: obj,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            onComplete: function () {
                scene.flag_init = true;
            }
        });
    }

    pon_tablero() {
        if (this.lista_tablero.length != 0) {
            this.tablero_actual = this.lista_tablero.shift();
            if (this.tablero_actual === 'cambio') {
                this.current_level += 1;
                this.current_number = 1;
                this.text_numberrondas.setText('Rondas: ' + this.current_number + '/' + this.number_rounds[this.current_level - 1]);
                this.texto_niveles.setText('Nivel: ' + this.current_level + '/' + this.number_rounds.length);
            } else {
                this.tablero_actual.setVisible(true);
                this.flag_game = false;
            }
        } else {
            this.fin_del_juego = true;
            this.flag_game = false;
        }
    }

    addTime() {
        this.gameTimeSec += 1;
        this.tiempo_por_ronda += 1;
        if (this.gameTimeSec == 60) {
            this.gameTimeSec = 0;
            this.gameTimeMin += 1;
        }
        this.texto_tiempototal.setText(this.gameTimeMin + ' : ' + this.gameTimeSec);
    }

    setStatus(val) {
        this.flag_game = val;
    }

    check_lose() {
        if (this.tries <= 0) {
            const settings = this.sys.settings.data.settings;
            this.scene.start('RememberFailed', { settings }, { game: this.game });
        }
    }

    // logs
    setLog(tiempo_rondas, tiempo_total, errores) {
        log.info.tiempo_rondas = tiempo_rondas;
        log.info.tiempo_total = tiempo_total;
        log.info.errores = errores;
    }
}
