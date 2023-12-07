// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css';

// ---------------------------- CUSTOMS IMPORTS ----------------------------
// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// -----------------------------------------------------------------
export default class FotografiasFailed extends Phaser.Scene {
    constructor() {
        super({ key: 'FotografiasFailed', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeight = 600;
    }

    preload() {
    }

    create() {
        this.game = this.sys.game;

        // bg_image
        this.bg = this.add.sprite(400, 300, 'BgRed');

        // vars
        this.flag = false;


        // panel 
        this.panel_shade = this.add.graphics();
        this.panel_shade.fillStyle(0x000000, 1);
        this.panel_shade.fillRoundedRect(100, 155, 600, 200, 20);

        this.panel = this.add.graphics();   
        this.panel.fillStyle(0xffffff, 1);
        this.panel.fillRoundedRect(100, 150, 600, 200, 20);

        // title 
        this.title = this.add.text(200, 180, 'FIN DEL JUEGO' , { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(100);

        // msg 
        this.message = this.add.text(120, 280, 'Eso fue un buen intento, no te rindas!', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(45);
        
        // panel_button 
        this.panel_button = this.add.graphics();
        this.panel_button.fillStyle(0x000000, 1);
        this.panel_button.fillRect(300, 400, 200, 80);

        // button
        this.button = this.add.text(315, 420, 'Continuar', { fontFamily: 'TROUBLE', fill: '#3bb173' }).setFontSize(50);

        // button event
        this.button.setInteractive({ useHandCursor: true })

        this.button.on('pointerdown', () => {
            this.sound.play('CorrectSound'); 
            const settings = this.sys.settings.data.settings;
            this.scene.start('FotografiasMenu', {settings}, {game: this.game}); 
        }); 

        this.button.on('pointerover', () => {
            this.button.setColor('#ffffff');
            this.sound.play('HoverSound');
        }); 

        this.button.on('pointerout', () => {
            this.button.setColor('#3bb173');
        }); 

        // Rollo Img 
        this.rollo_down = this.add.tileSprite(400, 560, 3000, 269, 'RolloImg').setScale(0.3).setScrollFactor(0);
        this.rollo_up = this.add.tileSprite(400, 40, 3000, 269, 'RolloImg').setScale(0.3).setScrollFactor(0);
    
        // fullscreen
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    }

    update() {
        this.rollo_down.tilePositionX += 0.5;
        this.rollo_up.tilePositionX -= 0.5;
    }
}
