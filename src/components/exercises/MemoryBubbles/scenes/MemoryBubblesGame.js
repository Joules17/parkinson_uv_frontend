// Phaser
import Phaser from 'phaser';

// Styles
import 'components/exercises/general_assets/styles.css'

// Custom Classes Imported
import FullScreenBttn from 'components/Factory/FullScreenBttn';
import Level from 'components/exercises/MemoryBubbles/sprites/Level';
import SteroidObject from 'components/Factory/SteroidObject';

export default class MemoryBubblesGame extends Phaser.Scene {
    constructor () {
        super({key: 'MemoryBubblesGame', backgroundColor: '#3f1651'});
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // Level Variables
        this.current_level = 1;
        this.number_levels = 10;
        this.number_errors = 0;

        // Bubbles
        this.current_bubble = undefined; 
        this.current_bubble_index = -1; 
        this.main_level = undefined; 
        
        //
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
        this.tiempo_rondas = [];
        this.tiempo_por_ronda = 0; // sec
    }

    preload () {}

    create () {
        // Bounds
        this.physics.world.setBounds(0, 0, this.worldSizeWidth, this.worldSizeHeigth);
        // Init
        const settings = this.sys.settings.data.settings;

        // Background
        this.bg = this.add.sprite(400, 300, 'SeaImg').setDepth(-2);

        // Algae
        var change = -1
        for (let i = 0; i < 20; i++) {
            new SteroidObject({ scene: this, posx: i*50, posy: 580, key: 'AlgaeImg'}).setScale(0.2).dance_function(change*15, 2000);
            change = change*-1
        }

        // Panel Time
        this.panel_time = this.add.graphics();
        this.panel_time.fillStyle(0x000000, 0.5);
        this.panel_time.fillRect(10, 0, 135, 40);

        this.time_text = this.add.text(20, 10, 'Tiempo: '+this.gameTimeMin+':'+this.gameTimeSec, { fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(30);

        // Panel Rondas
        this.panel_rondas = this.add.graphics();
        this.panel_rondas.fillStyle(0x000000, 0.5);
        this.panel_rondas.fillRect(150, 0, 160, 40);

        this.rondas_text = this.add.text(160, 10, 'Burbujas: '+this.current_level+'/'+this.number_levels, { fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(30);

        // Panel Errors
        this.panel_error = this.add.graphics();
        this.panel_error.fillStyle(0x000000, 0.5);
        this.panel_error.fillRect(315, 0, 135, 40);

        this.error_text = this.add.text(325, 10, 'Errores: '+this.number_errors, { fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(30);

        // Panel Options
        // Option Right
        this.panel_option_right = this.add.graphics();
        this.panel_option_right.fillStyle(0x000000, 0.5);
        this.panel_option_right.fillRect(410, 540, 120, 60);

        this.text_right = this.add.text(490, 555, 'SI', { fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(40);
        this.arrow_right = this.add.sprite(450, 570, 'NeutralArrowRight').setScale(0.1)

        // Option Left
        this.panel_option_left = this.add.graphics();
        this.panel_option_left.fillStyle(0x000000, 0.5);
        this.panel_option_left.fillRect(265, 540, 125, 60);

        this.text_left = this.add.text(280, 555, 'NO', { fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(40);
        this.arrow_left = this.add.sprite(350, 570, 'NeutralArrowLeft').setScale(0.1)

        // Panel Question
        this.panel_question = this.add.graphics();
        this.panel_question.fillStyle(0x000000, 0.5);
        this.panel_question.fillRect(50, 50, 700, 100);

        this.text_question = this.add.text(80, 70, 'LA BURBUJA ACTUAL ES IGUAL A LA INMEDIATAMENTE\n                                ANTERIOR?', { fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(40);
        
        // Calling Some Bubbles
        this.main_level = new Level({scene: this, number_levels: this.number_levels});
        this.flag = true; 
        
        // Fullscreen button
        new FullScreenBttn(this, 770, 30, 'FullscreenImg')

        // Listener de teclado 
        this.input.keyboard.on('keydown', this.handle_keydown, this); 
        // Time Event
        this.time.addEvent({
            delay: 1000,
            callback: this.addTime,
            callbackScope: this,
            loop: true
        });

    }

    update () {
        if (this.flag) {
            if (! (this.current_bubble === undefined)) {
                this.tiempo_rondas.push(this.tiempo_por_ronda); 
                this.tiempo_por_ronda = 0;
                this.current_level += 1;
                this.rondas_text.setText('Burbujas: ' + this.current_level + '/' + this.number_levels);
            }
            this.put_bubble(); 
        }
        if (this.fin_del_juego) {
            console.log('TERMINA EL JUEGO')
            // this.setLog(this.tiempo_por_ronda, this.time_text.text, this.number_levels)
            // this.scene.start('MemoryBubblesEnd', log); 
            this.fin_del_juego = false; 
        }
    }

    put_bubble () {
        if (!this.main_level.check_win()) {
            this.current_bubble_index += 1; 
            this.current_bubble = this.main_level.list_bubbles[this.current_bubble_index]; 
            this.current_bubble.appear(this.current_bubble); 
            this.flag = false; 
            if (this.current_bubble_index === 0) {
                this.introduction_time = true; 
                this.show_introduction(); 
            }
        } else {
            // the player has won 
            this.fin_del_juego = true;
            this.flag = false; 
        }
    }

    addTime () {
        if (!this.introduction_time) {
            this.gameTimeSec += 1;
            this.tiempo_por_ronda += 1;
            if  (this.gameTimeSec === 59) {
                this.gameTimeSec = 0;
                this.gameTimeMin += 1;
            }

            this.time_text.setText('Tiempo: ' + this.gameTimeMin + ':' + this.gameTimeSec);
        }
    }

    // Keyboard event 
    handle_keydown(event) {
        if (!this.flag && !this.fin_del_juego) {
            if (event.keyCode === 37 || event.keyCode === 39) {
                if (this.current_bubble.correct_option !== 'first') {
                    if ((this.current_bubble.correct_option === 'yes' && event.keyCode === 39) || (this.current_bubble.correct_option === 'no' && event.keyCode === 37)) {
                        // Correct Answer Procedure
                        this.current_bubble.leave(this.current_bubble); 
                        this.flag = true; 
                    } else {
                        // Bad Answer Procedure
                        console.log('BAD')
                    }
                }
            }
        }
    }

    // Introduction 
    show_introduction () {
        this.text_question.setText('                         OBSERVA LA BURBUJA')
        this.time.addEvent({
            delay: 3000, 
            callback: () => {
                this.text_question.setText('LA BURBUJA ACTUAL ES IGUAL A LA INMEDIATAMENTE\n                                ANTERIOR?')
                this.introduction_time = false; 
                // 
                this.current_bubble.leave(this.current_bubble);
                this.flag = true;
            },
            callbackScope: this, 
            loop: false
        }); 
    }
}