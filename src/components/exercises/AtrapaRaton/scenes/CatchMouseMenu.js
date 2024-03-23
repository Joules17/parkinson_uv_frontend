// Phaser Library 
import Phaser from 'phaser';

// Styles 
import 'components/exercises/general_assets/styles.css'

// Custom Classes Imported: 
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import SteroidObject from 'components/Factory/SteroidObject';


export default class CatchMouseMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'CatchMouseMenu', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // Background 
        this.bg = undefined;

        // Emiters
        this.emiter = undefined;

        // Cursors
        this.cursors = undefined;

        // Options - scenes selected
        this.scene_options = ['CatchMouseGame', 'CatchMouseTuto']
        this.selected = 0;
    }

    preload() {
        this.waveOffset = 0;
    }

    create() {
        this.game = this.sys.game
        // Background 
        this.bg = this.add.image(400, 300, 'bgTexture');

        this.title_panel = this.add.graphics();
        this.title_panel.fillStyle(0xffffff, 1);
        this.title_panel.fillRect(155, 100, 500, 270);

        // Text title
        this.title = this.add.text(220, 120, "ATRAPA", { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(160)
        this.title2 = this.add.text(195, 240, "EL RATON", { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(150)
        // Fullscreen bttns
        // new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        // Clouds ------------------------------------------------------------------------------------------------
        this.clouds = this.physics.add.group();
        for (let i = 0; i < 10; i++) {
            this.clouds.add(this.add.circle(50 + i * 90, 0, 70, 0xfff4E9DE0, 0));
        }

        this.clouds.children.iterate((ball) => {
            ball.originalY = ball.y;
        });

        // Buttons
        this.start_panel = this.add.graphics();
        this.start_panel.fillStyle(0xffffff, 1);
        this.start_panel.fillRect(185, 425, 150, 60);
        this.start_button = this.add.text(200, 430, 'JUGAR', { fontFamily: 'TROUBLE', fontSize: 60, color: '#000000' }).setInteractive();

        this.tutorial_panel = this.add.graphics();
        this.tutorial_panel.fillStyle(0xffffff, 1);
        this.tutorial_panel.fillRect(435, 425, 200, 60);
        this.tuto_button = this.add.text(450, 430, 'Tutorial', { fontFamily: 'TROUBLE', fontSize: 60, color: '#000000' }).setInteractive();

        // Events
        this.list_buttons = [this.start_button, this.tuto_button];
        this.setSelected(0);

        this.mouse = new SteroidObject({scene: this, posx: 705, posy: 420, key: 'mouseImg'})
        this.mouse.setScale(0.15); 
        this.mouse.dance_function(15, 1000);

        this.trap = new SteroidObject({scene: this, posx: 100, posy: 500, key: 'trapImg'})
        this.trap.setScale(0.15); 
        this.trap.dance_function(0, 1000);

        // Cursor Listener 
        // this.cursors.up.on('down', () => this.setSelected(0), this);
        // this.cursors.down.on('down', () => this.setSelected(1), this);
        // this.input.keyboard.on('keydown-ENTER', () => this.letsPlay(), this);
        // this.input.keyboard.on('keydown-SPACE', () => this.letsPlay(), this);

        // Events 
        // Start Button

        this.start_button.on('pointerdown', () => {
            this.letsPlay();
        });

        // Tuto Button 
        this.tuto_button.on('pointerdown', () => {
            this.letsPlay();
        });

    }

    // Custom Functions
    setSelected(index) {
        // let oposite = (index === 0) ? 1 : 0; 
        // this.selected = index; 
        // this.pointer_out(this.list_buttons[oposite]);
        // this.posy = (index === 0) ? 335 : 400; 
        // this.r_arrow.y = this.posy;
        // this.pointer_over(this.list_buttons[index]);
    }

    // Lets Play () 
    letsPlay() {
        // this.sound.play('StartButtonSound'); 
        const settings = this.sys.settings.data.settings;
        this.scene.start(this.scene_options[this.selected], { settings }, { game: this.game });
    }

    // Pointer over
    pointer_over(btn) {
        this.tweens.add({
            targets: btn,
            duration: 200,
            alpha: 0.5,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
        });
    }

    // Pointer Out 
    pointer_out(btn) {
        this.tweens.killTweensOf(btn);
        btn.alpha = 1;
    }

    // Animation Movement 
    animation_movement(sprt) {
        this.tweens.add({
            targets: sprt,
            x: '-=30',
            ease: 'Power1',
            duration: 400,
            yoyo: true,
            repeat: -1
        });
    }

    update() {
        this.waveOffset += 0.01;
        // wave movement
        this.clouds.children.each((child) => {
            child.y = child.originalY + Math.sin(child.x / 40 + this.waveOffset) * 20;
        });
    }
}