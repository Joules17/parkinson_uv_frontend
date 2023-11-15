// Phaser
import Phaser from 'phaser'; 
import 'components/exercises/general_assets/styles.css';

// custom classes
import FullScreenBttn from 'components/Factory/FullScreenBttn';

export default class RememberFailed extends Phaser.Scene {
    constructor () {
        super ({ key: 'RememberFailed', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // paneles
        this.panelStats = undefined;
        
        // variables
        this.pressed = false;

        // grupos 
        this.frutas_lluviosas = undefined;

        // skins
        this.skins = ['coco', 'mango', 'banana', 'manzana'];
    }

    preload () {}

    create () {
        this.game = this.sys.game
        // Background 
        this.cameras.main.setBackgroundColor('#e0bc28');
        this.bg = this.add.sprite(400, 300, 'BgSkye').setDepth(-2);

        // Flag Variable -----------------------------------------------------------------------------------------------
        this.flag = false 

        // Figuras de fondo --------------------------------------------------------------------------------------------
        this.bushes_sprite = this.add.sprite(100, 500, 'FirstBush').setScale(0.12);
        this.bushes_sprite2 = this.add.sprite(600, 500, 'SecondBush').setScale(0.12);
        
        this.title = this.add.text(200, 100, '¡Perdiste!', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(100);

        this.panelStats = this.add.graphics();
        this.panelStats.fillStyle(0xffffff, 1);
        this.panelStats.fillRoundedRect(100, 200, 600, 200, 20); // x, y, ancho, alto, radio de curvatura
        this.panelStats.setAlpha(0)

        // Mensajes 
        this.main_message = this.add.text(200, 250, 'ESO FUE UN BUEN INTENTO', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.second_message = this.add.text(210, 310, 'NO TE RINDAS, SIGUE ASI!', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        
        // button
        this.panel_button = this.add.graphics();
        this.panel_button.fillStyle(0xffffff, 1);
        this.panel_button.lineStyle(2, 0x000000); 
        this.panel_button.fillRoundedRect(290, 420, 220, 50, 20); // x, y, ancho, alto, radio de curvatura
        this.panel_button.strokeRoundedRect(290, 420, 220, 50, 20)

        this.button_message = this.add.text(300, 430, 'VOLVER A JUGAR', {fontFamily: 'TROUBLE', fill: '#000000'}).setFontSize(40);
        this.button_message.setInteractive({ useHandCursor: true });
        // fullscreenButton 
        new FullScreenBttn(this, 770, 30, 'FullscreenImg'); 
        
        // 
        this.aparecer(this.panelStats, this)

        // Frutas lluviosas
        this.frutas_lluviosas = this.physics.add.group();

        // Eventos 
        // Caida de frutas
        this.timer = this.time.addEvent({
            delay: 200,
            callback: function () {
                var randind = Math.floor(Math.random() * this.skins.length);
                var fruit = this.add.sprite(Math.random() * 800, -50, this.skins[randind]).setScale(0.1);
                this.frutas_lluviosas.add(fruit);
                fruit.setDepth(-1);
                fruit.body.velocity.y = 100 + Math.random() * 100;
            },
            callbackScope: this,
            loop: true
        });

        // listeners
        this.button_message.on('pointerdown', () => {
            const settings = this.sys.settings.data.settings; 
            this.sound.play('CorrectSound');

            // Stop all scenes
            for (const scene of this.scene.manager.getScenes(false)) {
                if (scene.scene.key === 'RememberEnd') {
                    continue; 
                }
                scene.scene.stop();
            }
            this.scene.start('RememberInit', { setting: settings }, { game: this.game });
        }); 

        this.button_message.on('pointerover', () => {
            this.button_message.setColor('#e15554');
            this.sound.play('HoverSound');
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
        for (let i = 0; i < this.frutas_lluviosas.getChildren().length; i++) {
            var fruit = this.frutas_lluviosas.getChildren()[i];
            if (fruit.y > 600) {
                fruit.destroy(true);
            }
        }

        if (this.flag) {
            this.statsShow(this, true); 
            this.flag = false; 
        }
    }

    // Custom Functions 
    aparecer (obj, scene) {
        this.tweens.add({
            targets: obj, 
            alpha: 1, 
            duration: 1500, 
            ease: 'Power2',
            onComplete: function () {
                scene.flag = true; 
            }
        }); 
    }

    statsShow(scene, value) {
        scene.main_message.setVisible(value);
        scene.second_message.setVisible(value);
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