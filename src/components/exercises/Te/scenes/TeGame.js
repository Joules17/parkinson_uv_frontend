// phaser library
import Phaser from 'phaser';

// styles
import 'components/exercises/general_assets/styles.css'

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import Clock from 'components/exercises/Te/sprites/Clock.js';

export default class TeGame extends Phaser.Scene {
    constructor() {
        super({ key: 'TeGame', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // vars
        this.pressed = false;

    }

    preload() { }

    builder () {
        // config rondas 
        this.worldSizeHeigth = 600;
        this.worldSizeWidth = 800;

        // level variables 
        this.current_level = 1;
        this.number_fases = 5;
        this.tries = 3; 
        this.number_errors = 0; 

        // tablero 
        this.current_tablero = undefined; 

        // timers 
        this.gameTimeSec = 0; 
        this.gameTimeMin = 0;
        this.tiempo_rondas = []; 
        this.tiempo_por_ronda = 0; // seconds
    }

    create() {
        // builder 
        this.builder(); 

        // game 
        this.game = this.sys.game
        const settings = this.sys.settings.data.settings; 
        console.log(this.sys.settings.data); 

        // number rounds - settings 
        if (settings.rondas !== undefined) {
            this.number_fases = parseInt(settings.rondas); 
        } 

        // number tries - settings
        if (settings.tries !== undefined) {
            this.tries = parseInt(settings.tries); 
        }

        // Background --------------------------------------------------
        this.add.sprite(400, 300, 'TeGameBgImg');

        // panel_circle
        this.panel_circle = this.add.graphics();
        this.panel_circle.fillStyle(0xd2cfe2, 1);
        this.panel_circle.fillCircle(590, 337, 210);

        // Clock
        this.clock_shape = this.add.sprite(590, 337, 'ClockShapeImg').setScale(0.165);

        // center dot
        this.center_dot = this.add.graphics();
        this.center_dot.fillStyle(0x000000, 1);
        this.center_dot.fillCircle(590, 337, 10);

        // Panels
        // rounds 
        this.panel_rounds = this.add.graphics();
        this.panel_rounds.fillStyle(0xffffff, 0.5);
        this.panel_rounds.fillRect(10, 550, 200, 50);

        this.rounds_text = this.add.text(15, 560, 'RONDAS: ' + this.current_level + '/' + this.number_fases, {fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(40);

        // time 
        this.panel_time = this.add.graphics();
        this.panel_time.fillStyle(0xffffff, 0.5);
        this.panel_time.fillRect(215, 550, 180, 50);

        this.time_text = this.add.text(220, 560, 'TIEMPO: ' +  this.gameTimeMin + ':' + this.gameTimeSec, {fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(40);

        // errors 
        this.panel_errors = this.add.graphics();
        this.panel_errors.fillStyle(0xffffff, 0.5);
        this.panel_errors.fillRect(400, 550, 170, 50);

        this.errors_text = this.add.text(405, 560, 'ERRORES: ' + this.number_errors, {fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(40);

        // tries 
        this.panel_tries = this.add.graphics();
        this.panel_tries.fillStyle(0xffffff, 0.5);
        this.panel_tries.fillRect(575, 550, 180, 50);

        this.tries_text = this.add.text(580, 560, 'INTENTOS: ' + this.tries, {fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(40);
        
        // question 
        this.panel_question = this.add.graphics(); 
        this.panel_question.fillStyle(0x000000, 0.5);
        this.panel_question.fillRect(50, 20, 700, 100);


        this.clocky = new Clock({
            scene: this,
            posx: 590,
            posy: 337,
            hour: 3,
            min: 59
        })

        this.clocky.update_hands();

        // Fullscreen
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    }


    update() {
    }
}