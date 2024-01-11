// Phaser Library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css'

// custom classes imported
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import SteroidObject from 'components/Factory/SteroidObject.js';
import Tablero from 'components/exercises/BubbleParty/sprites/Tablero.js';
import bubble_list from 'components/exercises/general_assets/images/objects/bubble_list';

const log = {
    info: {
        tiempo_total: undefined,
        tiempo_rondas: undefined,
        errores: undefined,
        rondas: undefined
    }
};

export default class BubblePartyGame extends Phaser.Scene {
    constructor() {
        super({ key: 'BubblePartyGame', backgroundColor: 0xffffff });
    }

    preload() { }

    builder() {
        // config rondas
        this.worldSizeWidth = 800;
        this.worldSizeHeight = 600;

        // level variables
        this.current_level = 1;
        this.tries = 3;
        this.number_fases = 10;
        this.number_errors = 0;

        // tablero
        this.current_tablero = undefined;

        // timers
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
        this.tiempo_rondas = [];
        this.tiempo_por_ronda = 0; // en segundo
    }

    create() {
        // constructor aux
        this.builder();

        // game
        this.game = this.sys.game;
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

        // background
        this.bg = this.add.tileSprite(400, 300, 800, 600, 'SeaImg').setDepth(-2).setScrollFactor(0);

        // algae
        this.algae_der = new SteroidObject({ scene: this, posx: -10, posy: 350, key: 'AlgaeRedImg' }).dance_function(-5, 5000);
        this.algae_izq = new SteroidObject({ scene: this, posx: 810, posy: 350, key: 'AlgaeGreenImg' }).dance_function(5, 5000);

        // Panel time
        this.panel_time = this.add.graphics();
        this.panel_time.fillStyle(0x000000, 0.5);
        this.panel_time.fillRect(10, 550, 170, 50);

        this.time_text = this.add.text(20, 560, 'TIEMPO: ' + this.gameTimeMin + ':' + this.gameTimeSec, { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(40);

        // Panel Rondas
        this.panel_rounds = this.add.graphics();
        this.panel_rounds.fillStyle(0x000000, 0.5);
        this.panel_rounds.fillRect(190, 550, 200, 50);

        this.rounds_text = this.add.text(200, 560, 'RONDAS: ' + this.current_level + '/' + this.number_fases, { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(40);

        // Panel Errors
        this.panel_errors = this.add.graphics();
        this.panel_errors.fillStyle(0x000000, 0.5);
        this.panel_errors.fillRect(400, 550, 170, 50);

        this.errors_text = this.add.text(410, 560, 'ERRORES: ' + this.number_errors, { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(40);

        // Panel Tries
        this.panel_tries = this.add.graphics();
        this.panel_tries.fillStyle(0x000000, 0.5);
        this.panel_tries.fillRect(580, 550, 200, 50);

        this.tries_text = this.add.text(590, 560, 'INTENTOS: ' + this.tries, { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(40);

        // Panels Base for Game
        // Base del tablero:
        this.gen_base();

        // Panel Game
        this.create_boards();

        // Gen Buttons
        this.gen_buttons();
        // Fullscreen button
        new FullScreenBttn(this, 770, 30, 'FullscreenImg')

        // AQUI SE HACE EL LLAMADO A TABLERO

        // timer
        this.time.addEvent({
            delay: 1000,
            callback: this.addTime,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        this.bg.tilePositionY += 0.05
    }

    // customs functions
    gen_base() {
        this.base_panel = this.add.graphics();
        this.base_panel.fillStyle(0xffffff, 1);
        this.base_panel.lineStyle(5, 0x004aad)
        this.base_panel.fillRoundedRect(35, 35, 450, 450, 10);
        this.base_panel.strokeRoundedRect(35, 35, 450, 450, 10);

        this.guess_panel = this.add.graphics();
        this.guess_panel.fillStyle(0xffffff, 1);
        this.guess_panel.lineStyle(5, 0x004aad)
        this.guess_panel.fillRoundedRect(540, 100, 250, 250, 10);
        this.guess_panel.strokeRoundedRect(540, 100, 250, 250, 10);

        // button
        this.panel_reveal = this.add.graphics();
        this.panel_reveal.lineStyle(10, 0xe15554);
        this.panel_reveal.strokeRect(550, 370, 230, 60);
        this.panel_reveal.fillStyle(0x000000, 1);
        this.panel_reveal.setAlpha(0.9)
        this.panel_reveal.fillRect(550, 370, 230, 60);

        this.reveal_text = this.add.text(560, 385, '    COMPROBAR    ', { fontFamily: 'TROUBLE', fill: '#e15554' }).setFontSize(40);
        this.reveal_text.setInteractive({ useHandCursor: true });

        // events
        this.reveal_text.on('pointerdown', () => {
            if (this.tablero.check_complete()) {
                this.sound.play('GoodSound')
                this.win_procedure(); 
            } else {
                this.sound.play('BadSound');
                this.error_procedure(); 
            }
        });

        this.reveal_text.on('pointerover', () => {
            this.sound.play('HoverSound');
            this.tweens.add({
                targets: this.reveal_text,
                scale: 1.01,
                duration: 100,
                ease: 'Power2'
            });
        });

        this.reveal_text.on('pointerout', () => {
            this.tweens.add({
                targets: this.reveal_text,
                scale: 1,
                duration: 100,
                ease: 'Power2'
            })
        });
    }

    // buttons
    gen_buttons() {
        const buttonSize = 90;

        // Crear botones para mover filas hacia la izquierda
        for (let fila = 0; fila < this.tablero.filas; fila++) {
            const button = this.add.sprite(20, 80 + fila * buttonSize, 'ArrowLeftImg').setScale(0.01).setInteractive({ useHandCursor: true });
            button.on('pointerdown', () => {
                this.sound.play('BubblePopSound')
                this.tablero.move_row_left(fila)
            });
        }

        // Crear botones para mover filas hacia la derecha
        for (let fila = 0; fila < this.tablero.filas; fila++) {
            const button = this.add.sprite(50 + buttonSize * 5, 80 + fila * buttonSize, 'ArrowRightImg').setScale(0.01).setInteractive({ useHandCursor: true });
            button.on('pointerdown', () => {
                this.sound.play('BubblePopSound');
                this.tablero.move_row_right(fila)
            });
        }

        // Crear botones para mover columnas hacia arriba
        for (let columna = 0; columna < this.tablero.columnas; columna++) {
            const button = this.add.sprite(80 + columna * buttonSize, 20, 'ArrowUpImg').setScale(0.01).setInteractive({ useHandCursor: true });
            button.on('pointerdown', () => {
                this.sound.play('BubblePopSound');
                this.tablero.move_column_up(columna)
            }
            );
        }

        // Crear botones para mover columnas hacia abajo
        for (let columna = 0; columna < this.tablero.columnas; columna++) {
            const button = this.add.sprite(80 + columna * buttonSize, 50 + buttonSize * 5, 'ArrowDownImg').setScale(0.01).setInteractive({ useHandCursor: true });
            button.on('pointerdown', () => {
                this.sound.play('BubblePopSound')
                this.tablero.move_column_down(columna)
            });
        }
    }

    create_boards() {
        this.tableros = []
        // words
        const gen_words = this.get_random_words(bubble_list, this.number_fases);
        for (let i = 0; i < this.number_fases; i++) {
            const tablero_aux = new Tablero({
                scene: this,
                filas: 5,
                columnas: 5,
                answer_option: gen_words[i],
                visible: false
            })
            this.tableros.push(tablero_aux);
        }

        // current tablero
        this.tablero = this.tableros.shift(); 
        this.tablero.show(); 
    }

    get_random_words(bubbleList, numTotalWords) {
        const words = [];
        const allWords = [];

        // Obtener todas las palabras disponibles de todas las categorías
        for (const category in bubbleList) {
            const categoryWords = Object.keys(bubbleList[category]);
            allWords.push(...categoryWords);
        }

        // Seleccionar palabras aleatorias con posibilidad de repetir
        while (words.length < numTotalWords) {
            const randomIndex = Math.floor(Math.random() * allWords.length);
            const randomWord = allWords[randomIndex];
            words.push(randomWord);

            // Si se agotaron todas las opciones, reiniciar la lista completa
            if (allWords.length === 0) {
                for (const category in bubbleList) {
                    const categoryWords = Object.keys(bubbleList[category]);
                    allWords.push(...categoryWords);
                }
            }
        }

        return words;
    }

    // win_procedure 
    win_procedure () {
        this.tablero.hide(); 
        
        // level update 
        this.current_level += 1;
        this.tiempo_rondas.push(this.tiempo_por_ronda);
        this.tiempo_por_ronda = 0;
        this.rounds_text.setText('RONDAS: ' + this.current_level + '/' + this.number_fases);
        
        // check if game is over
        if (this.tableros.length === 0) {
            // game over 
            console.log('TERMINA EL JUEGO')
            this.setLog(this.tiempo_rondas, this.time_text, this.number_errors, this.current_level-1)
            this.scene.start('BubblePartyEnd', log, {game: this.game});
        } else {
            // no yet 
            this.tablero = this.tableros.shift();
            this.tablero.show();
        }
    }

    // error procedure 
    error_procedure () {
        this.tries -= 1;
        if (this.tries <= 0) {
            const settings = this.sys.settings.data.settings;
            this.scene.start('BubblePartyFailed', { settings }, {game: this.game});
        } else {
            this.number_errors += 1;
            this.tries_text.setText('INTENTOS: ' + this.tries);
            this.errors_text.setText('ERRORES: ' + this.number_errors);
        }
    }

    // timer
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

    // setLog 
    setLog(tiempo_rondas, tiempo_total, errores, number_rounds) {
        log.info.tiempo_rondas = tiempo_rondas; 
        log.info.tiempo_total = tiempo_total;
        log.info.errores = errores;
        log.info.rondas = number_rounds; 
        console.log('Se esta enviando: ', tiempo_rondas, tiempo_total, errores, number_rounds)
    }
}



