// Phaser Library 
import Phaser from 'phaser'; 
import 'components/exercises/general_assets/styles.css';

// Custom Classes imported 
import FullScreenBttn from 'components/Factory/FullScreenBttn';

export default class TeFailed extends Phaser.Scene {
    constructor () {
        super({ key: 'TeFailed', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

    }


    preload () {}

    create () {
        this.game = this.sys.game
        // Background ------------------------------------------------------------------------------------------------------------
        this.cameras.main.setBackgroundColor('#e0bc28');
        this.bg = this.add.sprite(400, 300, 'ClockBgImg').setDepth(-2);
        
        // Clock 
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

        // Panel Title ------------------------------------------------------------------------------------------------------------
        this.panel_guessing = this.add.graphics();
        this.panel_guessing.lineStyle(10, 0x3bb173);
        this.panel_guessing.strokeRect(100, 90, 600, 90);
        this.panel_guessing.fillStyle(0x000000, 1);
        this.panel_guessing.setAlpha(0.9)
        this.panel_guessing.fillRect(100, 90, 600, 90);

        this.title = this.add.text(260, 100, 'PERDISTE', { fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(100); 
        // Figures
        this.panel_results = this.add.graphics();
        this.panel_results.fillStyle(0xffffff, 1);
        this.panel_results.lineStyle(10, 0x3bb173);
        this.panel_results.fillRoundedRect(100, 200, 600, 200, 20)
        this.panel_results.strokeRoundedRect(100, 200, 600, 200, 20)

        // msg 
        this.main_message = this.add.text(200, 250, 'ESO FUE UN BUEN INTENTO', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.second_message = this.add
            .text(210, 310, 'NO TE RINDAS, SIGUE ASI!', { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(50);
        
        // button 
        this.panel_button = this.add.graphics();
        this.panel_button.fillStyle(0xffffff, 1);
        this.panel_button.lineStyle(2, 0x000000); 
        this.panel_button.fillRoundedRect(290, 420, 220, 50, 20); // x, y, ancho, alto, radio de curvatura
        this.panel_button.strokeRoundedRect(290, 420, 220, 50, 20)

        this.button_message = this.add.text(300, 430, 'VOLVER A JUGAR', {fontFamily: 'TROUBLE', fill: '#000000'}).setFontSize(40);
        this.button_message.setInteractive({ useHandCursor: true });

        // FullScreen button 
        new FullScreenBttn(this, 770, 30, 'FullscreenImg')

        // listeners
        this.button_message.on('pointerdown', () => {
            const settings = this.sys.settings.data.settings; 
            this.sound.play('CorrectSound');

            // Stop all scenes
            for (const scene of this.scene.manager.getScenes(false)) {
                // console.log('Hola aqui estoy vamos a ver que sucede, ' + scene.scene.key)
                if (scene.scene.key === 'ObjectEnd') {
                    continue; 
                }
                scene.scene.stop(); 
            }
            this.scene.start('TeInit', { setting: settings }, { game: this.game });
        }); 

        this.button_message.on('pointerover', () => {
            this.button_message.setColor('#e15554');
            this.tweens.add({
                targets: this.button_message,
                scale: 1.01,
                duration: 100,
                ease: 'Power2'
            });
        }); 

        this.button_message.on('pointerout', () => {
            this.button_message.setColor('#000000');
            this.tweens.add({
                targets: this.button_message,
                scale: 1,
                duration: 100,
                ease: 'Power2'
            });
        }); 

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

    update () {
        
    }

    emitDataToReactComponent(dataToSend) {
        if (this.game) {
            // Emitir un evento personalizado
            this.game.events.emit('dataToReactComponent', dataToSend);
        } else {
            console.error('this.game no es válido. Asegúrate de que el juego esté configurado correctamente.');
        }
    }
}