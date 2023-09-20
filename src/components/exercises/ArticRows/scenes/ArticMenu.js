// phaser library
import Phaser from 'phaser';

// Styles 
import 'components/exercises/general_assets/styles.css'

// custom classes imported: 
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class ArticMenu extends Phaser.Scene {
  constructor() {
    super({key: 'ArticMenu', backgroundColor: '#3f1651'});
    this.worldSizeWidth = 800;
    this.worldSizeHeigth = 600;

    // bg
    this.bg = undefined; 

    // emiters
    this.emiter = undefined; 

    // cursors: 
    this.cursors = undefined; 
    
    // options - scenes selected
    this.scene_options = ['ArticGame', 'ArticTuto']
    this.selected = 0; 
  }

  preload() {}

  create() {
    // Background ----------------------------------------------------------------------------------------------------------------------
    this.bg = this.add.image(400, 300, 'BgNightSky'); 

    // Cursors ----------------------------------------------------------------------------------------------------------------------
    this.cursors = this.input.keyboard.createCursorKeys();
    
    // Emitter ----------------------------------------------------------------------------------------------------------------------
    this.emiter = this.add.particles(0, -10, 'RaindropImg', {
      x: { min: 0, max: 800 },
      quantity: 2,
      lifespan: 2500,
      gravityY: 200,
      scale: { start: 0.005, end: 0.001 },
    });

    // Arrows ----------------------------------------------------------------------------------------------------------------------
    this.r_arrow = this.add.sprite(300, 345, 'RightArrowImg');
    this.r_arrow.setScale(0.1)


    // Text title ------------------------------------------------------------------------------------------------------------------------
    this.title = this.add.text(140,200, "FLECHAS ARTICAS", { fontFamily : 'TROUBLE', fill: '#ffffff'}).setFontSize(100)
    
    // Fullscreen bttns ------------------------------------------------------------------------------------------------------------------------
    new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    
    // buttons ---------------------------------------------------------------------------------------------------------------------
    this.start_button = this.add.text(340, 320, "Jugar", {
      fontFamily: 'TROUBLE', 
      fill: '#ffffff',
    }).setFontSize(50); 

    this.start_button.setInteractive(); 

    this.tuto_button = this.add.text(340, 380, "Tutorial", {
      fontFamily: 'TROUBLE', 
      fill: '#ffffff',
    }).setFontSize(50); 

    this.tuto_button.setInteractive(); 
    // Arrows ----------------------------------------------------------------------------------------------------------------------
    this.animation_movement(this.r_arrow, 'izquierda')

    // Arrow events ------------------------------------------------------------------------------------------------------------------------------
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
    let posy = (index === 0) ? 335 : 400;
    this.r_arrow.y = posy; 
    this.pointer_over(this.list_buttons[index])
  }
  // ------------------------------------------------------------------------------------------------------------------------------
  letsPlay() { 
    this.sound.play('StartButtonSound')
    const settings = this.sys.settings.data.setting;
    this.scene.start(this.scene_options[this.selected], {settings})
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