// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css'

// ---------------------------- CUSTOMS IMPORTS ----------------------------
// custom classes imported:
import SteroidObject from 'components/Factory/SteroidObject.js';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// -----------------------------------------------------------------
export default class ObjectMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'ObjectMenu', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeight = 600;

        // botones
        this.start_button, (this.fullscreen_button = undefined);

        // titulo
        this.title = undefined;

        // sprites
        this.palmeraDer, (this.palmeraIzq = undefined);
        this.frutas_menu = undefined;

        // figuras
        this.waveOffset = undefined;
        this.olas = undefined;
        this.juice_rectangle = undefined;
        this.patron = undefined;

        // variables
        this.pressed = false;
    }

    preload() {
        // vars
        this.waveOffset = 0;
    }

    create() {
        this.game = this.sys.game
        // background color
        this.cameras.main.setBackgroundColor('#e0bc28');

        // bg_image
        this.bg = this.add.sprite(400, 300, 'BgImg')
        
        // vars
        this.flag = false;

        // -------------------------------- BUTTONS --------------------------------  
        // start_button 
        this.start_panel = this.add.graphics();
        this.start_panel.fillStyle(0x000000, 1);
        this.start_panel.fillRect(335, 365, 140, 70);

        this.start_button = this.add
            .text(350, 380, 'Iniciar', {
                fontFamily: 'TROUBLE',
                fill: '#3bb173'
            })
            .setFontSize(50);

        this.start_button.setInteractive();

        // -------------------------------------------------------------------------
        // ---------------------------- PANELS ------------------------------------
        // title_panel
        this.title_panel = this.add.graphics();
        this.title_panel.lineStyle(5, 0x000000); 
        this.title_panel.fillStyle(0xffffff, 1);
        this.title_panel.fillRect(100, 230, 620, 120);

        this.title = this.add.text(120, 250, 'OBJETO INTRUSO', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(120);
        // -------------------------------------------------------------------------
        // ---------------------------- SPRITES ------------------------------------
        // Palmeras
        this.palmera_der = new SteroidObject({ scene: this, posx: 795, posy: 150, key: 'PalmeraImg' });
        this.palmera_izq = new SteroidObject({ scene: this, posx: 5, posy: 150, key: 'PalmeraImg' });

        this.palmera_der.setScale(1.4);
        this.palmera_izq.setScale(1.4).setFlipX(true);

        this.palmera_der.dance_function(3, 2000);
        this.palmera_izq.dance_function(-3, 2000);

        // ---------------------------- FULLSCREEN BUTTON ---------------------------
        new FullScreenBttn(this, 770, 30, 'FullscreenImg')
        // -------------------------------------------------------------------------- 
        // Frutas 
        this.frutas_menu = this.physics.add.group();
        let coco = new SteroidObject({ scene: this, posx: 730, posy: 330, key: 'CocoImg' });
        let mango = new SteroidObject({ scene: this, posx: 80, posy: 260, key: 'MangoImg' });
        this.frutas_menu.add(coco); 
        this.frutas_menu.add(mango); 

        // dance_function applied 
        for (let i = 0; i < this.frutas_menu.getChildren().length; i++) {
            this.frutas_menu.getChildren()[i].setScale(0.2);
            this.frutas_menu.getChildren()[i].dance_function(30, 1000);
        }
        
        // -------------------------------------------------------------------------
        // ---------------------------- FIGURES - WAVES INTERACTION ------------------------------------

        this.juice_rectangle = this.add.rectangle(0, 1200, 1800, 1200, 0xfff4e9de0, 0);
        this.juice_rectangle.originalY = 1200;

        this.olas = this.physics.add.group();

        for (let i = 0; i < 10; i++) {
            this.olas.add(this.add.circle(50 + i * 90, 600, 70, 0xfff4e9de0, 0));
        }

        this.olas.children.iterate((ball) => {
            ball.originalY = ball.y;
            // console.log('aqui estoy', ball.x, ball.y)
            // ball.setScale(0.1);
        });

        // -------------------------------------------------------------------------
        // ---------------------------- EVENTOS ------------------------------------
        // start_button listeners
        this.start_button.on('pointerdown', () => {
            this.sound.play('CorrectSound');
            this.pressed = true;
            this.olas.children.iterate((ball) => {
                this.move_upside(ball, 800, 3000, this);
            });

            this.move_upside(this.juice_rectangle, 800, 3000, this);
        });

        this.start_button.on('pointerover', () => {
            this.sound.play('HoverSound');
            this.tweens.add({
                targets: this.start_button,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 100,
                ease: 'Power2'
            });
        });

        this.start_button.on('pointerout', () => {
            this.start_button.setColor('#3bb173');
            this.tweens.add({
                targets: this.start_button,
                scaleX: 1,
                scaleY: 1,
                duration: 100,
                ease: 'Power2'
            });
        });
        // -------------------------------------------------------------------------
    }

    update() {
        this.waveOffset += 0.01;
        // wave movement 
        if (!this.pressed) {
            this.olas.children.each((child) => {
                child.y = child.originalY + Math.sin(child.x / 40 + this.waveOffset) * 20;
            });
        }

        // next scene: 
        if (this.flag) {
            const settings = this.sys.settings.data.settings;
            this.flag = false;
            this.scene.start('ObjectLoby', {settings}, {game: this.game});
        }
    }

    // Customs functions

    initializer () {
      var gameContainer = document.getElementById('phaser-game-container');
      gameContainer.style.width = '800px';
      gameContainer.style.height = '600px';

      // Restablecer el tamaño y ubicación del componente del juego
      var gameComponent = this.game.canvas;
      gameComponent.style.width = '800px';
      gameComponent.style.height = '600px';

      // Restablecer el centrado del contenedor del juego
      gameContainer.style.display = 'flex';
      gameContainer.style.alignItems = 'center';
      gameContainer.style.justifyContent = 'center';
    }

    move_upside(spt, position, duration, escena) {
        spt.originalY = spt.originalY - position;
        this.tweens.add({
            targets: spt,
            y: spt.y - position,
            duration: duration,
            ease: 'Power2',
            yoyo: false,
            repeat: 0,
            onComplete: function () {
                escena.flag = true;
            }
        });
    }

    toggleFullscreen() {
        if (this.scale.isFullscreen) {
            this.scale.stopFullscreen();
        } else {
            this.scale.startFullscreen();
        }
    }
}
