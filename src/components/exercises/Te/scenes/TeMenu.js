// phaser library
import Phaser from 'phaser';

// styles
import 'components/exercises/general_assets/styles.css'

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import SteroidObject from 'components/Factory/SteroidObject.js';

export default class TeMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'TeMenu', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // vars
        this.pressed = false;

    }

    preload() { }

    create() {
        this.game = this.sys.game
        // Background --------------------------------------------------
        this.add.sprite(400, 300, 'ClockBgImg');

        // panel_circle
        this.panel_circle = this.add.graphics();
        this.panel_circle.fillStyle(0xd2cfe2, 1);
        this.panel_circle.fillCircle(790, 300, 280);

        // Clock
        this.clock_shape = this.add.sprite(790, 300, 'ClockShapeImg').setScale(0.22);

        // hand 
        this.hand = this.add.graphics();
        this.hand.lineStyle(10000, 0xff0000); 

        // center dot 
        this.center_dot = this.add.graphics();
        this.center_dot.fillStyle(0x000000, 1);
        this.center_dot.fillCircle(790, 300, 10);

        

        // Panel title 
        this.panel_title = this.add.graphics();
        this.panel_title.fillStyle(0xffffff, 1);
        this.panel_title.fillRect(100, 200, 590, 120);

        this.title_text = this.add.text(110, 220, 'LA HORA DEL TE', {
            fontFamily: 'TROUBLE',
            fill: '#000000',
        }).setFontSize(120);

        // 
        this.panel_button = this.add.graphics();
        this.panel_button.fillStyle(0x000000, 1);
        this.panel_button.fillRect(335, 340, 140, 70);

        this.start_button = this.add
            .text(350, 355, 'Iniciar', {
                fontFamily: 'TROUBLE',
                fill: '#3bb173'
            })
            .setFontSize(50);
        
        this.start_button.setInteractive({ useHandCursor: true }); 

        // event buttons 
        this.start_button.on('pointerdown', () => {
            const settings = this.sys.settings.data.settings; 
            this.sound.play('CorrectSound'); 
            this.scene.start('TeGame', { settings }, {game: this.game}); 
        }); 

        this.start_button.on('pointerover', () => {
            this.sound.play('HoverSound'); 
            this.tweens.add({
                targets: this.start_button,
                scale: 1.06,
                duration: 100,
                ease: 'Power2'
            }); 
        })

        this.start_button.on('pointerout', () => {
            this.tweens.add({
                targets: this.start_button,
                scale: 1,
                duration: 100,
                ease: 'Power2'
            }); 
        })

        // Fullscreen
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        this.time.addEvent({
            delay: 1000,
            callback: this.rotateHand,
            callbackScope: this,
            loop: true,
        });
    }

    rotateHand() {
        const currentTime = this.time.now * 0.0001;
        const angle = currentTime * (Math.PI * 2 / 6); 

        this.hand.clear();
        
        this.updateHand(angle);
    }

    updateHand(angle) {
        console.log('HOLA')
        this.hand.lineBetween(790, 300, 790 - Math.cos(angle) * 250, 300 - Math.sin(angle) * 250);
    }

    update() {
    }
}