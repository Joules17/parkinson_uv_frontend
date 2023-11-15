// Phaser 
import Phaser from 'phaser';

// css
import 'components/exercises/general_assets/styles.css';

// custom classes
import FullScreenBttn from 'components/Factory/FullScreenBttn';
import SteroidObject from 'components/Factory/SteroidObject';

export default class RememberFailed extends Phaser.Scene {
    constructor () {
        super ({ key: 'LettersFailed', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;
    }

    preload () {}

    create () {
        this.game = this.sys.game
        
        // Bg 
        this.bg = this.add.image(400, 300, 'BgForest');

        // Panels / Figuras 
        this.pino_der = new SteroidObject({ scene: this, posx: 830, posy: 300, key: 'TreeImg'}); 
        this.pino_izq = new SteroidObject({ scene: this, posx: -30, posy: 300, key: 'TreeImg'}); 

        this.pino_der.setScale(0.4); 
        this.pino_izq.setScale(0.4).setFlipX(true); 

        this.pino_der.dance_function(3, 2000); 
        this.pino_izq.dance_function(-3, 2000); 

        // 
        this.panel_title = this.add.graphics(); 
        this.panel_title.fillStyle(0x000000, 1);
        this.panel_title.fillRect(150, 110, 500, 100);
        this.title = this.add.text(270, 120, 'PERDISTE', { fontFamily: 'Trouble', fontSize: 100, color: '#eb3724' });
        
        // Panel 
        this.panel_results = this.add.graphics(); 
        this.panel_results.fillStyle(0xffffff, 1);
        this.panel_results.lineStyle(5, 0x000000);
        this.panel_results.fillRect(150, 230, 500, 140);
        this.panel_results.strokeRect(150, 230, 500, 140);

        // text 
        this.main_message = this.add.text(200, 250, 'ESO FUE UN BUEN INTENTO',  { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.second_message = this.add.text(210, 310, 'NO TE RINDAS, SIGUE ASI!', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);

        // button 
        this.panel_button = this.add.graphics();
        this.panel_button.fillStyle(0x000000, 1);
        this.panel_button.fillRect(290, 420, 220, 50);

        this.button_message = this.add.text(300, 430, 'VOLVER A JUGAR', { fontFamily: 'TROUBLE', fill: '#eb3724' }).setFontSize(40);
        this.button_message.setInteractive({ useHandCursor: true });
        // fullscreen bttn 
        new FullScreenBttn(this, 770, 30, 'FullscreenImg'); 

        // listeners 
        this.button_message.on('pointerdown', () => {
            const settings = this.sys.settings.data.settings; 
            this.sound.play('CorrectSound')

            // Stop all scenes 
            for (const scene of this.game.scene.getScenes(false)) {
                scene.scene.stop()
            }
            this.scene.start('LettersInit', {setting: settings }, { game: this.game }); 
        });

        this.button_message.on('pointerover', () => {
            this.button_message.setColor('#ffffff'); 
            this.sound.play('HoverSound');
            this.tweens.add({
                targets: this.button_message,
                scale: 1.01,
                duration: 100,
                ease: 'Power2'
            });
        }); 

        this.button_message.on('pointerout', () => {
            this.button_message.setColor('#eb3724');
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