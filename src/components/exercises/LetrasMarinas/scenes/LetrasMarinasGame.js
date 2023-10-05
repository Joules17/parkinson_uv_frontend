// Phaser
import Phaser from 'phaser';

// Styles
import 'components/exercises/general_assets/styles.css';

// Custom Classes Imported:
import SteroidObject from 'components/Factory/SteroidObject.js';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import Level from '../sprites/Level';

export default class LetrasMarinasGame extends Phaser.Scene {
    constructor() {
        super({ key: 'LetrasMarinasGame', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;
        // Level Variables
        this.current_level = 1;
        this.number_levels = 5;
        // Timers
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
        this.tiempo_rondas = [];
        this.tiempo_por_ronda = 0; // sec

        // Board
        this.current_board = undefined;
    }

    preload () {}

    create () {
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
        this.panel_time.fillStyle(0xffffff, 0.5);
        this.panel_time.fillRect(10, 555, 190, 50);

        this.time_text = this.add.text(20, 565, 'Tiempo: ' + this.gameTimeMin + ' : ' + this.gameTimeSec, {fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(40);

        // Panel Nivel
        this.panel_nivel = this.add.graphics();
        this.panel_nivel.fillStyle(0xffffff, 0.5);
        this.panel_nivel.fillRect(205, 555, 155, 50);

        this.nivel_text = this.add.text(215, 565, 'Nivel: ' + this.current_level + '/' + this.number_levels, {fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(40);

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
        this.panel_hints.strokeRect(550, 500, 230, 60);
        this.panel_hints.fillStyle(0x000000, 1);
        this.panel_hints.setAlpha(0.9)
        this.panel_hints.fillRect(550, 500, 230, 60);

        this.guessing_text = this.add.text(560, 30, 'FIGURA MISTERIOSA', {fontFamily: 'TROUBLE', fill: '#3bb173'}).setFontSize(37);
        this.hint_text = this.add.text(560, 520,  'PISTAS RESTANTES: 3/3', {fontFamily: 'TROUBLE', fill: '#e0bc28'}).setFontSize(28);
        const nivel = new Level({scene: this, pos_initx: 20, pos_inity: 20, number_cols : 10, number_rows : 10, number_words : 5, categories: ['animales', 'frutas']})
        this.current_board = nivel.board;
        nivel.execute_level();
        // Time
        this.time.addEvent({
            delay: 1000,
            callback: this.addTime,
            callbackScope: this,
            loop: true
        });

        // Panel Words
        this.panel_words = this.add.graphics();
        this.panel_words.fillStyle(0xffffff, 0.5);
        this.panel_words.fillRect(365, 555, 170, 50);

        this.words_text = this.add.text(375, 568, 'Palabras:'+ (nivel.current_index + 1)+ '/'+nivel.number_words, {fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(32)
        // Fullscreen button
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

    }

    update () {
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
}