// phaser library
import Phaser from 'phaser';

// css
import 'components/exercises/general_assets/styles.css';

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class RememberMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'RememberMenu', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // grupos
        this.frutas_lluviosas = undefined;

        // skins
        this.skins = ['coco', 'mango', 'banana', 'manzana'];
    }

    preload() {}

    create() {
        // Background ------------------------------------------------------------------------------------------------------------
        this.cameras.main.setBackgroundColor('#4e9de0');
        this.bg = this.add.sprite(400, 300, 'BgSkye').setDepth(-2); 

        // Figuras de fondo ------------------------------------------------------------------------------------------------------------
        this.bushes_sprite = this.add.sprite(100, 500, 'FirstBush').setScale(0.12);
        this.bushes_sprite2 = this.add.sprite(600, 500, 'SecondBush').setScale(0.12);

        // Textos ------------------------------------------------------------------------------------------------------------
        this.title = this.add.text(120, 200, 'RECUERDA Y ENCUENTRA', { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(80);

        // botones
        this.start_button = this.add
            .text(330, 320, 'INICIAR', {
                fontFamily: 'TROUBLE',
                fill: '#e15554'
            })
            .setFontSize(60);

        // fullScreenButton
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        this.start_button.setInteractive();

        // Frutas lluviosas ------------------------------------------------------------------------------------------------------------
        this.frutas_lluviosas = this.physics.add.group();

        // ------------------------------------------------------------------------------------------------------------
        // Eventos
        // caida de las frutas
        this.timer = this.time.addEvent({
            delay: 200,
            callback: function () {
                var randind = Math.floor(Math.random() * this.skins.length);
                var fruit = this.add.sprite(Math.random() * 800, -50, this.skins[randind]).setScale(0.1);
                this.frutas_lluviosas.add(fruit);
                fruit.setDepth(-1);
                fruit.body.velocity.y = 100 + Math.random() * 100;
            },
            callbackScope: this,
            loop: true
        });

        // entered buttons
        this.start_button.on('pointerdown', () => {
            this.sound.play('CorrectSound');
            this.scene.start('RememberLoby');
        });

        this.start_button.on('pointerover', () => {
            this.start_button.setColor('#ffffff');
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
            this.start_button.setColor('#e15554');
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
        for (let i = 0; i < this.frutas_lluviosas.getChildren().length; i++) {
            if (this.frutas_lluviosas.getChildren()[i].y > 600) {
                this.frutas_lluviosas.getChildren()[i].destroy(true);
            }
        }
    }

    // Customs functions
}
