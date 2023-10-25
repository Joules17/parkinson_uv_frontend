// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css'

// custom classes imported:
import TableroRenewed from '../sprites/base/TableroRenewed';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

const log = {
    info: {
        numero_rondas: undefined,
        tiempo_rondas: undefined,
        tiempo_total: undefined
    }
};

export default class ObjectRondas extends Phaser.Scene {
    constructor() {
        super({ key: 'ObjectRondas', backgroundColor: 0xffffff });
        this.blockup, (this.blockdown = undefined);

        // config rondas
        this.numberFases = 20;
        this.tableroActual = undefined;

        // texto
        this.text_numberrondas, (this.texto_tiempototal = undefined);
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
        this.lista_tablero = [];
        this.limit = 22;

        // config imported by apiRest
        this.tablero_config = {
            scene: this,
            game_width: 670,
            game_height: 400,
            pos_initx: 50,
            pos_inity: 70,
            numberObjects: 5,
            numberDistinct: 3,
            padding: 40,
            spriteWidth: 40,
            spriteHeight: 10,
            category: ['comida', 'casa', 'frutas'],
            actual: false,
            color_wished: undefined
        };

        this.limite = 20;
    }

    preload() {}

    create() {
        this.game = this.sys.game
        const settings = this.sys.settings.data.settings;
        console.log(this.sys.settings.data)

        this.numberFases = settings.rondas
        this.tablero_config['category'] = settings.categorias; 
        this.limite = settings.rondas
        this.cameras.main.setBackgroundColor(0xffffff);
        // this.initializer();

        this.blockdown = this.add.rectangle(0, 800, 1800, 200, 0x4e9de0, 1);
        this.blockup = this.add.rectangle(0, 0, 1800, 100, 0x4e9de0, 1);

        // text
        this.text_numberrondas = this.add
            .text(10, 560, 'Rondas: ' + this.current_number + '/' + this.numberFases, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(40);
        this.texto_tiempototal = this.add
            .text(710, 560, this.gameTimeMin + ' : ' + this.gameTimeSec, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(40);
        this.text_numberrondas.setVisible(false);
        this.texto_tiempototal.setVisible(false);

        this.move_y(this.blockdown, 150, 1000, this);
        // Creacion de los niveles
        this.create_rondas(this.numberFases);

        // botones fullscreen
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    }

    update() {
        // console.log(this.flag)
        if (this.flag) {
            if (!(this.tableroActual === undefined)) {
                this.tableroActual.sprite_group.setVisible(false);
                this.tiempo_rondas.push(this.tiempo_por_ronda);
                this.tiempo_por_ronda = 0;
                this.text_numberrondas.setText('Rondas: ' + this.current_number + '/' + this.numberFases);
            }
            this.pon_tablero();
        }
        if (this.fin_del_juego) {
            console.log('El juego termino correctamente');
            this.setLog(this.tiempo_rondas, this.texto_tiempototal.text, this.numberFases);
            this.scene.start('ObjectEnd', log, {game: this.game});
            this.fin_del_juego = false;
        }
    }

    // Customs functions
    initializer() {
        var gameContainer = document.getElementById('phaser-game-container');
        gameContainer.style.width = '800px';
        gameContainer.style.height = '600px';

        // Restablecer el tamaño y ubicación del componente del juego
        var gameComponent = this.game.canvas;
        gameComponent.style.width = '800px';
        gameComponent.style.height = '600px';

        // Restablecer el centrado del contenedor del juego
        gameContainer.style.display = 'flex';
        gameContainer.style.alignItems = 'center';
        gameContainer.style.justifyContent = 'center';
    }

    create_rondas(numFases) {
        // creacion de tableros / rondas
        for (let i = 0; i < numFases; i++) {
            this.lista_tablero.push(new TableroRenewed(this.tablero_config));
            if (this.tablero_config.numberObjects < this.limite) {
                this.tablero_config.numberObjects += 1;
                this.tablero_config.numberDistinct += 1;
            }
            this.flag = true;
        }
    }

    pon_tablero() {
        if (this.lista_tablero.length != 0) {
            this.tableroActual = this.lista_tablero.shift();
            this.tableroActual.sprite_group.setVisible(true); // se habilita tablero
            this.flag = false;
        } else {
            this.fin_del_juego = true;
            this.flag = false;
        }
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

        this.texto_tiempototal.setText(this.gameTimeMin + ' : ' + this.gameTimeSec);
    }

    // setters
    setStatus(val) {
        this.flag = val;
    }

    // logs
    setLog(tiempo_rondas, tiempo_total, number_rondas) {
        log.info.numero_rondas = number_rondas;
        log.info.tiempo_rondas = tiempo_rondas;
        log.info.tiempo_total = tiempo_total;
    }
}