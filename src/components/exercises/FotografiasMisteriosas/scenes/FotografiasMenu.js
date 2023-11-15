// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css';

// ---------------------------- CUSTOMS IMPORTS ----------------------------
// custom classes imported:
import SteroidObject from 'components/Factory/SteroidObject.js';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// -----------------------------------------------------------------
export default class FotografiasMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'FotografiasMenu', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeight = 600;
    }

    preload() {
        // vars
        this.waveOffset = 0;
    }

    create() {
        this.game = this.sys.game;

        // bg_image
        this.bg = this.add.sprite(400, 300, 'BgRed');

        // vars
        this.flag = false;

        // panels ---------------------------------------------------------
        // title_panel
        this.title_panel = this.add.graphics();
        this.title_panel.fillStyle(0xffffff, 1);
        this.title_panel.fillRect(150, 140, 500, 230);

        this.title = this.add.text(170, 170, 'FOTOGRAFIAS', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(120);
        this.second_title = this.add.text(170, 270, 'MISTERIOSAS', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(120);

        // Rollo Img 
        this.rollo_down = this.add.tileSprite(400, 560, 3000, 269, 'RolloImg').setScale(0.3).setScrollFactor(0);
        this.rollo_up = this.add.tileSprite(400, 40, 3000, 269, 'RolloImg').setScale(0.3).setScrollFactor(0);
        
        // Figures
        this.camera_sprite = new SteroidObject({ scene: this, posx: 410, posy: 100, key: 'CameraImg' });
        this.camera_sprite.setScale(0.3);
        this.camera_sprite.dance_function(5, 1000);
    
        this.panel_button = this.add.graphics();
        this.panel_button.fillStyle(0x000000, 1);
        this.panel_button.fillRect(335, 400, 140, 70);

        this.start_button = this.add
            .text(350, 415, 'Iniciar', {
                fontFamily: 'TROUBLE',
                fill: '#3bb173'
            })
            .setFontSize(50);

        this.start_button.setInteractive({ useHandCursor: true });

        // listeners 
        this.start_button.on('pointerdown', () => {
            this.sound.play('CameraSound'); 
            const settings = this.sys.settings.data.settings; 
            this.scene.start('FotografiasLobby', {settings}, {game: this.game});
        });

        this.start_button.on('pointerover', () => {
            this.start_button.setColor('#ffffff');
            this.sound.play('HoverSound')
            this.tweens.add({
                targets: this.start_button,
                scaleX: 1.01,
                scaleY: 1.01,
                duration: 100,
                ease: 'Power2'
            });
        }); 

        this.start_button.on('pointerout', () => {
            this.start_button.setColor('#3bb173');
            this.tweens.add({
                targets: this.start_button,
                scaleX: 1,
                scaleY: 1,
                duration: 100,
                ease: 'Power2'
            });
        }); 

        // fullscreen
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    }

    update() {
        this.rollo_down.tilePositionX += 0.5;
        this.rollo_up.tilePositionX -= 0.5;
    }

    // Customs functions
}
