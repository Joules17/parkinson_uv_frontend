// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css';

// Custom Classes Imported 
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import LevelObj from 'components/exercises/FotografiasMisteriosas/sprites/LevelObj.js';

const log = {
    info: {
        tiempo_total:  undefined, 
        tiempo_rondas: undefined,
        errores: undefined,
        number_objects: undefined,
        number_levels: undefined
    }
}
export default class FotografiasGame extends Phaser.Scene {
    constructor() {
        super({ key: 'FotografiasGame', backgroundColor: '#3f1651' });
    }

    preload() {}

    builder() {
        // vars
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // timers 
        this.gameTimeSec = 0; 
        this.gameTimeMin = 0;
        this.tiempo_rondas = [];
        this.tiempo_por_ronda = 0; 

        // execution variables 
        this.number_objects = 5; 
        this.tries = 3; 
        this.number_levels = 1; 
        this.current_round = 1;
        this.current_level = 1;  
        this.tablero_actual = undefined; 
        this.errores = 0; 
        this.fin_del_juego = false; 
        this.fase_asking = false; 

        // config 
        this.default_config = {
            scene: this, 
            number_objects: 5, 
            category: ['frutas', 'comida', 'casa'],
            actual: true, 
        }; 
    }

    flashScreen() {
        this.tweens.add({
            targets: this.dark_overlay,
            alpha: 1,
            duration: 1500, 
            yoyo: true,
            onComplete: () => {
                this.dark_overlay.setAlpha(0);
            }
        });
    }

    create() {
        // constructor aux
        this.builder();

        // game --- 
        this.game = this.sys.game;
        this.bg = this.add.sprite(400, 300, 'BgRed');

        //  initialize config 
        const settings = this.sys.settings.data.settings; 
        
        // number_objects
        if (settings.number_objects !== undefined) {
            this.number_objects = parseInt(settings.number_objects);
        }

        // number_levels 
        if (settings.niveles !== undefined) {
            this.number_levels = parseInt(settings.niveles);
        }

        // categorias 
        if (settings.categorias !== undefined) {
            this.categorias = settings.categorias; 
        } else {
            this.categorias = ['frutas', 'comida', 'casa'];
        }

        // tries
        if (settings.tries !== undefined) {
            this.tries = parseInt(settings.tries);
        }
        
        // config 
        this.default_config['number_objects'] = this.number_objects;
        this.default_config['category'] = this.categorias;

        
        // Rollo Up 
        this.rollo_down = this.add.tileSprite(400, 560, 3000, 269, 'RolloImg').setScale(0.3).setScrollFactor(0);
        
        // Stats
        // Panels
        this.panel_tiempo = this.add.graphics();
        this.panel_tiempo.fillStyle(0x000000, 0.5);
        this.panel_tiempo.fillRect(10, 0, 190, 50);

        this.panel_level = this.add.graphics();
        this.panel_level.fillStyle(0x000000, 0.5);
        this.panel_level.fillRect(205, 0, 190, 50);

        this.panel_errores = this.add.graphics();
        this.panel_errores.fillStyle(0x000000, 0.5);
        this.panel_errores.fillRect(400, 0, 190, 50);

        // Text
        this.text_tiempo = this.add.text(20, 10, 'Tiempo: 0:0', { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(40);
        this.text_level = this.add.text(215, 10, 'Nivel: ' + this.current_level + '-'+ this.current_round, { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(40);
        this.text_intentos = this.add.text(410, 10, 'Intentos: ' + this.tries, { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(40);
        // --
        this.shade_circle = this.add.graphics();
        this.shade_circle.fillStyle(0x000000, 1);
        this.shade_circle.fillCircle(400, 310, 200);

        this.base_circle = this.add.graphics(); 
        this.base_circle .fillStyle(0xffffff, 1);
        this.base_circle .fillCircle(400, 300, 200);

        this.base_circle.setAlpha(0);
        this.shade_circle.setAlpha(0);

        // questions 
        this.panel_question_shade = this.add.graphics();
        this.panel_question_shade.fillStyle(0x000000, 1);
        this.panel_question_shade.fillRoundedRect(100, 95, 600, 150, 20);
        this.panel_question = this.add.graphics(); 
        this.panel_question.fillStyle(0xffffff, 1);
        this.panel_question.fillRoundedRect(100, 90, 600, 150, 20);
        this.panel_question_shade.setAlpha(0); 
        this.panel_question.setAlpha(0);

        this.panel_first_question_shade = this.add.graphics();
        this.panel_first_question_shade.fillStyle(0x000000, 1);
        this.panel_first_question_shade.fillRoundedRect(100, 255, 600, 80, 20);
        this.panel_first_question = this.add.graphics();
        this.panel_first_question.fillStyle(0xffffff, 1);
        this.panel_first_question.fillRoundedRect(100, 250, 600, 80, 20);

        this.panel_second_question_shade = this.add.graphics();
        this.panel_second_question_shade.fillStyle(0x000000, 1);
        this.panel_second_question_shade.fillRoundedRect(100, 345, 600, 80, 20);
        this.panel_second_question = this.add.graphics();
        this.panel_second_question.fillStyle(0xffffff, 1);
        this.panel_second_question.fillRoundedRect(100, 340, 600, 80, 20);

        this.panel_third_question_shade = this.add.graphics();
        this.panel_third_question_shade.fillStyle(0x000000, 1);
        this.panel_third_question_shade.fillRoundedRect(100, 435, 600, 80, 20);
        this.panel_third_question = this.add.graphics();
        this.panel_third_question.fillStyle(0xffffff, 1);
        this.panel_third_question.fillRoundedRect(100, 430, 600, 80, 20);
        
        this.panel_first_question_shade.setAlpha(0);
        this.panel_second_question_shade.setAlpha(0);
        this.panel_third_question_shade.setAlpha(0);
        this.panel_first_question.setAlpha(0);
        this.panel_second_question.setAlpha(0);
        this.panel_third_question.setAlpha(0);


        // question 
        this.question = this.add.text(120, 125, '', {fontFamily: 'TROUBLE', fill: '#000000'}).setFontSize(60);
        this.first_option = this.add.text(150, 270, '', {fontFamily: 'TROUBLE', fill: '#000000'}).setFontSize(50);
        this.second_option = this.add.text(150, 360, '', {fontFamily: 'TROUBLE', fill: '#000000'}).setFontSize(50);
        this.third_option = this.add.text(150, 450, '', {fontFamily: 'TROUBLE', fill: '#000000'}).setFontSize(50);

        // Dark Overlay   
        this.dark_overlay = this.add.graphics(); 
        this.dark_overlay.fillStyle(0x000000, 1);
        this.dark_overlay.fillRect(0, 0, 800, 600); 
        this.dark_overlay.setAlpha(0);

        // Fullscreen bttn 
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        // Level Object
        console.log(this.number_levels, 'number_levels')
        this.levels = []; 
        for (let i = 0; i < this.number_levels; i++) {
            this.levels.push(new LevelObj(this.default_config));
        }

        this.levelObj = this.levels[this.current_level-1]; 

        this.shade_circle.setAlpha(1);
        this.base_circle.setAlpha(1); 
        // CountDown 
        this.count_back(3, () => {
            this.flashScreen(); 
            this.levelObj.show_objects(); 
        });

        // Timer 
        this.time.addEvent({delay: 1000, callback: this.addTime, callbackScope: this, loop: true});
    }

    objectsDisplayed(displayedObjects) {
        // comienza fase de preguntas 
        this.fase_asking = true;
        // Ocultar círculo y otros elementos
        this.shade_circle.setAlpha(0);
        this.base_circle.setAlpha(0);
    
        this.displayedObjects = displayedObjects;
    
        this.show_questions(1); 
    }
    
    show_questions(num) {
        this.panel_question.setAlpha(num); 
        this.panel_question_shade.setAlpha(num);
        this.panel_first_question_shade.setAlpha(num);
        this.panel_first_question.setAlpha(num);
        this.panel_second_question_shade.setAlpha(num);
        this.panel_second_question.setAlpha(num);
        this.panel_third_question_shade.setAlpha(num);
        this.panel_third_question.setAlpha(num);
    }

    count_back(sec, callback) {
        let count = sec;
        const countdownText = this.add.text(400, 300, count, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(200);
        countdownText.setOrigin(0.5);
    
        const countdownInterval = setInterval(() => {
            this.sound.play('CorrectSound'); 
            count--;
            countdownText.setText(count);
    
            if (count <= 0) {
                clearInterval(countdownInterval);
                countdownText.destroy();
                callback();
            }
        }, 1000);
    }

    show_last_message() {
        console.log('El juego termino exitosamente')
        this.setLog(this.tiempo_rondas, this.text_tiempo, this.errores, this.number_objects, this.number_levels)
        this.scene.start('FotografiasEnd', log, {game: this.game}) 
    }

    check_failure () {
        if (this.tries <= 0 ) {
            console.log('Juego fallado')
            const settings = this.sys.settings.data.settings;
            this.scene.start('FotografiasFailed', {settings}, {game: this.game}); 
        }
    }

    addTime () {
        if (this.fase_asking) {
            this.gameTimeSec += 1;
            this.tiempo_por_ronda += 1; 
            if (this.gameTimeSec === 60) {
                this.gameTimeSec = 0;
                this.gameTimeMin += 1;
            }

            this.text_tiempo.setText('TIEMPO: ' + this.gameTimeMin + ':' + this.gameTimeSec);
        }
    }

    update() {
        this.rollo_down.tilePositionX += 0.5;
    }


    // logs 
    setLog (tiempo_rondas, tiempo_total, errores, number_objects, number_levels) {
        log.info.tiempo_rondas = tiempo_rondas;
        log.info.tiempo_total = tiempo_total;
        log.info.errores = errores;
        log.info.number_objects = number_objects;
        log.info.number_levels = number_levels;
    }
}