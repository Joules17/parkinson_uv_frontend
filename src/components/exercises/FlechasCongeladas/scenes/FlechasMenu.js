// Phaser Library 
import Phaser from 'phaser'; 

// Styles 
import 'components/exercises/general_assets/styles.css'

// Custom Classes Imported: 
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class FlechasMenu extends Phaser.Scene {
    constructor () {
        super({ key: 'FlechasMenu', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // Background 
        this.bg = undefined;

        // Emiters
        this.emiter = undefined;

        // Cursors
        this.cursors = undefined;

        // Options - scenes selected
        this.scene_options = ['FlechasGame', 'FlechasTuto']
        this.selected = 0;
    }

    preload () {}

    create () {
        this.game = this.sys.game
        // Background 
        this.bg = this.add.image(400, 300, 'BgNightSkySnow');

        // Cursors
        this.cursors = this.input.keyboard.createCursorKeys();

        // Emitter
        this.emiter = this.add.particles(0, -10, 'SnowImg', {
            x: { min: 0, max: 800 },
            quantity: 2,
            lifespan: 2500,
            gravityY: 200,
            scale: { start: 0.01, end: 0.001 },
        });

        // Arrows
        this.r_arrow = this.add.sprite(300, 345, 'RightArrowImg');
        this.r_arrow.setScale(0.1)

        // Text title
        this.title = this.add.text(80, 200, "FLECHAS CONGELADAS", { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(100)

        // Fullscreen bttns
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        // Buttons
        this.start_button = this.add.text(340, 320, "Jugar", {
            fontFamily: 'TROUBLE',
            fill: '#ffffff',
        }).setFontSize(50).setInteractive();

        this.tuto_button = this.add.text(340, 400, "Tutorial", {
            fontFamily: 'TROUBLE',
            fill: '#ffffff',
        }).setFontSize(50).setInteractive();

        // Arrows
        this.animation_movement(this.r_arrow, 'izquierda'); // animation movement

        // Events
        this.list_buttons = [this.start_button, this.tuto_button];
        this.setSelected(0); 

        // Cursor Listener 
        this.cursors.up.on('down', () => this.setSelected(0), this);
        this.cursors.down.on('down', () => this.setSelected(1), this);
        this.input.keyboard.on('keydown-ENTER', () => this.letsPlay(), this);
        this.input.keyboard.on('keydown-SPACE', () => this.letsPlay(), this);

        // Events 
        // Start Button
        this.start_button.on('pointerover', () => {
            this.setSelected(0); 
        });

        this.start_button.on('pointerdown', () => {
            this.letsPlay(); 
        }); 

        this.start_button.on('pointerout', () => {
            this.pointer_out(this.start_button);
        }); 

        // Tuto Button 
        this.tuto_button.on('pointerdown', () => {
            this.letsPlay(); 
        }); 

        this.tuto_button.on('pointerover', () => {
            this.setSelected(1); 
        }); 

        this.tuto_button.on('pointerout', () => {
            this.pointer_out(this.tuto_button);
        }); 
    }

    // Custom Functions
    setSelected(index) {
        let oposite = (index === 0) ? 1 : 0; 
        this.selected = index; 
        this.pointer_out(this.list_buttons[oposite]);
        this.posy = (index === 0) ? 335 : 400; 
        this.r_arrow.y = this.posy;
        this.pointer_over(this.list_buttons[index]);
    }

    // Lets Play () 
    letsPlay() {
        this.sound.play('StartButtonSound'); 
        const settings = this.sys.settings.data.settings;
        this.scene.start(this.scene_options[this.selected], {settings}, {game: this.game});
    }

    // Pointer over
    pointer_over (btn) {
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
    pointer_out (btn) {
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
}