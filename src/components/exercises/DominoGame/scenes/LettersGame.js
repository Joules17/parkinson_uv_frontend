// phaser library
import Phaser from 'phaser';

// styles 
import 'components/exercises/general_assets/styles.css'

// custom classes imported:
import Level from 'components/exercises/DominoGame/sprites/levelObj.js'
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

const log = {
    info: {
        tiempo_total: undefined,
        tiempo_rondas: undefined,
        number_rondas: undefined,
        errores: undefined
    }
};

export default class LettersGame extends Phaser.Scene {
    constructor() {
        super({ key: 'LettersGame', backgroundColor: '#3f1651' });
        // dimensions
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // timers
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
        this.tiempo_rondas = [];
        this.tiempo_por_ronda = 0; // en segundos

        // execution variables
        this.number_rounds = 5;
        this.current_number = 1;
        this.tableros = [];
        this.tablero_actual = undefined;
        this.flag = undefined;
        this.errores = 0;
        this.fin_del_juego = false;
        this.correct_actual_option = undefined;

        // config
        this.levels_config = {
            scene: this,
            posx: 100,
            posy: 95,
            game_width: 600,
            game_height: 220,
            sprite_scale: 20,
            actual: false,
            side_selected: undefined,
            correct_option: undefined
        };

    }

    preload() {}

    create() {
        // Initialize config --------------------------------------------------
        const settings = this.sys.settings.data.settings;
        this.number_rounds = settings.rondas
        console.log(this.number_rounds)

        // Background --------------------------------------------------
        this.add.sprite(400, 300, 'BgForest');
        
        // Panels / Figures -------------------------------------------------------
        // yes circle
        this.circle_yes = this.add.graphics();
        this.circle_yes.fillStyle(0x006400, 0.5);
        this.circle_yes.fillCircle(480, 490, 60);

        this.circle_yes.lineStyle(2, 0x004000);
        this.circle_yes.strokeCircle(480, 490, 60);
        this.circle_yes.setDepth(1)

        this.text_yes = this.add.text(480, 490, 'SI', {fontFamily: 'Atarian', fill: '#ffffff'}).setFontSize(60);
        this.text_yes.setOrigin(0.5);
        this.text_yes.setDepth(2)
        this.text_yes.setInteractive();

        // --------------------------------------------------------------------------------------------

        // no circle
        this.circle_no = this.add.graphics();
        this.circle_no.fillStyle(0xFF0000, 0.5);
        this.circle_no.fillCircle(320, 490, 60);
        this.circle_no.lineStyle(2, 0x800000);
        this.circle_no.strokeCircle(320, 490, 60);
        this.circle_no.setDepth(1)

        this.text_no = this.add.text(325, 490, 'NO', {fontFamily: 'Atarian', fill: '#ffffff'}).setFontSize(60);
        this.text_no.setOrigin(0.5);
        this.text_no.setDepth(2)
        this.text_no.setInteractive();
        // ----------------------------------------------------------------------------------------------------------
        // Titles ---------------------------------------------------------------------------------------------------
        this.text_numberrondas = this.add
            .text(340, 560, 'Rondas: ' + this.current_number + '/' + this.number_rounds, { fontFamily: 'Atarian', fill: '#ffffff' })
            .setFontSize(30);
        this.texto_tiempototal = this.add
            .text(60, 560, this.gameTimeMin + ' : ' + this.gameTimeSec, { fontFamily: 'Atarian', fill: '#000000' })
            .setFontSize(30);
        this.texto_numbererros = this.add
            .text(660, 560, 'Errores: ' + this.errores, { fontFamily: 'Atarian', fill: '#ffffff' })
            .setFontSize(30);

        // ----------------------------------------------------------------------------------------------------------
        // FullScreen button ----------------------------------------------------------------------------------------
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        // Listeners ------------------------------------------------------------------------------------------------
        this.text_yes.on('pointerover', () => {
            this.sound.play('HoverSound')
            this.tweens.add({
                targets: this.circle_yes,
                x: this.circle_yes.x +5,
                duration: 200, 
                yoyo: true, 
                repeat: -1 
            });
        });

        this.text_no.on('pointerover', () => {
            this.sound.play('HoverSound')
            this.tweens.add({
                targets: this.circle_no,
                x: this.circle_no.x + 5,
                duration: 200,
                yoyo: true, 
                repeat: -1
            });
        });

        this.text_yes.on('pointerout', () => {
            this.tweens.killTweensOf(this.circle_yes);
            this.circle_yes.x = 0;
        });

        this.text_yes.on('pointerdown', () => {
            if (!(this.correct_actual_option === undefined)) {
                if (this.correct_actual_option === 'yes') {
                    this.correct_answer();
                } else {
                    this.incorrect_answer();
                }
            }
        });

        this.text_no.on('pointerdown', () => {
            if (!(this.correct_actual_option === undefined)) {
                if (this.correct_actual_option === 'no') {
                    this.correct_answer();
                } else {
                    this.incorrect_answer();
                }
            }
        });

        this.text_no.on('pointerout', () => {
            this.tweens.killTweensOf(this.circle_no);
            this.circle_no.x = 0;
        });

        // Execute Game ---------------------------------------------------------------------------------------------
        this.create_rounds();

        // Timer ----------------------------------------------------------------------------------------------------
        this.time.addEvent({ delay: 1000, callback: this.addTime, callbackScope: this, loop: true });
    }

    update(){
        // ----------------------------------------------------------------------------------------------------------
        // juego comienza / en espera
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
            console.log('El juego termino exitosamente')
            this.setLog(this.tiempo_rondas, this.texto_tiempototal, this.number_rounds, this.errores)
            this.scene.start('DominoEndGame', log)
            this.fin_del_juego = false;
        }
    }

    create_rounds() {
        for (let i = 0; i < this.number_rounds; i++) {
            this.tableros.push(new Level(this.levels_config));
        }
        this.flag = true;
    }

    pon_tablero () {
        if (this.tableros.length != 0) {
            this.tablero_actual = this.tableros.shift();
            this.tablero_actual.set_visible(true);
            this.correct_actual_option = this.tablero_actual.get_correct_option();

            this.flag = false;
        } else {
            this.fin_del_juego = true;
            this.flag = false;
        }
    }


    addTime() {
        this.gameTimeSec += 1;
        this.tiempo_por_ronda += 1;
        if (this.gameTimeSec > 59) {
            this.gameTimeSec = 0;
            this.gameTimeMin += 1;
        }

        this.texto_tiempototal.setText(this.gameTimeMin + ' : ' + this.gameTimeSec);
    }

    incorrect_answer () {
        this.errores += 1;
        this.texto_numbererros.setText('Errores: ' + this.errores);
        this.sound.play('bad');

    }

    correct_answer() {
        this.sound.play('correct')
        this.current_number += 1;
        this.flag = true;
    }

    // logs
    setLog(tiempo_rondas, tiempo_total, number_rondas, errores) {
        log.info.tiempo_rondas = tiempo_rondas;
        log.info.tiempo_total = tiempo_total;
        log.info.number_rondas = number_rondas;
        log.info.errores = errores;
    }
}
