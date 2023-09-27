// Phaser 
import Phaser from 'phaser';

// Styles
import 'components/exercises/general_assets/styles.css'

// Custom classes Imported:
import SteroidObject from 'components/Factory/SteroidObject.js';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class LetrasMarinasMenu extends Phaser.Scene {
    constructor () {
        super({ key: 'LetrasMarinasMenu', backgroundColor: '#3f1651'});
        this.worldSizeWidth = 800;  
        this.worldSizeHeigth = 600;
    }

    preaload () {}

    create () {
        // Background
        this.bg = this.add.sprite(400, 300, 'SeaImg').setDepth(-2); 
        var change = -1 
        for (let i = 0; i < 20; i++) {
            new SteroidObject({ scene: this, posx: i*50, posy: 580, key: 'AlgaeImg'}).setScale(0.2).dance_function(change*15, 2000); 
            change = change*-1
        }

        this.coral_der = this.add.sprite(800, 400, 'CoralImg')
        this.coral_izq = this.add.sprite(50, 500, 'CoralOrange')
        
        // Panel 
        this.title_panel = this.add.graphics();
        this.title_panel.fillStyle(0xffffff
            , 1);
        this.title_panel.fillRect(100, 230, 620, 120);

        this.title = this.add.text(120, 250, 'Letras Marinas', { fontFamily: 'TROUBLE', fill: '#000000'}).setFontSize(110)
        
        this.start_panel = this.add.graphics(); 
        this.start_panel.fillStyle(0x000000, 1);
        this.start_panel.fillRect(335, 365, 140, 70);

        this.start_button = this.add.text(350, 380, 'Iniciar', { fontFamily: 'TROUBLE', fill: '#3bb173'}).setFontSize(50)
        this.start_button.setInteractive(); 

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
        // Listeners 
        this.start_button.on('pointerdown', () => {
            const settings = this.sys.settings.data.settings; 
            this.scene.start('LetrasMarinasGame', { settings }); 
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
        for (let i = 0; i < this.bubble_group.getChildren().length; i++) {
            if (this.bubble_group.getChildren()[i].y < -50) {
                this.bubble_group.getChildren()[i].destroy(true)
            }
        }
    }
}