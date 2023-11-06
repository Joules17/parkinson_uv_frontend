// phaser library 
import Phaser from 'phaser'; 

// styles
import 'components/exercises/general_assets/styles.css'; 

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class LetrasFailed extends Phaser.Scene {
    constructor() {
        super({ key: 'LetrasFailed', backgroundColor: '#3f1651'})

        // dimensions 
        this.world_size_width = 800;
        this.world_size_height = 600;
        // var
        this.flag = false; 
    }

    preload () {
        this.waveOffset = 0;
    }

    create () {
        this.game = this.sys.game
        // bg 
        this.bg = this.add.image(400, 300, 'BgMint')

        this.title = this.add.text(270,100, "PERDISTE", { fontFamily : 'TROUBLE', fill: '#000000'}).setFontSize(100)

        // Figures ------------------------------------------------------------------------------------------
        this.panelStats = this.add.graphics();
        this.panelStats.fillStyle(0xffffff, 1);
        this.panelStats.fillRoundedRect(100, 200, 600, 200, 20); // x, y, ancho, alto, radio de curvatura
        this.panelStats.setAlpha(0);
        // Messages -----------------------------------------------------------------------------------------
        // msg
        this.main_message = this.add.text(200, 250, 'ESO FUE UN BUEN INTENTO', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.second_message = this.add
            .text(210, 310, 'NO TE RINDAS, SIGUE ASI!', { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(50);

        // Button 
        this.panel_button = this.add.graphics();
        this.panel_button.fillStyle(0xffffff, 1);
        this.panel_button.lineStyle(2, 0x000000); 
        this.panel_button.fillRoundedRect(290, 420, 220, 50, 20); // x, y, ancho, alto, radio de curvatura
        this.panel_button.strokeRoundedRect(290, 420, 220, 50, 20)

        this.button_message = this.add.text(300, 430, 'VOLVER A JUGAR', {fontFamily: 'TROUBLE', fill: '#000000'}).setFontSize(40);
        this.button_message.setInteractive({ useHandCursor: true });

        this.statsShow(this, false);
        // -----------------------------------------------------
        this.aparecer(this.panelStats, this)
        
        // Clouds ------------------------------------------------------------------------------------------------
        this.clouds = this.physics.add.group(); 
        for (let i = 0; i < 10; i++) {
            this.clouds.add(this.add.circle(50 + i * 90, 0, 70,0xfff7768ad, 0));
            this.clouds.add(this.add.circle(50 + i * 90, 600, 70,0xfff7768ad, 0));
        }

        this.clouds.children.iterate((ball) => {
            ball.originalY = ball.y;
        });

        // fullScreenButton
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        // listeners 
        // listeners 
        this.button_message.on('pointerdown', () => {
            const settings = this.sys.settings.data.settings; 

            // Stop all scenes
            for (const scene of this.scene.manager.getScenes(false)) {
                scene.scene.stop();
            }
            this.scene.start('LetrasInit', { setting: settings }, { game: this.game });
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
    }

    update () {
        this.waveOffset += 0.01;
        // wave movement 
        this.clouds.children.each((child) => {
            child.y = child.originalY + Math.sin(child.x / 40 + this.waveOffset) * 20;
        });
        if (this.flag) {
            this.statsShow(this, true)
            this.flag = false; 
        }
    }

    // custom functions 

    statsShow(scene, value) {
        scene.main_message.setVisible(value);
        scene.second_message.setVisible(value);
        scene.panel_button.setVisible(value);
        scene.button_message.setVisible(value);
    }

    aparecer (obj, scene) {
        this.tweens.add({
            targets: obj, 
            alpha: 1, 
            duration: 1500, 
            ease: 'Power 2', 
            onComplete: function () {
                scene.flag = true; 
            }
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