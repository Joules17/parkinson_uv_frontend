// phaser library
import Phaser from 'phaser';
import '../styles.css'

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import Frutita from '../sprites/Frutita.js';
// assets imports
import bg from 'components/exercises/DominoGame/assets/images/bg_bricks.jpg'
import curtain from 'components/exercises/DominoGame/assets/images/curtain.png'
import up_curtain from 'components/exercises/DominoGame/assets/images/up_curtain.png'
import fullscreen from '../assets/images/fullscreen.png';
import bg_image from '../assets/images/green_texture.png';  
import tree from '../assets/images/tree.png';

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
        this.load.image('bg_image', bg_image); 
        this.load.image('tree', tree); 

        // audio
        this.load.audio('hover', hover);
        this.load.audio('correct', correct);
    }

    create () {
    // bg
    this.add.sprite(400, 300, 'bg_image'); 
    
    this.pino_der = new Frutita({ scene: this, posx: 830, posy: 300, key: 'tree'}); 
    this.pino_izq = new Frutita({ scene: this, posx: -30, posy: 300, key: 'tree'}); 

    this.pino_der.setScale(0.4); 
    this.pino_izq.setScale(0.4).setFlipX(true); 

    this.pino_der.dance_function(3, 2000); 
    this.pino_izq.dance_function(-3, 2000); 

    // flag variables
    this.flag = false;

    // panel circle
    this.red_circle = this.add.graphics(); 
    this.red_circle.fillStyle(0xe15554, 1); 
    this.red_circle.fillCircle(400, 270, 260);
    this.main_circle = this.add.graphics(); 
    this.main_circle.fillStyle(0xffffff, 1);
    this.main_circle.fillCircle(400, 270, 250);
    this.main_circle.lineStyle(5, 0x000000)
    this.main_circle.strokeCircle(400, 270, 250);

    // texts
    this.title = this.add.text(200, 130, '   LETRAS\n      VS\n  NUMEROS', {
        fontFamily: 'TROUBLE',
        fill: '#000000',
    }).setFontSize(120);
    // --------------------------------------------------------------
    this.panel_start = this.add.graphics(); 
    this.panel_start.fillStyle(0x000000, 1);
    this.panel_start.fillRect(185, 465, 140, 70);

    // buttons
    this.start_button = this.add.text(200, 480, 'INICIAR', {
        fontFamily: 'TROUBLE',
        fill: '#eb3724',
    }).setFontSize(50);

    this.panel_tuto = this.add.graphics();
    this.panel_tuto.fillStyle(0x000000, 1);
    this.panel_tuto.fillRect(435, 465, 170, 70);

    this.tuto_button = this.add.text(450, 480, 'TUTORIAL', {
        fontFamily: 'TROUBLE',
        fill: '#eb3724'
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
        // this.move(this.curtain_right, 300, 2000, -1, this, 'game')
        // this.move(this.curtain_left, 300, 2000, 1, this, 'game')
    });

    this.start_button.on('pointerover', () => {
        this.sound.play('hover')
        this.tweens.add({
            targets: this.start_button,
            scale: 1.1,
            duration: 100,
            ease: 'Power2'
        });
    });

    this.start_button.on('pointerout', () => {
        this.start_button.setColor('#eb3724')
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
        this.sound.play('hover')
        this.tweens.add({
            targets: this.tuto_button,
            scale: 1.1,
            duration: 100,
            ease: 'Power2'
        });
    });

    this.tuto_button.on('pointerout', () => {
        this.tuto_button.setColor('#eb3724')
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
        // this.move(this.curtain_right, 300, 2000, -1, this, 'tuto')
        // this.move(this.curtain_left, 300, 2000, 1, this, 'tuto')
    });

    }

    update () {
        if(this.game_flag) {
            const settings = this.sys.settings.data.settings;  
            this.scene.start('DominoGame', {settings})
            this.game_flag = false; 
        }
        if (this.tuto_flag) {
            const settings = this.sys.settings.data.settings;  
            this.scene.start('DominoTutorial', {settings})
            this.tuto_flag = false; 
        }
    }

    move(spt, position, duration, dir, escena, indicator) {
        spt.originalY = spt.originalY - position;
        this.tweens.add({
            targets: spt,
            x: spt.x + dir*position,
            duration: duration,
            ease: 'Power2',
            yoyo: false,
            repeat: 0,
            onComplete: function () {
                if (indicator === 'game') {
                    escena.game_flag = true; 
                } else {
                    escena.tuto_flag = true; 
                }
            }
        });
    }
}