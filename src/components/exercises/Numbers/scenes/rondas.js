// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css';

// custom classes imported:
import TableroRenewed from '../sprites/base/TableroRenewed';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

const log = {
    info: {
        tiempo_total: undefined,
        tiempo_rondas: undefined,
        errores: undefined, 
        rondas: undefined
    }
}

export default class rondas extends Phaser.Scene {
    constructor() {
        super({ key: 'rondas', backgroundColor: 0xffffff });
    }

    preload() {}

    builder() {
        this.blockup = undefined;
        this.blockdown = undefined;

        // config rondas
        this.numberFases = 5;
        this.tries = 3; 
        this.tableroActual = undefined;

        // texto
        this.text_numberrondas = undefined;
        this.texto_tiempototal = undefined;
        this.current_number = 1;

        // errores
        this.numberErrors = 0;

        // aciertos
        this.numberVictory = 0;

        // timers
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
        this.tiempo_rondas = [];
        this.tiempo_por_ronda = 0; // en segundos

        // banderas
        // variable que indica cuando se puede tirar una ronda, su creacion
        // cuando esta falsa es que no se puede tirar ya que estamos en una
        this.flag = false;
        this.fin = false;
        this.fin_del_juego = false;
        this.lista_tablero = [];

        // config imported by apiRest
        this.tablero_config = {
            scene: this,
            pos_initx: 100,
            pos_inity: 260,
            scene_width: 800,
            scene_heigth: 600,
            number_range: [1, 9],
            actual: false,
            flag: this.flag // propiedad visible del tablero
        };

        this.limite = 20;
    }

    create() {
        // constructor aux
        this.builder();

        // game ---
        const settings = this.sys.settings.data.settings;
        
        // config rondas
        if (settings.rondas !== undefined) {
            this.numberFases = settings.rondas;
        }

        // config tries 
        if (settings.tries !== undefined) {
            this.tries = settings.tries;
        }
        
        this.cameras.main.setBackgroundColor(0xffffff);
        this.blockup = this.add.rectangle(0, 0, 1800, 100, 0x0024ad, 1);

        // text
        this.text_numberrondas = this.add
            .text(10, 10, 'Rondas: ' + this.current_number + '/' + this.numberFases, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(35);
        this.texto_tiempototal = this.add
            .text(10, 50, 'Tiempo: ' + this.gameTimeMin + ':' + this.gameTimeSec, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(35);

        this.texto_intentos = this.add
            .text(170, 10, 'Intentos: ' + this.tries, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(35); 

        this.texto_errores = this.add
            .text(170, 50, 'Errores: ' + this.numberErrors, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(35);

        this.text_numberrondas.setVisible(false);
        this.texto_tiempototal.setVisible(false);
        this.texto_intentos.setVisible(false); 
        this.texto_errores.setVisible(false);

        this.tablero = new TableroRenewed(this.tablero_config);
        this.move_y(this.blockup, -50, 1000, this);

        this.create_ronda(this.numberFases);
        // fullScreenButton ---------------------------------------------------------------------------------------------------
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    }

    update() {
        if (this.flag) {
            this.tiempo_rondas.push(this.tiempo_por_ronda);
            this.tiempo_por_ronda = 0;
            this.text_numberrondas.setText('Rondas: ' + this.current_number + '/' + this.numberFases);
            this.create_ronda();
            this.flag = false;
        }
        if (this.fin_del_juego) {
            console.log('El juego termino correctamente');
            this.setLog(this.tiempo_rondas, this.texto_tiempototal, this.numberErrors, this.numberFases);
            this.scene.start('NumbersEnd', log, { game: this.game });
            this.fin_del_juego = false;
        }
    }

    // Customs functions
    create_ronda() {
        this.flag = true;
        this.tableroActual = new TableroRenewed(this.tablero_config);
    }
    move_y(spt, position, duration, scene) {
        spt.originalY = spt.originalY - position;
        this.tweens.add({
            targets: spt,
            y: spt.y - position,
            duration: duration,
            ease: 'Power2',
            yoyo: false,
            repeat: 0,
            onComplete: function () {
                scene.text_numberrondas.setVisible(true);
                scene.texto_tiempototal.setVisible(true);
                scene.texto_intentos.setVisible(true); 
                scene.texto_errores.setVisible(true);
                scene.time.addEvent({ delay: 1000, callback: scene.addTime, callbackScope: scene, loop: true });
            }
        });
    }

    addTime() {
        this.gameTimeSec += 1;
        this.tiempo_por_ronda += 1;
        if (this.gameTimeSec > 59) {
            this.gameTimeSec = 0;
            this.gameTimeMin += 1;
        }

        this.texto_tiempototal.setText('Tiempo: ' + this.gameTimeMin + ' : ' + this.gameTimeSec);
    }

    check_lose() {
        if (this.tries <= 0) {
            const settings = this.sys.settings.data.settings; 
            this.scene.start('NumbersFailed', { settings }, { game: this.game });
        } 
    }

    check_win () {
        if (this.current_number == this.numberFases) {
            this.fin_del_juego = true; 
        }
    }
    // setters
    setStatus(val) {
        this.flag = val;
    }

    // setLog 
    setLog(tiempo_rondas, tiempo_total, errores, number_rounds) {
        log.info.tiempo_rondas = tiempo_rondas; 
        log.info.tiempo_total = tiempo_total;
        log.info.errores = errores;
        log.info.rondas = number_rounds; 
    }
}
