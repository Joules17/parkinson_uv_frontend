// phaser library
import Phaser from 'phaser';
import '../styles.css'

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// assets imports
import bushes from '../assets/img/bushes.png'
import bushes2 from '../assets/img/bushes2.png'
import coco from '../assets/frutas/coco.png'
import mango from '../assets/frutas/mango.png'
import banana from '../assets/frutas/banana.png'
import manzana from '../assets/frutas/manzana.png'

import hover from '../assets/music/hover.mp3'
import correct from '../assets/music/correct.wav'

export default class FrutasticMenu extends Phaser.Scene {
  constructor() {
    super({key: 'FrutasticMenu', backgroundColor: '#3f1651'});
    this.worldSizeWidth = 800;
    this.worldSizeHeigth = 600;

    // figuras
    this.circle = undefined;
    this.panelTitle = undefined;
    this.bushes_sprite = undefined;
    this.bushes_sprite2 = undefined;

    // textos
    this.title = undefined;

    // button
    this.start_button = undefined;

    // grupos
    this.frutas_lluviosas = undefined;

    // skins
    this.skins = ['coco', 'mango', 'banana', 'manzana']
  }

  preload() {
    // images
    this.load.image('bushes', bushes);
    this.load.image('bushes2', bushes2);
    this.load.image('coco', coco);
    this.load.image('mango', mango);
    this.load.image('banana', banana);
    this.load.image('manzana', manzana);

    // audio
    this.load.audio('hover', hover);
    this.load.audio('correct', correct);
  }

  create() {
    this.cameras.main.setBackgroundColor('#3f1651');

    // Figuras de fondo ------------------------------------------------------------------------------------------------------------
    this.bushes_sprite = this.add.sprite(100, 500, 'bushes').setScale(0.12)
    this.bushes_sprite2 = this.add.sprite(600, 500, 'bushes2').setScale(0.12)

    // Textos ------------------------------------------------------------------------------------------------------------
    this.title = this.add.text(80,200, "FRUTAS EN FUGA", { fontFamily : 'ARCO', fill: '#ffffff'}).setFontSize(70)

    // botones
    this.start_button = this.add.text(290, 320, "Iniciar", {
      fontFamily: 'ARCO',
      fill: '#f89f5b',
    }).setFontSize(50);

    // fullScreenButton
    new FullScreenBttn(this, 770, 30, 'fullsceenImg');

    this.start_button.setInteractive();

    // Frutas lluviosas ------------------------------------------------------------------------------------------------------------
    this.frutas_lluviosas = this.physics.add.group();

    // ------------------------------------------------------------------------------------------------------------
    // Eventos
    // caida de las frutas
    this.timer = this.time.addEvent({
      delay: 200,
        callback: function() {
            var randind = Math.floor(Math.random() * this.skins.length)
            var fruit = this.add.sprite(Math.random() * 800, -50, this.skins[randind]).setScale(0.1);
            this.frutas_lluviosas.add(fruit);
            fruit.setDepth(-1)
            fruit.body.velocity.y = (100 + Math.random() * 100);
        },
        callbackScope: this,
        loop: true
    });

    // entered buttons
    this.start_button.on('pointerdown', () => {
      this.sound.play('correct')
      this.scene.start('FrutasticLoby')
    })

    this.start_button.on('pointerover', () => {
      this.start_button.setColor('#ffffff')
      this.sound.play('hover')
      this.tweens.add({
        targets: this.start_button,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 100,
        ease: 'Power2'
      });
    });

    this.start_button.on('pointerout', () => {
      this.start_button.setColor('#f89f5b')
      this.tweens.add({
        targets: this.start_button,
        scaleX: 1,
        scaleY: 1,
        duration: 100,
        ease: 'Power2'
      });
    });
  }

  update () {
    for(let i = 0; i < this.frutas_lluviosas.getChildren().length; i++) {
      if (this.frutas_lluviosas.getChildren()[i].y > 600) {
        this.frutas_lluviosas.getChildren()[i].destroy(true);
      }
    }

  }

  // Customs functions
}