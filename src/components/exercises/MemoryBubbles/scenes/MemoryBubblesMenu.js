// Phaser 
import Phaser from 'phaser'; 

// Styles
import 'components/exercises/general_assets/styles.css'

// Custom Classes imported 
import SteroidObject from 'components/Factory/SteroidObject';
import FullScreenBttn from 'components/Factory/FullScreenBttn';

export default class MemoryBubblesMenu extends Phaser.Scene {
    constructor () {
        super({ key: 'MemoryBubblesMenu', backgroundColor: '#3f1651'});
        this.worldSizeWidth = 800;  
        this.worldSizeHeigth = 600;

    }

    preload () {}

    create () {
        this.game = this.sys.game
        // Background 
        this.bg = this.add.tileSprite(400, 300, 800, 600, 'SeaImg').setDepth(-2).setScrollFactor(0);

        // Panel 
        this.title_panel = this.add.graphics(); 
        this.title_panel.fillStyle(0xffffff, 0.9);
        this.title_panel.lineStyle(10, 0x000000)
        this.title_panel.strokeCircle(400, 260, 250);
        this.title_panel.fillCircle(400, 260, 250);
        this.title = this.add.text(238, 150, 'BURBUJAS\n     DE     \n MEMORIA', {fontFamily: 'TROUBLE', fill: '#000000'}).setFontSize(110); 
        
        this.algae_der = new SteroidObject({scene: this, posx: -10, posy: 350, key: 'AlgaeRedImg'}).dance_function(-5, 5000); 
        this.algae_izq = new SteroidObject({scene: this, posx: 810, posy: 350, key: 'AlgaeGreenImg'}).dance_function(5, 5000);

        // Algae Base
        var change = -1 
        for (let i = 0; i < 20; i++) {
            new SteroidObject({ scene: this, posx: i*50, posy: 580, key: 'AlgaeImg'}).setScale(0.2).dance_function(change*15, 2000); 
            change = change*-1
        }

        // Start_Panel 
        this.start_panel = this.add.graphics(); 
        this.start_panel.fillStyle(0x000000, 1);
        this.start_panel.fillRect(335, 480, 140, 70);

        this.start_button = this.add.text(350, 495, 'Iniciar', { fontFamily: 'TROUBLE', fill: '#3bb173'}).setFontSize(50)
        this.start_button.setInteractive({ useHandCursor: true });


        // Fullscreen button 
        new FullScreenBttn(this, 770, 30, 'FullscreenImg')

        // Event: 
        // Bubble Party!
        this.bubble_group = this.physics.add.group();

        this.timer = this.time.addEvent({
            delay: 500, 
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
        for (let i = 0; i < this.bubble_group.getChildren().length; i++) {
            if (this.bubble_group.getChildren()[i].y < -50) {
                this.bubble_group.getChildren()[i].destroy(true)
            }
        }
    }
}