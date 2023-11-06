// Phaser
import Phaser from 'phaser';

// css
import 'components/exercises/general_assets/styles.css';

// project import
import FullScreenBttn from 'components/Factory/FullScreenBttn';
import SteroidObject from 'components/Factory/SteroidObject';

export default class ObjectFailed extends Phaser.Scene {
    constructor() {
        super({ key: 'ObjectFailed', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // paneles
        this.panelStats = undefined;

        // figuras
        this.waveOffset = undefined;
        this.olas = undefined;
    }

    preload() {
        // vars
        this.waveOffset = 0;
    }

    create() {
        this.game = this.sys.game;
        // background color
        this.cameras.main.setBackgroundColor('#e0bc28');

        // bg_image
        this.bg = this.add.sprite(400, 300, 'BgImg');

        // vars
        this.flag = false;

        // figuras
        this.palmera_der = new SteroidObject({ scene: this, posx: 795, posy: 150, key: 'PalmeraImg' });
        this.palmera_izq = new SteroidObject({ scene: this, posx: 5, posy: 150, key: 'PalmeraImg' }).setFlipX(true);

        this.palmera_der.setScale(1.4);
        this.palmera_izq.setScale(1.4);

        this.palmera_der.dance_function(3, 2000);
        this.palmera_izq.dance_function(-3, 2000);

        // messages
        this.panelStats = this.add.graphics();
        this.panelStats.fillStyle(0xffffff, 1);
        this.panelStats.fillRoundedRect(100, 200, 600, 200, 20); // x, y, ancho, alto, radio de curvatura
        this.panelStats.setAlpha(0);

        this.title = this.add.text(200, 100, '¡Perdiste!', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(100);

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

        this.statsShow(this, false); 

        // fullscreen bttn
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        // show
        this.aparecer(this.panelStats, this);

        // wave interaction
        this.olas = this.physics.add.group();

        for (let i = 0; i < 10; i++) {
            this.olas.add(this.add.circle(50 + i * 90, 600, 70, 0xfff4e9de0, 0));
        }

        this.olas.children.iterate((ball) => {
            ball.originalY = ball.y;
            // console.log('aqui estoy', ball.x, ball.y)
            // ball.setScale(0.1);
        });

        // listeners 
        this.button_message.on('pointerdown', () => {
            const settings = this.sys.settings.data.settings; 
            this.sound.play('CorrectSound');

            // Stop all scenes
            for (const scene of this.scene.manager.getScenes(false)) {
                scene.scene.stop();
            }
            this.scene.start('ObjectInit', { setting: settings }, { game: this.game });
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

    update() {
        this.waveOffset += 0.01;
        if (!this.pressed) {
            this.olas.children.each((child) => {
                child.y = child.originalY + Math.sin(child.x / 40 + this.waveOffset) * 20;
            });
        }
        if (this.flag) {
            this.statsShow(this, true);
            this.flag = false;
        }
    }

    // custom functions
    aparecer(obj, scene) {
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
        scene.panel_button.setVisible(value);
        scene.button_message.setVisible(value);
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
