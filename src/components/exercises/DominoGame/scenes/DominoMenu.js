// phaser library 
import Phaser from 'phaser';
import '../styles.css'

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// assets imports
import bg from 'components/exercises/DominoGame/assets/images/bg_bricks.jpg'
import curtain from 'components/exercises/DominoGame/assets/images/curtain.png'
import up_curtain from 'components/exercises/DominoGame/assets/images/up_curtain.png'
import fullscreen from '../assets/images/fullscreen.png';
// audio
import hover from 'components/exercises/DominoGame/assets/music/hover.mp3'
import correct from 'components/exercises/DominoGame/assets/music/correct.wav'

export default class DominoMenu extends Phaser.Scene {
    constructor () {
        super({key: 'DominoMenu', backgroundColor: '#3f1651'});
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // panel title
        this.panel_title = undefined; 
        // buttons 
        this.start_button, this.fullscreen_button, this.tuto_button = undefined;

        // titulo 
        this.title = undefined; 

        // variables
        this.pressed = false; 

    }

    preload () {
        // images
        this.load.image('bg', bg);
        this.load.image('curtain', curtain);
        this.load.image('up_curtain', up_curtain);
        this.load.image('fullscreenImg', fullscreen);
        
        // audio 
        this.load.audio('hover', hover);
        this.load.audio('correct', correct);
    }

    create () {
    // bg
    this.bg = this.add.image(400, 300, 'bg').setScale(0.8);

    // flag variables 
    this.flag = false; 

    // --------------------------------------------------------------
    // red curtains 
    this.curtain_right = this.add.image(800, 320, 'curtain').setScale(0.7)
    this.curtain_left = this.add.image(0, 320, 'curtain').setScale(0.7)
    this.curtain_right.flipX = true;
    
    this.curtain_up = this.add.image(400, 80, 'up_curtain').setScale(1.16)
    
    // --------------------------------------------------------------
    // panel title 
    this.panel_title = this.add.graphics(); 
    this.panel_title.fillStyle(0x032670, 1);
    this.panel_title.lineStyle(2, 0xffffff); 
    this.panel_title.fillRoundedRect(100, 200, 600, 100, 5); // Crea el rectángulo con bordes curvos
    this.panel_title.strokeRoundedRect(100, 200, 600, 100, 5); // Dibuja los bordes negros      

    // texts
    this.title = this.add.text(190, 210, 'PURPLE DOMINO', {
        fontFamily: 'Atarian',
        fill: '#ffffff',
    }).setFontSize(80);
    // --------------------------------------------------------------
    // buttons 
    this.start_button = this.add.text(340, 320, 'INICIAR', {
        fontFamily: 'Atarian',
        fill: '#ffffff',
    }).setFontSize(50); 

    this.tuto_button = this.add.text(340, 380, 'TUTORIAL', {
        fontFamily: 'Atarian', 
        fill: '#ffffff'  
    }).setFontSize(50); 

    this.start_button.setInteractive(); 
    this.tuto_button.setInteractive(); 
    // --------------------------------------------------------------
    // fullScreenButton
    new FullScreenBttn(this, 770, 30, 'fullscreenImg');
    
    // entered buttons 
    // start_button 
    this.start_button.on('pointerdown', () => {
        this.sound.play('correct')
        this.scene.start('DominoGame')
    }); 

    this.start_button.on('pointerover', () => {
        this.start_button.setColor('#000000')
        this.sound.play('hover')
        this.tweens.add({
            targets: this.start_button,
            scale: 1.1,
            duration: 100,
            ease: 'Power2'
        }); 
    }); 

    this.start_button.on('pointerout', () => {
        this.start_button.setColor('#ffffff')
        this.tweens.add({
            targets: this.start_button,
            scaleX: 1,
            scaleY: 1,
            duration: 100, 
            ease: 'Power2'
          });
    }); 

    // tuto_button
    this.tuto_button.on('pointerover', () => {
        this.tuto_button.setColor('#000000')
        this.sound.play('hover')
        this.tweens.add({
            targets: this.tuto_button,
            scale: 1.1,
            duration: 100,
            ease: 'Power2'
        }); 
    });

    this.tuto_button.on('pointerout', () => {
        this.tuto_button.setColor('#ffffff')
        this.tweens.add({
            targets: this.tuto_button,
            scaleX: 1,
            scaleY: 1,
            duration: 100, 
            ease: 'Power2'
          });
    }); 
    this.tuto_button.on('pointerdown', () => {
        this.sound.play('correct')
        this.scene.start('DominoTutorial')
    }); 
    }
}