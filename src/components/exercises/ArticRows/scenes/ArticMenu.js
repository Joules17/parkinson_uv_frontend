// phaser library
import Phaser from 'phaser';
import '../styles.css'

// custom classes imported: 
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// assets imports
import raindrop from 'components/exercises/ArticRows/assets/img/rain_drop.png'
import nightsky from 'components/exercises/ArticRows/assets/img/sky.jpg'
import fullscreen from '../assets/img/fullscreen.png';

import derecha from 'components/exercises/ArticRows/assets/img/arrow/good/good_right.png'

// audio 
import start_button from 'components/exercises/ArticRows/assets/music/start_button.mp3'
import cracking from 'components/exercises/ArticRows/assets/music/cracking.mp3'

export default class ArticMenu extends Phaser.Scene {
  constructor() {
    super({key: 'ArticMenu', backgroundColor: '#3f1651'});
    this.worldSizeWidth = 800;
    this.worldSizeHeigth = 600;

    // bg
    this.bg = undefined; 

    // emiters
    this.emiter = undefined; 

    // texto
    this.title = undefined; 
    
    // buttons 
    this.start_button = undefined;
    this.tuto_button = undefined;
    this.list_buttons = undefined; 
    
    // figures
    this.r_arrow = undefined; 

    // cursors: 
    this.cursors = undefined; 
    
    // options - scenes selected
    this.scene_options = ['ArticGame', 'ArticTuto']
    this.selected = 0; 
  }

  preload() {
    // images 
    this.load.image('sky', nightsky);
    this.load.image('rain', raindrop);
    this.load.image('derecha', derecha); 
    this.load.image('fullscreenImg', fullscreen);

    // audio 
    this.load.audio('start_button', start_button);
    this.load.audio('cracking', cracking);

  }

  create() {
    // bg image
    this.bg = this.add.image(400, 300, 'sky'); 

    // cursor: 
    this.cursors = this.input.keyboard.createCursorKeys();
    
    // emiter 
    this.emiter = this.add.particles(0, -10, 'rain', {
      x: { min: 0, max: 800 },
      quantity: 2,
      lifespan: 2500,
      gravityY: 200,
      scale: { start: 0.005, end: 0.001 },
    });

    // arrows ----------------------------------------------------------------------------------------------------------------------
    this.r_arrow = this.add.sprite(300, 345, 'derecha');
    this.r_arrow.setScale(0.1)


    // text ------------------------------------------------------------------------------------------------------------------------
    this.title = this.add.text(180,200, "Flechas Articas", { fontFamily : 'StayPixelRegular', fill: '#ffffff'}).setFontSize(70)
    
    // fullScreenButton
    new FullScreenBttn(this, 770, 30, 'fullscreenImg');
    
    // buttons ---------------------------------------------------------------------------------------------------------------------
    this.start_button = this.add.text(340, 320, "Jugar", {
      fontFamily: 'StayPixelRegular', 
      fill: '#ffffff',
    }).setFontSize(50); 

    this.start_button.setInteractive(); 

    this.tuto_button = this.add.text(340, 380, "Tutorial", {
      fontFamily: 'StayPixelRegular', 
      fill: '#ffffff',
    }).setFontSize(50); 

    this.tuto_button.setInteractive(); 
    // arrows ----------------------------------------------------------------------------------------------------------------------
    this.animation_movement(this.r_arrow, 'izquierda')

    // arrow events ------------------------------------------------------------------------------------------------------------------------------
    this.list_buttons = [this.start_button, this.tuto_button]
    this.setSelected(0); 
    // cursor listeners: 
    this.cursors.up.on('down', () => this.setSelected(0), this);
    this.cursors.down.on('down', () => this.setSelected(1), this);
    this.input.keyboard.on('keydown-ENTER', () => this.letsPlay(), this);
    this.input.keyboard.on('keydown-SPACE', () => this.letsPlay(), this);
    // ------------------------------------------------------------------------------------------------------------------------------
    // events 
    this.start_button.on('pointerdown', () => {
      this.letsPlay()
    })

    this.start_button.on('pointerover', () => {
      this.setSelected(0)
    })

    this.start_button.on('pointerout', () => {
      this.pointer_out(this.start_button)
    })
    // tuto button 

    this.tuto_button.on('pointerdown', () => {
      this.letsPlay()
    })

    this.tuto_button.on('pointerover', () => {
      this.setSelected(1)
    })

    this.tuto_button.on('pointerout', () => {
      this.pointer_out(this.tuto_button)
    })
  }

  // Customs functions ------------------------------------------------------------------------------------------------------------------------------
  setSelected(index) {
    let oposite = (index === 0) ? 1 : 0;
    this.selected = index; 
    this.pointer_out(this.list_buttons[oposite])
    let posy = (index === 0) ? 345 : 405;
    this.r_arrow.y = posy; 
    this.pointer_over(this.list_buttons[index])
  }
  // ------------------------------------------------------------------------------------------------------------------------------
  letsPlay() { 
    this.sound.play('start_button')
    this.scene.start(this.scene_options[this.selected])
  }
  // ------------------------------------------------------------------------------------------------------------------------------
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

  pointer_out (btn) {
    this.tweens.killTweensOf(btn);
    btn.alpha = 1;
  }
  // ------------------------------------------------------------------------------------------------------------------------------
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