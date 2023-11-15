// Phaser Library 
import Phaser from 'phaser'; 

// Styles 
import 'components/exercises/general_assets/styles.css'

// Custom Classes Imported: 
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class CatchMouseMenu extends Phaser.Scene {
    constructor () {
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
        // this.scene_options = ['FlechasGame', 'FlechasTuto']
        this.selected = 0;
    }

    preload () {}

    create () {
        this.game = this.sys.game
        // Background 
        this.bg = this.add.image(400, 300, 'bgTexture');

        // Text title
        this.title = this.add.text(80, 200, "ATRAPA EL RATON", { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(120)

        // Fullscreen bttns
        // new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        // Buttons
        this.start_panel = this.add.graphics();
        this.start_panel.fillStyle(0xffffff, 1);
        this.start_panel.fillRect(185, 445, 150, 60); 
        this.start_button = this.add.text(200, 450, 'JUGAR', { fontFamily: 'TROUBLE', fontSize: 60, color: '#000000' }).setInteractive();

        this.tutorial_panel = this.add.graphics();
        this.tutorial_panel.fillStyle(0xffffff, 1);
        this.tutorial_panel.fillRect(435, 445, 200, 60);
        this.tuto_button = this.add.text(450, 450, 'Tutorial', { fontFamily: 'TROUBLE', fontSize: 60, color: '#000000' }).setInteractive();

        // Events
        this.list_buttons = [this.start_button, this.tuto_button];
        this.setSelected(0); 

        // Cursor Listener 
        // this.cursors.up.on('down', () => this.setSelected(0), this);
        // this.cursors.down.on('down', () => this.setSelected(1), this);
        // this.input.keyboard.on('keydown-ENTER', () => this.letsPlay(), this);
        // this.input.keyboard.on('keydown-SPACE', () => this.letsPlay(), this);

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