// phaser library
import Phaser from 'phaser';
import '../styles.css';

// custom classes imported:

// assets imports
import bushes from '../assets/img/bushes.png';
import bushes2 from '../assets/img/bushes2.png';
import fullscreen from '../assets/img/fullscreen.png';

// import object_list
import object_list from '../sprites/object_list';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// import sounds
import good from '../assets/music/correct.wav';
import bad from '../assets/music/bad.wav';
import hover from '../assets/music/hover.mp3';
import Board from '../sprites/Board';

const log = {
    info: {
        tiempo_total: undefined,
        tiempo_rondas: undefined,
        tiempo_total: undefined,
        errores: undefined
    }
};

export default class FrutasticRondas extends Phaser.Scene {
    constructor() {
        super({ key: 'FrutasticRondas', backgroundColor: '#3f1651' });

        // assets
        this.bushes = undefined;
        this.bushes2 = undefined;
        this.bushesUp = undefined;
        this.bushes2Up = undefined;

        // panels
        this.panel_round = undefined;
        this.circle_round = undefined;
        this.circle_time = undefined;

        // text
        this.text_numberrondas = undefined;
        this.texto_tiempototal = undefined;
        this.texto_errores = undefined;

        // timers
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
        this.tiempo_rondas = [];
        this.tiempo_por_ronda = 0; // en segundos

        // variables
        this.flag_init = undefined;
        this.error_flag = false;
        this.number_rounds = [5, 6, 10, 6];
        this.current_level = 1; 
        this.current_number = 1;
        this.number_errors = 0;

        // config imported by apiRest
        this.tableros_config = []

        for (let i = 0; i < this.number_rounds.length; i++) {
            this.tableros_config.push(
                {
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
                    category: ['frutas', 'casa', 'comida', 'animals'],
                    actual: false,
                    color_wished: undefined
                }
            );
        }
    }

    preload() {
        // images
        this.load.image('bushes', bushes);
        this.load.image('bushes2', bushes2);
        this.load.image('fullscreenImg', fullscreen);

        for (let categoria in object_list) {
            // busca cada subcategoria para cargar su correspondiente imagen
            // console.log(`Elementos en la categoría ${categoria}:`)
            for (let subcategoria in object_list[categoria]) {
                this.load.image(object_list[categoria][subcategoria]['key'], object_list[categoria][subcategoria]['imagen']);
            }
        }

        // audio
        this.load.audio('bad', bad);
        this.load.audio('good', good);
        this.load.audio('hover', hover);
    }

    create() {
        this.cameras.main.setBackgroundColor(0x3f1651);

        // figuras
        this.bushes_sprite = this.add.sprite(100, 620, 'bushes').setScale(0.12);
        this.bushes_sprite2 = this.add.sprite(600, 620, 'bushes2').setScale(0.12);
        this.bushes_spriteUp = this.add.sprite(600, -30, 'bushes').setScale(0.12).setAngle(180);
        this.bushes_sprite2Up = this.add.sprite(100, -30, 'bushes2').setScale(0.12).setAngle(180);

        // panels
        this.panel_round = this.add.graphics();
        this.panel_round.fillStyle(0xffffff, 1);
        this.panel_round.fillRoundedRect(30, 20, 740, 550, 10);
        this.panel_round.lineStyle(2, 0x000000, 1); // Grosor, Color, Opacidad
        this.panel_round.strokeRoundedRect(30, 20, 740, 550, 10); // Dibuja el borde
        this.panel_round.setAlpha(0);

        this.panel_down = this.add.graphics();
        this.panel_down.fillStyle(0xfd7f20, 1);
        this.panel_down.fillRoundedRect(30, 520, 750, 60, 10);
        this.panel_down.lineStyle(2, 0x000000, 1); // Grosor, Color, Opacidad
        this.panel_down.strokeRoundedRect(30, 520, 750, 60, 10); // Dibuja el borde
        this.panel_down.setAlpha(0);

        this.circle_round = this.add.graphics();
        this.circle_round.lineStyle(2, 0x000000, 1);
        this.circle_round.fillStyle(0x00ffff, 1);
        this.circle_round.fillCircle(50, 550, 50);
        this.circle_round.strokeCircle(50, 550, 50);
        this.circle_round.setAlpha(0);

        // text
        this.text_numberrondas = this.add
            .text(120, 540, 'Rondas: ' + this.current_number + '/' + this.number_rounds[this.current_level-1], { fontFamily: 'ARCO', fill: '#000000' })
            .setFontSize(25);
        this.texto_tiempototal = this.add
            .text(21, 538, this.gameTimeMin + ' : ' + this.gameTimeSec, { fontFamily: 'ARCO', fill: '#000000' })
            .setFontSize(25);
        this.texto_errores = this.add
            .text(350, 540, 'ERRORES: ' + this.number_errors, { fontFamily: 'ARCO', fill: '#000000' })
            .setFontSize(25);
        this.texto_niveles = this.add
            .text(570, 540, 'Nivel: ' + this.current_level + '/' + this.number_rounds.length, { fontFamily: 'ARCO', fill: '#000000'})
            .setFontSize(25);
        this.texto_niveles.setVisible(false); 
        this.texto_errores.setVisible(false);
        this.texto_tiempototal.setVisible(false);
        this.text_numberrondas.setVisible(false);

        this.aparecer(this.panel_round, this);
        this.aparecer(this.panel_down, this);
        this.aparecer(this.circle_round, this);

        // board ---------------------------------------------------------------------------------------------------------------------------------------------------------------
        this.lista_tablero = [];
        let board;
        for (let i = 0; i < this.tableros_config.length;  i++) {
            board = new Board(this.tableros_config[i])
            if (i !== 0) {
                this.lista_tablero.push('cambio'); 
            }
            this.lista_tablero.push(...board.get_matrices());
        }
        console.log(this.lista_tablero)
        // fullScreenButton ---------------------------------------------------------------------------------------------------
        new FullScreenBttn(this, 770, 30, 'fullscreenImg');
    }

    update() {
        if (this.flag_init) {
            this.time.addEvent({ delay: 1000, callback: this.addTime, callbackScope: this, loop: true });
            this.texto_tiempototal.setVisible(true);
            this.text_numberrondas.setVisible(true);
            this.texto_errores.setVisible(true);
            this.texto_niveles.setVisible(true); 
            this.flag_init = false;
            this.flag_game = true;
        } else if (this.flag_game) {
            if ((this.tablero_actual !== undefined) && (this.tablero_actual !== 'cambio') ) {
                this.tablero_actual.setVisible(false);

                // time ---------------------------------------------------------------------------------------------------------------------------------------------------------------
                this.tiempo_rondas.push(this.tiempo_por_ronda);
                this.tiempo_por_ronda = 0;
                // ---------------------------------------------------------------------------------------------------------------------------------------------------------------
                this.text_numberrondas.setText('Rondas: ' + this.current_number + '/' + this.number_rounds[this.current_level-1]);
                this.texto_niveles.setText('Nivel: ' + this.current_level + '/' + this.number_rounds.length)
            }
            this.pon_tablero();
        }
        if (this.error_flag) {
            this.texto_errores.setText('Errores: ' + this.number_errors);
            this.error_flag = false;
        }
        if (this.fin_del_juego) {
            console.log('El juego termino correctamente');
            this.setLog(this.tiempo_rondas, this.texto_tiempototal._text, this.number_errors);
            this.scene.start('FrutasticEnd', log);
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
                this.text_numberrondas.setText('Rondas: ' + this.current_number + '/' + this.number_rounds[this.current_level-1]);
                this.texto_niveles.setText('Nivel: ' + this.current_level + '/' + this.number_rounds.length) 
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

    // logs
    setLog(tiempo_rondas, tiempo_total, errores) {
        log.info.tiempo_rondas = tiempo_rondas;
        log.info.tiempo_total = tiempo_total;
        log.info.errores = errores;
    }
}
