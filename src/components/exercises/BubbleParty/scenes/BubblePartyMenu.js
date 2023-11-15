// Phaser 
import Phaser from 'phaser'; 

// Styles
import 'components/exercises/general_assets/styles.css'

// Custom Classes imported 
import SteroidObject from 'components/Factory/SteroidObject';
import FullScreenBttn from 'components/Factory/FullScreenBttn';

export default class BubblePartyMenu extends Phaser.Scene {
    constructor () {
        super({ key: 'BubblePartyMenu', backgroundColor: '#3f1651'});
        this.worldSizeWidth = 800;  
        this.worldSizeHeigth = 600;
    }

    preload () {
        this.waveOffset = 0;    
    }

    create () {
        this.game = this.sys.game
        // Background 
        this.bg = this.add.tileSprite(400, 300, 800, 600, 'SeaImg').setDepth(-2).setScrollFactor(0);

        this.algae_der = new SteroidObject({scene: this, posx: -10, posy: 350, key: 'AlgaeRedImg'}).dance_function(-5, 5000); 
        this.algae_izq = new SteroidObject({scene: this, posx: 810, posy: 350, key: 'AlgaeGreenImg'}).dance_function(5, 5000);

        
        // Panel 
        this.title_panel = this.add.graphics(); 
        this.title_panel.fillStyle(0xffffff, 0.9);
        this.title_panel.fillRect(50, 200, 690, 100);
        this.title = this.add.text(60, 210, 'FIESTA DE BURBUJAS', {fontFamily: 'TROUBLE', fill: '#000000'}).setFontSize(110); 
        
        
        this.crab = new SteroidObject({scene: this, posx: 700, posy: 450, key: 'CrabImg'}).setScale(0.1).dance_function(3, 2000);
        

        // wave 
        this.olas = this.physics.add.group();

        for (let i = 0; i < 10; i++) {
            this.olas.add(this.add.circle(70 + i * 90, 650, 100, 0xfffe0bc28, 0));
        }

        this.olas.children.iterate((ball) => {
            ball.originalY = ball.y;
            // console.log('aqui estoy', ball.x, ball.y)
            // ball.setScale(0.1);
        });

        // Start_Panel 
        this.start_panel = this.add.graphics(); 
        this.start_panel.fillStyle(0x000000, 1);
        this.start_panel.fillRect(335, 320, 140, 70);

        this.start_button = this.add.text(350, 335, 'Iniciar', { fontFamily: 'TROUBLE', fill: '#3bb173'}).setFontSize(50)
        this.start_button.setInteractive({ useHandCursor: true });


        // Fullscreen button 
        new FullScreenBttn(this, 770, 30, 'FullscreenImg')

        // Event: 
        // Bubble Party!
        this.bubble_group = this.physics.add.group();

        this.timer = this.time.addEvent({
            delay: 200, 
            callback: function() {
                var bubble = this.add.sprite(Math.random()*800, 650, 'BubbleImg').setScale(0.1)
                this.bubble_group.add(bubble)
                bubble.setDepth(-1); 
                bubble.body.velocity.y = -100 - Math.random()*100;        
            }, 
            callbackScope: this, 
            loop: true
        }); 

        // Listener 
        this.start_button.on('pointerdown', () => {
            const settings = this.sys.settings.data.settings; 
            this.sound.play('CorrectSound'); 
            this.scene.start('MemoryBubblesGame', { settings }); 
        }); 

        this.start_button.on('pointerover', () => {
            this.sound.play('HoverSound');
            this.tweens.add({
                targets: this.start_button,
                scale: 1.06,
                duration: 100,
                ease: 'Power2'
            }); 
        }); 

        this.start_button.on('pointerout', () => {
            this.tweens.add({
                targets: this.start_button,
                scale: 1,
                duration: 100,
                ease: 'Power2'
            }); 
        }); 

    }

    update () {
        this.bg.tilePositionY += 0.1;
        this.waveOffset += 0.001;
        this.olas.children.each((child) => {
            child.y = child.originalY + Math.sin(child.x / 40 + this.waveOffset) * 20;
        });
        for (let i = 0; i < this.bubble_group.getChildren().length; i++) {
            if (this.bubble_group.getChildren()[i].y < -50) {
                this.bubble_group.getChildren()[i].destroy(true)
            }
        }
    }
}