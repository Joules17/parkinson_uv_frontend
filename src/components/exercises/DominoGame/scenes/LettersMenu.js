// phaser library
import Phaser from 'phaser';

// styles
import 'components/exercises/general_assets/styles.css'

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import SteroidObject from 'components/Factory/SteroidObject.js';

export default class LettersMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'LettersMenu', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // vars
        this.pressed = false;

    }

    preload() { }

    create() {
        this.game = this.sys.game
        // Background --------------------------------------------------
        this.add.sprite(400, 300, 'BgForest');

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
        this.red_circle = this.add.graphics();
        this.red_circle.fillStyle(0xe15554, 1);
        this.red_circle.fillCircle(400, 270, 260);
        this.main_circle = this.add.graphics();
        this.main_circle.fillStyle(0xffffff, 1);
        this.main_circle.fillCircle(400, 270, 250);
        this.main_circle.lineStyle(5, 0x000000)
        this.main_circle.strokeCircle(400, 270, 250);

        // Texts --------------------------------------------------------
        this.title = this.add.text(200, 130, '   LETRAS\n      VS\n  NUMEROS', {
            fontFamily: 'TROUBLE',
            fill: '#000000',
        }).setFontSize(120);
        // --------------------------------------------------------------

        this.panel_start = this.add.graphics();
        this.panel_start.fillStyle(0x000000, 1);
        this.panel_start.fillRect(185, 465, 140, 70);

        // buttons
        this.start_button = this.add.text(200, 480, 'INICIAR', {
            fontFamily: 'TROUBLE',
            fill: '#eb3724',
        }).setFontSize(50);

        this.panel_tuto = this.add.graphics();
        this.panel_tuto.fillStyle(0x000000, 1);
        this.panel_tuto.fillRect(435, 465, 170, 70);

        this.tuto_button = this.add.text(450, 480, 'TUTORIAL', {
            fontFamily: 'TROUBLE',
            fill: '#eb3724'
        }).setFontSize(50);

        this.start_button.setInteractive();
        this.tuto_button.setInteractive();

        // --------------------------------------------------------------
        // fullScreenButton
        new FullScreenBttn(this, 770, 30, 'fullscreenImg');

        // entered buttons
        // start_button
        this.start_button.on('pointerdown', () => {
            this.sound.play('CorrectSound')
            this.fade([this.pino_der, this.pino_izq, this.red_circle, this.main_circle, this.title, this.start_button, this.tuto_button, this.panel_start, this.panel_tuto], 2000, this, 'game')
        });

        this.start_button.on('pointerover', () => {
            this.sound.play('HoverSound')
            this.tweens.add({
                targets: this.start_button,
                scale: 1.1,
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
                scale: 1.1,
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
            this.fade([this.pino_der, this.pino_izq, this.red_circle, this.main_circle, this.title, this.start_button, this.tuto_button, this.panel_start, this.panel_tuto], 2000, this, 'tuto')
        });

    }

    update() {
        if (this.game_flag) {
            const settings = this.sys.settings.data.settings;
            this.scene.start('LettersGame', { settings }, { game: this.game })
            this.game_flag = false;
        }
        if (this.tuto_flag) {
            const settings = this.sys.settings.data.settings;
            this.scene.start('LettersTutorial', { settings }, { game: this.game })
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