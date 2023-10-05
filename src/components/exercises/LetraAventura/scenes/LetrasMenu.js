import Phaser from 'phaser';

// styles
import 'components/exercises/general_assets/styles.css';

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import SteroidObject from 'components/Factory/SteroidObject';

export default class LetrasMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'LetrasMenu', backgroundColor: '#3f1651' });
        // dimensions
        this.world_size_width = 800;
        this.world_size_height = 600;
    }

    preload() {
        this.waveOffset = 0;
    }

    create() {
        // Initialize -----------------------------------------------------------------------------------------
        const settings = this.sys.settings.data.settings;
        
        //Background ------------------------------------------------------------------------------------------
        this.background = this.add.sprite(400, 300, 'BgMint')


        // Start_panels ---------------------------------------------------------------------------------------
        this.start_panel = this.add.graphics();
        this.start_panel.fillStyle(0xffffff, 1);
        this.start_panel.fillRect(185, 445, 150, 60); 
        this.title = this.add.text(200, 450, 'Jugar', { fontFamily: 'TROUBLE', fontSize: 60, color: '#000000' });

        // Tutorial_panels ------------------------------------------------------------------------------------
        this.tutorial_panel = this.add.graphics();
        this.tutorial_panel.fillStyle(0xffffff, 1);
        this.tutorial_panel.fillRect(435, 445, 200, 60);

        this.tutorial = this.add.text(450, 450, 'Tutorial', { fontFamily: 'TROUBLE', fontSize: 60, color: '#000000' });
        
        // Panel TitleGame -------------------------------------------------------------------------------------
        // title_panel
        this.title_panel = this.add.graphics();
        this.title_panel.fillStyle(0xffffff, 1);
        this.title_panel.fillRect(100, 230, 620, 120);

        this.lupa = new SteroidObject({scene: this, posx: 715, posy: 220, key: 'LupaImg'})
        this.lupa.setScale(0.15); 
        this.lupa.dance_function(15, 1000);

        this.detective = new SteroidObject({scene: this, posx: 80, posy: 360, key: 'DetectiveImg'})
        this.detective.setScale(0.2);
        this.detective.dance_function(-15, 1000);

        this.title_game = this.add.text(115, 250, 'PALABRAS OCULTAS', { fontFamily: 'TROUBLE', fill: '#000000'}).setFontSize(105); 
        
        // Clouds ------------------------------------------------------------------------------------------------
        this.clouds = this.physics.add.group(); 
        for (let i = 0; i < 10; i++) {
            this.clouds.add(this.add.circle(50 + i * 90, 0, 70,0xfff7768ad, 0));
        }

        this.clouds.children.iterate((ball) => {
            ball.originalY = ball.y;
        });
        // Fullscreen button ----------------------------------------------------------------------------------
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
        
        // interactive
        this.title.setInteractive();
        this.tutorial.setInteractive();

        // title listeners
        this.title.on('pointerdown', () => {
            this.sound.play('FlipSound')
            this.scene.start('LetrasGame', {settings});
        });
        this.title.on('pointerover', () => {
            this.sound.play('HoverSound')
            this.title.setColor('#FF0000')
            this.agrandar(this.title); 
        });
        this.title.on('pointerout', () => {
            this.title.setColor('#000000')
            this.achicar(this.title);
        });

        // tutorial listeners
        this.tutorial.on('pointerdown', () => {
            this.sound.play('FlipSound')
            this.scene.start('LetrasTuto', {settings})
        }); 
        this.tutorial.on('pointerover', () => {
            this.sound.play('HoverSound')
            this.tutorial.setColor('#FF0000')
            this.agrandar(this.tutorial)
        }); 
        this.tutorial.on('pointerout', () => {
            this.tutorial.setColor('#000000')
            this.achicar(this.tutorial)
        });

        // this.dance_papers();
    }

    update () {
        this.waveOffset += 0.01;
        // wave movement 
        
        this.clouds.children.each((child) => {
            child.y = child.originalY + Math.sin(child.x / 40 + this.waveOffset) * 20;
        });
        
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
