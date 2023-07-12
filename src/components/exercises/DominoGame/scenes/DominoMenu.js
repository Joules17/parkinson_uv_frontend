// phaser library
import Phaser from 'phaser';
import '../styles.css'

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// assets imports
import bg_image from 'components/exercises/DominoGame/assets/images/bg_image.png'
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
        this.load.spritesheet('bg_image', bg_image, { frameWidth: 800, frameHeight: 600});
        this.load.image('curtain', curtain);
        this.load.image('up_curtain', up_curtain);
        this.load.image('fullscreenImg', fullscreen);

        // audio
        this.load.audio('hover', hover);
        this.load.audio('correct', correct);
    }

    create () {
    // bg
    this.anims.create({
        key: 'bd_anim',
        frames: this.anims.generateFrameNumbers('bg_image', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    });
    const sprite = this.add.sprite(400, 300, 'bg_image');
    sprite.play('bd_anim');


    // flag variables
    this.flag = false;

    // texts
    this.title = this.add.text(190, 230, 'LETRAS VS NUMEROS', {
        fontFamily: 'Atarian',
        fill: '#000000',
    }).setFontSize(60);
    // --------------------------------------------------------------
    // buttons
    this.start_button = this.add.text(200, 400, 'INICIAR', {
        fontFamily: 'Atarian',
        fill: '#eb3724',
    }).setFontSize(50);

    this.tuto_button = this.add.text(450, 400, 'TUTORIAL', {
        fontFamily: 'Atarian',
        fill: '#eb3724'
    }).setFontSize(50);

    this.start_button.setInteractive();
    this.tuto_button.setInteractive();

    // curtains 
    // red curtains
    this.curtain_right = this.add.image(900, 320, 'curtain').setScale(1.7)
    this.curtain_left = this.add.image(-100, 320, 'curtain').setScale(1.7)
    this.curtain_right.flipX = true;
    // --------------------------------------------------------------
    // fullScreenButton
    new FullScreenBttn(this, 770, 30, 'fullscreenImg');

    // entered buttons
    // start_button
    this.start_button.on('pointerdown', () => {
        this.sound.play('correct')
        this.move(this.curtain_right, 300, 2000, -1, this, 'game')
        this.move(this.curtain_left, 300, 2000, 1, this, 'game')
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
        this.move(this.curtain_right, 300, 2000, -1, this, 'tuto')
        this.move(this.curtain_left, 300, 2000, 1, this, 'tuto')
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