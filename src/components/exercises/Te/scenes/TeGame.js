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

    builder() {
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

        this.rounds_text = this.add.text(15, 560, 'RONDAS: ' + this.current_level + '/' + this.number_fases, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(40);

        // time
        this.panel_time = this.add.graphics();
        this.panel_time.fillStyle(0xffffff, 0.5);
        this.panel_time.fillRect(215, 550, 180, 50);

        this.time_text = this.add.text(220, 560, 'TIEMPO: ' + this.gameTimeMin + ':' + this.gameTimeSec, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(40);

        // errors
        this.panel_errors = this.add.graphics();
        this.panel_errors.fillStyle(0xffffff, 0.5);
        this.panel_errors.fillRect(400, 550, 170, 50);

        this.errors_text = this.add.text(405, 560, 'ERRORES: ' + this.number_errors, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(40);

        // tries
        this.panel_tries = this.add.graphics();
        this.panel_tries.fillStyle(0xffffff, 0.5);
        this.panel_tries.fillRect(575, 550, 180, 50);

        this.tries_text = this.add.text(580, 560, 'INTENTOS: ' + this.tries, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(40);

        // question
        this.panel_question = this.add.graphics();
        this.panel_question.fillStyle(0x000000, 0.5);
        this.panel_question.fillRect(50, 15, 700, 80);

        this.question = this.add.text(200, 35, 'DIGITA LA HORA DEL TE', { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(60);

        // clock panel
        this.panel_base_clock = this.add.graphics();
        this.panel_base_clock.fillStyle(0xFF0000, 1);
        this.panel_base_clock.fillRoundedRect(25, 195, 310, 110, 10);
        this.panel_clock = this.add.graphics();
        this.panel_clock.fillStyle(0xffffff, 1);
        this.panel_clock.fillRoundedRect(30, 200, 300, 100, 10);

        // current hour
        this.current_hour = '0 1 '
        this.current_min = ' 3 0'
        this.current_time = this.add.text(65, 215, this.current_hour+':'+this.current_min, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(100);

        // buttons
        this.up_hour_button = this.add.sprite(100, 160, 'ArrowUpImg').setScale(0.02).setInteractive({ useHandCursor: true });

        this.up_hour_button.on('pointerdown', () => {
            this.sound.play('BubblePopSound');
            this.change_hour('up');
        });

        this.up_hour_button.on('pointerover', () => {
            this.sound.play('HoverSound');
        });

        this.down_hour_button = this.add.sprite(100, 340, 'ArrowDownImg').setScale(0.02).setInteractive({ useHandCursor: true });

        this.down_hour_button.on('pointerdown', () => {
            this.sound.play('BubblePopSound');
            this.change_hour('down');
        });

        this.down_hour_button.on('pointerover', () => {
            this.sound.play('HoverSound');
        });

        this.up_min_button = this.add.sprite(260, 160, 'ArrowUpImg').setScale(0.02).setInteractive({ useHandCursor: true });

        this.up_min_button.on('pointerdown', () => {
            this.sound.play('BubblePopSound');
            this.change_min('up')
        });

        this.up_min_button.on('pointerover', () => {
            this.sound.play('HoverSound');
        });

        this.down_min_button = this.add.sprite(260, 340, 'ArrowDownImg').setScale(0.02).setInteractive({ useHandCursor: true });

        this.down_min_button.on('pointerdown', () => {
            this.sound.play('BubblePopSound');
            this.change_min('down');
        });

        this.down_min_button.on('pointerover', () => {
            this.sound.play('HoverSound');
        });

        // panel reveal
        this.panel_reveal = this.add.graphics();
        this.panel_reveal.lineStyle(10, 0xe15554);
        this.panel_reveal.strokeRect(70, 400, 230, 60);
        this.panel_reveal.fillStyle(0x000000, 1);
        this.panel_reveal.setAlpha(0.9)
        this.panel_reveal.fillRect(70, 400, 230, 60);

        this.check_button = this.add.text(100, 410, 'COMPROBAR', { fontFamily: 'TROUBLE', fill: '#e15554' }).setFontSize(50).setInteractive({ useHandCursor: true });

        this.check_button.on('pointerdown', () => {
            console.log('HOLA')
        });

        this.check_button.on('pointerover', () => {
            this.sound.play('HoverSound');
            this.tweens.add({
                targets: this.check_button,
                scale: 1.01,
                duration: 100,
                ease: 'Power2'
            });
        });

        this.check_button.on('pointerout', () => {
            this.tweens.add({
                targets: this.check_button,
                scale: 1,
                duration: 100,
                ease: 'Power2'
            })
        });



        this.clocky = new Clock({
            scene: this,
            posx: 590,
            posy: 337,
            hour: 3,
            min: 45
        })

        this.clocky.update_hands();

        // Fullscreen
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        // timer
        this.time.addEvent({
            delay: 1000,
            callback: this.addTime,
            callbackScope: this,
            loop: true
        });
    }


    update() {
    }

    change_hour(direction) {
        let hour_aux = this.current_hour.split(' ');
        let hours = parseInt(hour_aux[0]+hour_aux[1]);

        if (direction === 'up') {
            hours  = (hours + 1) % 12 || 12;
        } else {
            hours = (hours - 1 + 12) % 12;
            hours = hours === 0 ? 12 : hours;
        }

        const hours_text = hours.toString();
        if (hours < 10) {
            this.current_hour = '0 ' + hours + ' ';
        } else {
            this.current_hour = hours_text[0] + ' ' + hours_text[1] + ' ';
        }

        this.current_time.setText(this.current_hour + ':' + this.current_min);

    }


    change_min(direction) {
        let min_aux = this.current_min.split(' ');
        let minutes = parseInt(min_aux[1] + min_aux[2]);
    
        if (direction === 'up') {
            minutes = (minutes + 5) % 60;
        } else {
            if (minutes === 0) {
                minutes = 55; // Si los minutos son 00 y se reduce, establecer en 55
            } else {
                minutes = (minutes - 5 + 60) % 60;
            }
        }
    
        const minutes_text = minutes.toString();
        if (minutes < 10) {
            this.current_min = ' 0 ' + minutes;
        } else {
            this.current_min = ' ' + minutes_text[0] + ' ' + minutes_text[1];
        }
    
        this.current_time.setText(this.current_hour + ':' + this.current_min);
    }

    addTime() {
        if (!this.introduction_time) {
            this.gameTimeSec += 1;
            this.tiempo_por_ronda += 1;
            if (this.gameTimeSec === 59) {
                this.gameTimeSec = 0;
                this.gameTimeMin += 1;
            }

            this.time_text.setText('TIEMPO: ' + this.gameTimeMin + ':' + this.gameTimeSec);
        }
    }
}