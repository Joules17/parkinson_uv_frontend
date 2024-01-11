// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css';

// Custom Classes Imported 
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import LevelObj from 'components/exercises/FotografiasMisteriosas/sprites/LevelObj.js';

export default class FotografiasLobbySecond extends Phaser.Scene {
    constructor() {
        super({ key: 'FotografiasLobbySecond', backgroundColor: '#3f1651' });
    }

    preload() {}

    builder() {
        // vars
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;
        
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
        
        // Rollo Up 
        this.rollo_up = this.add.tileSprite(400, 40, 3000, 269, 'RolloImg').setScale(0.3).setScrollFactor(0);
        this.rollo_down = this.add.tileSprite(400, 560, 3000, 269, 'RolloImg').setScale(0.3).setScrollFactor(0);
        
        // Panel Title 
        this.panel_title = this.add.graphics();
        this.panel_title.fillStyle(0x000000, 1);
        this.panel_title.fillRect(270, 0, 280, 80);

        // Title
        this.title = this.add.text(300, 15, 'TUTORIAL', { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(80);

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
        this.levelObj = new LevelObj({
            scene: this,
            number_objects: 3,
            category: ['frutas', 'comida', 'casa'],
            actual: true,
        });

        this.shade_circle.setAlpha(1);
        this.base_circle.setAlpha(1); 

        // CountDown 
        this.count_back(3, () => {
            this.flashScreen(); 
            this.levelObj.show_objects(); 
        });
    }

    objectsDisplayed(displayedObjects) {
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
        this.last_message = this.add.graphics();
        this.last_message.fillStyle(0xffffff, 1);
        this.last_message.lineStyle(2, 0x000000); 
        this.last_message.fillRect(100, 180, 600, 250);
        this.last_message.strokeRect(100, 180, 600, 250);

        this.first_message = this.add.text(140, 200, 'TUTORIAL ACABADO', { fontFamily: 'TROUBLE', fill: '#3bb173', stroke: '#000000', strokeThickness: 4 }).setFontSize(90); 
        this.second_message = this.add.text(220, 280, 'Seleccione una opcion', { fontFamily: 'TROUBLE', fill: '#000000'}).setFontSize(50); 

        this.repeat_sprite = this.add.sprite(140, 400, 'RepeatImg').setScale(0.1); 
        this.repeat_message = this.add.text(180, 385, 'Repetir tutorial', { fontFamily: 'TROUBLE', fill: '#000000'}).setFontSize(40); 
    
        this.play_sprite = this.add.sprite(550, 400, 'PlayImg').setScale(0.1);
        this.play_message = this.add.text(590, 385, 'Jugar', { fontFamily: 'TROUBLE', fill: '#000000'}).setFontSize(40);
        
        this.repeat_message.setInteractive({ useHandCursor: true });
        
        this.repeat_message.on('pointerdown', () => {
            this.sound.play('CorrectSound'); 
            const settings = this.sys.settings.data.settings;
            this.scene.start('FotografiasLobby', {settings}, {game: this.game}); 
        }); 

        this.repeat_message.on('pointerover', () => {
            this.repeat_message.setColor('#3bb173');
            this.sound.play('HoverSound'); 
        }); 

        this.repeat_message.on('pointerout', () => {
            this.repeat_message.setColor('#000000');
        });

        this.play_message.setInteractive({ useHandCursor: true });

        this.play_message.on('pointerdown', () => {
            this.sound.play('CorrectSound'); 
            const settings = this.sys.settings.data.settings;
            this.scene.start('FotografiasGame', {settings}, {game: this.game}); 
        }); 

        this.play_message.on('pointerover', () => {
            this.play_message.setColor('#3bb173');
            this.sound.play('HoverSound'); 
        }); 

        this.play_message.on('pointerout', () => {
            this.play_message.setColor('#000000');
        }); 
    }

    update() {
        this.rollo_up.tilePositionX -= 0.5;
        this.rollo_down.tilePositionX += 0.5;
    }
}