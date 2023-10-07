// Phaser
import Phaser from 'phaser';

// Styles
import 'components/exercises/general_assets/styles.css';

// Custom Classes Imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import Level from '../sprites/Level';

const log = {
    info: {
        numero_rondas: undefined,
        tiempo_rondas: undefined,
        tiempo_total: undefined
    }
};

export default class LetrasMarinasGame extends Phaser.Scene {
    constructor() {
        super({ key: 'LetrasMarinasGame', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;
        // Level Variables
        this.wordsperlevel = 5; 
        this.current_level = 1;
        this.number_levels = 5;
        // Timers
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
        this.tiempo_rondas = [];
        this.tiempo_por_ronda = 0; // sec

        // Board
        this.level_list = []; 
        this.current_level = undefined; 
        this.current_board = undefined;
        this.current_nivel = undefined; 
        this.tablero_config = {
            scene: this, 
            pos_initx: 20,
            pos_inity: 20,
            number_cols: 10,
            number_rows: 10,
            number_words: 5,
            categories: ['animales', 'frutas'], 
            active: false
        }
    }

    preload () {}

    create () {
        // Init
        const settings = this.sys.settings.data.settings; 
        console.log(settings, 'Hola')

        if (settings.wordsperlevel !== undefined) {
            this.tablero_config['number_words'] = parseInt(settings.wordsperlevel);
        }

        if (settings.niveles !== undefined) {
            this.number_levels = parseInt(settings.niveles);
        }

        if (settings.categorias !== undefined) {
            this.tablero_config['categories'] = settings.categorias; 
        }

        // Background
        this.bg = this.add.sprite(400, 300, 'SeaImg').setDepth(-2);

        // Coral
        this.coral_izq = this.add.sprite(50, 500, 'CoralOrange')
        this.coral_der = this.add.sprite(800, 400, 'CoralImg')
        // Panel
        this.panel_board = this.add.graphics();
        this.panel_board.lineStyle(10, 0x3bb173);
        this.panel_board.strokeRect(15, 15, 520, 520);
        this.panel_board.fillStyle(0x000000, 1);
        this.panel_board.setAlpha(0.5)
        this.panel_board.fillRect(15, 15, 520, 520);

        // Panel time
        this.panel_time = this.add.graphics();
        this.panel_time.fillStyle(0x000000, 0.5);
        this.panel_time.fillRect(10, 555, 190, 50);

        this.time_text = this.add.text(20, 565, 'Tiempo: ' + this.gameTimeMin + ' : ' + this.gameTimeSec, {fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(40);

        // Panel Nivel
        this.panel_nivel = this.add.graphics();
        this.panel_nivel.fillStyle(0x000000, 0.5);
        this.panel_nivel.fillRect(205, 555, 155, 50);

        this.nivel_text = this.add.text(215, 565, 'Nivel: ' + 1 + '/' + this.number_levels, {fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(40);

        // Panel Guessing
        this.panel_guessing = this.add.graphics();
        this.panel_guessing.lineStyle(10, 0x3bb173);
        this.panel_guessing.strokeRect(550, 15, 230, 60);
        this.panel_guessing.fillStyle(0x000000, 1);
        this.panel_guessing.setAlpha(0.9)
        this.panel_guessing.fillRect(550, 15, 230, 60);

        // Panel Hints
        this.panel_hints = this.add.graphics();
        this.panel_hints.lineStyle(10, 0xe0bc28);
        this.panel_hints.strokeRect(550, 400, 230, 60);
        this.panel_hints.fillStyle(0x000000, 1);
        this.panel_hints.setAlpha(0.9)
        this.panel_hints.fillRect(550, 400, 230, 60);

        this.guessing_text = this.add.text(560, 30, 'FIGURA MISTERIOSA', {fontFamily: 'TROUBLE', fill: '#3bb173'}).setFontSize(37);
        this.hint_text = this.add.text(560, 415,  '         PISTA         ', {fontFamily: 'TROUBLE', fill: '#e0bc28'}).setFontSize(40);

        // Panel Reveal 
        this.panel_reveal = this.add.graphics();
        this.panel_reveal.lineStyle(10, 0xe15554);
        this.panel_reveal.strokeRect(550, 475, 230, 60);
        this.panel_reveal.fillStyle(0x000000, 1);
        this.panel_reveal.setAlpha(0.9)
        this.panel_reveal.fillRect(550, 475, 230, 60);

        this.reveal_text = this.add.text(560, 490, '      REVELAR      ', {fontFamily: 'TROUBLE', fill: '#e15554'}).setFontSize(40);
        
        
        // Time
        this.time.addEvent({
            delay: 1000,
            callback: this.addTime,
            callbackScope: this,
            loop: true
        });

        // Panel Words
        this.panel_words = this.add.graphics();
        this.panel_words.fillStyle(0x000000, 0.5);
        this.panel_words.fillRect(365, 555, 170, 50);

        this.words_text = this.add.text(375, 568, 'Palabras:'+ 1 + '/'+ this.tablero_config.number_words, {fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(32)
        
        // Panel Hints Used
        this.panel_hints_used = this.add.graphics(); 
        this.panel_hints_used.fillStyle(0x000000, 0.5);
        this.panel_hints_used.fillRect(540, 555, 255, 50);

        this.hints_used_text = this.add.text(550, 568, 'Pistas restantes: 0/3', {fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(32)

        // Listeners
        this.hint_text.setInteractive({useHandCursor: true}); 
        this.reveal_text.setInteractive({useHandCursor: true}); 
        
        this.hint_text.on('pointerdown', () => {
            this.sound.play('CorrectSound');
            this.current_level.show_hint(); 
        }); 

        this.hint_text.on('pointerover', () => {
            this.sound.play('HoverSound');
            this.tweens.add({
                targets: this.hint_text, 
                scaleX: 1.01,
                scaleY: 1.01,
                duration: 100,
                ease: 'Power2'
            }); 
                        
        }); 

        this.hint_text.on('pointerout', () => {
            this.tweens.add({
                targets: this.hint_text,
                scaleX: 1,
                scaleY: 1,
                duration: 100,
                ease: 'Power2'
            });
        });

        this.reveal_text.on('pointerdown', () => {
            this.sound.play('CorrectSound');
        }); 

        this.reveal_text.on('pointerover', () => {
            this.sound.play('HoverSound');
            this.tweens.add({
                targets: this.reveal_text, 
                scaleX: 1.01,
                scaleY: 1.01,
                duration: 100,
                ease: 'Power2'
            });
        })

        this.reveal_text.on('pointerout', () => {
            this.tweens.add({
                targets: this.reveal_text,
                scaleX: 1,
                scaleY: 1,
                duration: 100,
                ease: 'Power2'
            });
        }); 
        
        // Levels 
        // execute ...
        this.create_levels(); 

        // Fullscreen button
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    }

    update () {
        if (this.flag) {
            if (!(this.current_level === undefined)) {
                this.current_level.execute_level(); 
                this.tiempo_rondas.push(this.tiempo_por_ronda); 
                this.tiempo_por_ronda = 0; 
                this.current_level += 1; 
                this.nivel_text.setText('Nivel: ' + this.current_level + '/' + this.number_levels)
            }

            this.pon_tablero(); 
        }
        if (this.fin_del_juego) {
            console.log('El juego termino correctamente'); 
            this.setLog(this.tiempo_por_ronda, this.time_text.text, this.number_levels)
            this.scene.start('LetrasMarinasEnd', log); 
            this.fin_del_juego = false; 
        }
    }

    create_levels() {
        for (let i = 0; i < this.number_levels; i++) {
            this.level_list.push(new Level(this.tablero_config)); 
            this.flag = true; 
        }
    }

    pon_tablero() {
        if (this.level_list.length  != 0 ) {
            this.current_level = this.level_list.shift();
            this.current_board = this.current_level.board; 
            this.current_level.execute_level(); 
            this.flag = false; 
        } else {
            this.fin_del_juego = true; 
            this.flag = false;
        }
    }

     // Add time
    addTime () {
        this.gameTimeSec += 1;
        this.tiempo_por_ronda += 1;
        if (this.gameTimeSec === 59) {
            this.gameTimeSec = 0;
            this.gameTimeMin += 1;
        }

        this.time_text.setText('Tiempo: ' + this.gameTimeMin + ' : ' + this.gameTimeSec);
    }

    setLog(tiempo_rondas, tiempo_total, number_rondas) {
        log.info.numero_rondas = number_rondas;
        log.info.tiempo_rondas = tiempo_rondas;
        log.info.tiempo_total = tiempo_total;
    }
}