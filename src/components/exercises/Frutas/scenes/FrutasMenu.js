// phaser library
import Phaser from 'phaser';
import '../styles.css';

// custom classes imported:
import Frutita from '../sprites/base/Frutita.js';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// assets imports
import PalmeraImg from '../assets/img/palmera.png';
import coco from '../assets/frutas/coco.png';
import mango from '../assets/frutas/mango.png';
import banana from '../assets/frutas/banana.png';
import manzana from '../assets/frutas/manzana.png';
import fullscreen from '../assets/img/fullscreen.png';

import hover from '../assets/music/hover.mp3';
import correct from '../assets/music/correct.wav';

export default class FrutasMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'FrutasMenu', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeight = 600;
        // camera config

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
        this.load.image('palmeraImg', PalmeraImg);
        this.load.image('cocoImg', coco);
        this.load.image('mangoImg', mango);
        this.load.image('bananaImg', banana);
        this.load.image('manzanaImg', manzana);
        this.load.image('fullscreenImg', fullscreen);

        // audio
        this.load.audio('hover', hover);
        this.load.audio('correct', correct);

        //
        this.waveOffset = 0;
    }

    create() {
        this.cameras.main.setBackgroundColor('#e0bc28');
        // this.initializer();

        //
        this.flag = false;
        // botones; start

        this.start_button = this.add
            .text(350, 380, 'Iniciar', {
                fontFamily: 'TROUBLE',
                fill: '#3bb173'
            })
            .setFontSize(50);

        this.start_button.setInteractive();

        // palmeras -------------

        this.palmeraDer = new Frutita({ scene: this, posx: 795, posy: 150, key: 'palmeraImg' });
        this.palmeraIzq = new Frutita({ scene: this, posx: 5, posy: 150, key: 'palmeraImg' });
        this.palmeraIzq.setFlipX(true);

        this.palmeraDer.setScale(1.4);
        this.palmeraIzq.setScale(1.4);

        this.palmeraDer.dance_function(3, 2000);
        this.palmeraIzq.dance_function(-3, 2000);
        // -----------------------

        // botones fullscreen
        new FullScreenBttn(this, 770, 30, 'fullscreenImg')
        // -------------------------

        this.title = this.add.text(120, 250, 'OBJETO INTRUSO', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(120);

        // Frutitas
        this.frutas_menu = this.physics.add.group();
        let coco = new Frutita({ scene: this, posx: 730, posy: 330, key: 'cocoImg' });
        this.frutas_menu.add(coco);
        let mango = new Frutita({ scene: this, posx: 80, posy: 260, key: 'mangoImg' });
        this.frutas_menu.add(mango);

        // baile!
        for (let i = 0; i < this.frutas_menu.getChildren().length; i++) {
            this.frutas_menu.getChildren()[i].setScale(0.2);
            this.frutas_menu.getChildren()[i].dance_function(30, 1000);
        }

        // ---------------------

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

        // Eventos

        this.start_button.on('pointerdown', () => {
            this.sound.play('correct');
            this.pressed = true;
            this.olas.children.iterate((ball) => {
                this.move_upside(ball, 800, 3000, this);
            });

            this.move_upside(this.juice_rectangle, 800, 3000, this);
        });

        this.start_button.on('pointerover', () => {
            this.start_button.setColor('#ffffff');
            this.sound.play('hover');
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

    }

    update() {
        this.waveOffset += 0.01;
        if (!this.pressed) {
            this.olas.children.each((child) => {
                child.y = child.originalY + Math.sin(child.x / 40 + this.waveOffset) * 20;
            });
        }
        if (this.flag) {
            const settings = this.sys.settings.data.settings;
            this.flag = false;
            this.scene.start('FrutasLoby', {settings});
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
