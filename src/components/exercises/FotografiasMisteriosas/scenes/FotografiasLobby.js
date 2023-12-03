// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css';

// Custom Classes Imported 
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class FotografiasLobby extends Phaser.Scene {
    constructor() {
        super({ key: 'FotografiasLobby', backgroundColor: '#3f1651' });
    }

    preload() {}

    builder() {
        // vars
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;
        
    }
    create() {
        // constructor aux
        this.builder();

        // game --- 
        this.game = this.sys.game;
        this.bg = this.add.sprite(400, 300, 'BgRed');
        
        // Rollo Up 
        this.rollo_up = this.add.tileSprite(400, 40, 3000, 269, 'RolloImg').setScale(0.3).setScrollFactor(0);
        this.rollo_down = this.add.tileSprite(400, 560, 3000, 269, 'RolloImg').setScale(0.3).setScrollFactor(0);
        
        // Panel Title 
        this.panel_title = this.add.graphics();
        this.panel_title.fillStyle(0x000000, 1);
        this.panel_title.fillRect(270, 0, 280, 80);

        // Title
        this.title = this.add.text(300, 15, 'TUTORIAL', { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(80);

        // Panel Text 
        this.panel_text = this.add.graphics();
        this.panel_text.fillStyle(0xffffff, 1);
        this.panel_text.lineStyle(2, 0x000000); 
        this.panel_text.fillRect(100, 100, 600, 400);
        this.panel_text.strokeRect(100, 100, 600, 400);

        // msg 
        this.first_message = this.add.text(120, 120, '¡Bienvenido a Fotografias Misteriosas!', { fontFamily: 'TROUBLE', fill: '#3bb173', stroke: '#000000', strokeThickness: 4 }).setFontSize(40); 
        this.second_message = this.add.text(
            150,             // Posición X
            180,             // Posición Y
            'Al hacer clic en "Continuar", se mostraran tres \n\nimagenes en secuencia. ' +
            'Recuerda las imagenes y\n\nsu orden ya que tendras que organizarlas al\n\nfinal.', {
                fontFamily: 'TROUBLE',   // Fuente de texto
                fill: '#000000',         // Color del texto
                fontSize: 30             // Tamaño de fuente
            }
        );

        // Continue Button
        this.button_text = this.add.text(340, 450, 'Continuar', { fontFamily: 'TROUBLE', fill: '#e15554', stroke: '#000000', strokeThickness: 4 }).setFontSize(40); 
        this.button_text.setInteractive({ useHandCursor: true });

        // listeners 
        this.button_text.on('pointerdown', () => {
            const settings = this.sys.settings.data.settings;
            this.sound.play('CorrectSound'); 
            this.scene.start('FotografiasLobbySecond', {settings}, {game: this.game});
        });

        this.button_text.on('pointerover', () => {
            this.button_text.setColor('#ffffff');
        
        }); 

        this.button_text.on('pointerout', () => {
            this.button_text.setColor('#e15554');
        
        }); 


        // Fullscreen bttn 
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    }

    update() {
        this.rollo_up.tilePositionX -= 0.5;
        this.rollo_down.tilePositionX += 0.5;
    }
}