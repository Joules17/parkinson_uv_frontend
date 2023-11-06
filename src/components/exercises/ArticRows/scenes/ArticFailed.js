// phaser 
import Phaser from 'phaser'; 

// styles 
import 'components/exercises/general_assets/styles.css'

// custom classes imported: 
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class ArticFailed extends Phaser.Scene {
    constructor () {
        super({key: 'ArticFailed', backgroundColor: '#3f1651'});
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;
    }

    preload () {}

    create () {
        this.game = this.sys.game
        // Background 
        this.bg = this.add.image(400, 300, 'BgNightSky');

        // Emitter
        this.emiter = this.add.particles(0, -10, 'SnowImg', {
            x: {min: 0, max: 800},
            quantity: 2, 
            lifespan: 2500, 
            gravityY: 200, 
            scale: { start: 0.01, end: 0.005 },
        }); 
        
        // Messages
        this.title = this.add.text(270, 100, "PERDISTE", {fontFamily: 'TROUBLE', fontSize: 100, color: '#ffffff'}); 

        // panels 
        this.panelStats = this.add.graphics(); 
        this.panelStats.fillStyle(0xffffff, 1);
        this.panelStats.fillRoundedRect(100, 200, 600, 260, 20); 

        // msg
        this.main_message = this.add.text(200, 250, 'ESO FUE UN BUEN INTENTO', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.second_message = this.add
            .text(300, 310, 'NO TE RINDAS, ', { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(50);

        this.third_message = this.add
            .text(210, 370, 'SIGUE CON DETERMINACION!', { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(50);
        
        // button 
        this.button_message = this.add.text(275, 500, 'VOLVER A JUGAR', {fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(50);
        this.button_message.setInteractive({ useHandCursor: true });

        // FullScreen bttn 
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        // listeners
        this.button_message.on('pointerdown', () => {
            const settings = this.sys.settings.data.settings; 
            this.sound.play('StartButtonSound');

            // Stop all scenes
            for (const scene of this.scene.manager.getScenes(false)) {
                scene.scene.stop();
            }
            this.scene.start('ArticInit', { setting: settings }, { game: this.game });
        }); 

        this.button_message.on('pointerover', () => {
            this.button_message.setColor('#4e9de0');
            this.tweens.add({
                targets: this.button_message,
                scale: 1.01,
                duration: 100,
                ease: 'Power2'
            });
        }); 

        this.button_message.on('pointerout', () => {
            this.button_message.setColor('#ffffff');
            this.tweens.add({
                targets: this.button_message,
                scale: 1,
                duration: 100,
                ease: 'Power2'
            });
        }); 
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

    