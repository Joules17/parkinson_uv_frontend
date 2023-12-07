// phaser library
import Phaser from 'phaser';

// styles
import 'components/exercises/general_assets/styles.css'

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import SteroidObject from 'components/Factory/SteroidObject.js';

export default class CuadrillaMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'CuadrillaMenu', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // vars
        this.pressed = false;

    }

    preload() { }

    create() {
        this.game = this.sys.game
        // Background --------------------------------------------------
        this.movement_bg = this.add.tileSprite(400, 300, 800, 600, 'BgForest').setScrollFactor(0);

        this.pino_der = new SteroidObject({ scene: this, posx: 830, posy: 300, key: 'TreeImg' });
        this.pino_izq = new SteroidObject({ scene: this, posx: -30, posy: 300, key: 'TreeImg' });

        this.pino_der.setScale(0.4);
        this.pino_izq.setScale(0.4).setFlipX(true);

        this.pino_der.dance_function(3, 2000);
        this.pino_izq.dance_function(-3, 2000);

        // --------------------------------------------------------------
        // flag variables
        this.flag = false;

        // Panels -------------------------------------------------------
        this.red_panel = this.add.graphics();
        this.red_panel.fillStyle(0xe15554, 1);
        this.red_panel.fillRect(100, 100, 600, 270);
        
        this.main_panel = this.add.graphics();
        this.main_panel.fillStyle(0xffffff, 1);
        this.main_panel.lineStyle(5, 0x000000); 
        this.main_panel.fillRect(110, 110, 580, 250);
        this.main_panel.strokeRect(110, 110, 580, 250);

        // Texts --------------------------------------------------------
        this.title = this.add.text(220, 130, '  CUADRILLA\n        DE\n', {
            fontFamily: 'TROUBLE',
            fill: '#000000',
        }).setFontSize(90);
        this.second_title = this.add.text(140, 265, 'LETRAS Y NUMEROS', {
            fontFamily: 'TROUBLE',
            fill: '#000000',
        }).setFontSize(90);
        // --------------------------------------------------------------

        this.panel_start = this.add.graphics();
        this.panel_start.fillStyle(0x000000, 1);
        this.panel_start.fillRect(185, 385, 140, 70);

        // buttons
        this.start_button = this.add.text(200, 400, 'INICIAR', {
            fontFamily: 'TROUBLE',
            fill: '#eb3724',
        }).setFontSize(50);

        this.panel_tuto = this.add.graphics();
        this.panel_tuto.fillStyle(0x000000, 1);
        this.panel_tuto.fillRect(435, 385, 170, 70);

        this.tuto_button = this.add.text(450, 400, 'TUTORIAL', {
            fontFamily: 'TROUBLE',
            fill: '#eb3724'
        }).setFontSize(50);

        this.start_button.setInteractive({ useHandCursor: true });
        this.tuto_button.setInteractive({ useHandCursor: true });

        // --------------------------------------------------------------
        // fullScreenButton
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        // entered buttons
        // start_button
        this.start_button.on('pointerdown', () => {
            this.sound.play('CorrectSound')
            this.fade([this.pino_der, this.pino_izq, this.red_panel, this.main_panel, this.title, this.second_title, this.start_button, this.tuto_button, this.panel_start, this.panel_tuto], 2000, this, 'game')
        });

        this.start_button.on('pointerover', () => {
            this.sound.play('HoverSound')
            this.tweens.add({
                targets: this.start_button,
                scale: 1.01,
                duration: 100,
                ease: 'Power2'
            });
        });

        this.start_button.on('pointerout', () => {
            this.start_button.setColor('#eb3724')
            this.tweens.add({
                targets: this.start_button,
                scaleX: 1,
                scaleY: 1,
                duration: 100,
                ease: 'Power2'
            });
        });

        // tuto_button
        this.tuto_button.on('pointerover', () => {
            this.sound.play('HoverSound')
            this.tweens.add({
                targets: this.tuto_button,
                scale: 1.01,
                duration: 100,
                ease: 'Power2'
            });
        });

        this.tuto_button.on('pointerout', () => {
            this.tuto_button.setColor('#eb3724')
            this.tweens.add({
                targets: this.tuto_button,
                scaleX: 1,
                scaleY: 1,
                duration: 100,
                ease: 'Power2'
            });
        });
        this.tuto_button.on('pointerdown', () => {
            this.sound.play('CorrectSound')
            this.fade([this.pino_der, this.pino_izq, this.red_circle, this.main_panel, this.red_panel, this.title, this.second_title, this.start_button, this.tuto_button, this.panel_start, this.panel_tuto], 2000, this, 'tuto')
        });

    }

    update() {
        this.movement_bg.tilePositionY -= 0.5;
        if (this.game_flag) {
            const settings = this.sys.settings.data.settings;
            this.scene.start('CuadrillaMain', { settings }, { game: this.game })
            this.game_flag = false;
        }
        if (this.tuto_flag) {
            const settings = this.sys.settings.data.settings;
            this.scene.start('CuadrillaTuto', { settings }, { game: this.game })
            this.tuto_flag = false;
        }
    }

    fade(sprites, duration, escena, indicator) {
        this.tweens.add({
            targets: sprites,
            alpha: 0,
            duration: duration,
            ease: 'Power2',
            yoyo: false,
            repeat: 0,
            onComplete: function () {
                if (indicator === 'game') {
                    escena.game_flag = true;
                } else {
                    escena.tuto_flag = true;
                }
            }
        });
    }
}