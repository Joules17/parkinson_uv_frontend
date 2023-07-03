import Phaser from 'phaser';
import '../styles.css';

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// assets
import bd_spritesheet from 'components/exercises/LetraAventura/assets/images/sprite_sheet_small.png';
import paper from 'components/exercises/LetraAventura/assets/images/paper.png';
import flip_round from 'components/exercises/LetraAventura/assets/music/flip_round.mp3'
import fullscreen from '../assets/images/fullscreen.png';
export default class LetrasMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'LetrasMenu', backgroundColor: '#3f1651' });
        // dimensions
        this.world_size_width = 800;
        this.world_size_height = 600;

        // figures
        this.title_image = undefined;
        this.tuto_image = undefined;
        // text
        this.title = undefined;
        this.tutorial = undefined;
    }

    preload() {
        this.load.spritesheet('bd_spritesheet', bd_spritesheet, { frameWidth: 800, frameHeight: 600 });
        this.load.image('paper', paper);
        this.load.image('fullscreenImg', fullscreen);
        // audio 
        this.load.audio('flip_round', flip_round); 
    }

    create() {
        const settings = this.sys.settings.data.settings;
        this.anims.create({
            key: 'bd_anim',
            frames: this.anims.generateFrameNumbers('bd_spritesheet', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        const sprite = this.add.sprite(400, 300, 'bd_spritesheet');
        sprite.play('bd_anim');

        this.title_image = this.add.image(250, 530, 'paper').setScale(0.1);
        this.title = this.add.text(200, 505, 'Jugar', { fontFamily: 'ComicSans', fontSize: 40, color: '#000000' });
        this.tuto_image = this.add.image(520, 530, 'paper').setScale(0.1);
        this.tutorial = this.add.text(450, 505, 'Tutorial', { fontFamily: 'ComicSans', fontSize: 40, color: '#000000' });

        // fullScreenButton
        new FullScreenBttn(this, 770, 30, 'fullscreenImg');
        
        // interactive
        this.title.setInteractive();
        this.tutorial.setInteractive();

        // title listeners
        this.title.on('pointerdown', () => {
            this.sound.play('flip_round')
            this.scene.start('LetrasGame', {settings});
        });
        this.title.on('pointerover', () => {
            this.title.setColor('#FF0000')
            this.agrandar(this.title); 
        });
        this.title.on('pointerout', () => {
            this.title.setColor('#000000')
            this.achicar(this.title);
        });

        // tutorial listeners
        this.tutorial.on('pointerdown', () => {
            this.sound.play('flip_round')
            this.scene.start('LetrasTutorial', {settings})
        }); 
        this.tutorial.on('pointerover', () => {
            this.tutorial.setColor('#FF0000')
            this.agrandar(this.tutorial)
        }); 
        this.tutorial.on('pointerout', () => {
            this.tutorial.setColor('#000000')
            this.achicar(this.tutorial)
        });

        this.dance_papers();
    }

    dance_papers() {
        this.tweens.add({
            targets: [this.title_image, this.tuto_image],
            y: 525,
            angle: 1,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
    }

    agrandar(obj) {
        this.tweens.add({
            targets: obj,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 100, 
            ease: 'Power2'
        });
    }

    achicar(obj) {
        this.tweens.add({
            targets: obj,
            scaleX: 1,
            scaleY: 1,
            duration: 100,
            ease: 'Power2'
        }); 
    }
}
