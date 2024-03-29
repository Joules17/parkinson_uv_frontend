// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css'

// custom classes imported:
import Frutita from '../sprites/base/Frutita.js'
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class NumbersMenu extends Phaser.Scene {
  constructor() {
    super({key: 'NumbersMenu', backgroundColor: '#0024ad'});
  }

  preload() {}

  builder () {
    this.worldSizeWidth = 800;
    this.worldSizeHeigth = 600;

    // botones
    this.start_button = undefined;
    this.fullscreen_button = undefined;

    // titulo
    this.title = undefined;
    this.title2 = undefined;

    // sprites
    this.lupa = undefined;

    // variables
    this.pressed = false;
  }
  create() {
    // constructor aux 
    this.builder();

    // game ----  
    this.cameras.main.setBackgroundColor('#0024ad');

    this.start_button = this.add.text(320, 450, "INICIAR", {
      fontFamily: 'TROUBLE',
      fill: '#ffc115',
    }).setFontSize(80);

    this.start_button.setInteractive();

    this.title = this.add.text(190,190, "ENCUENTRA", { fontFamily : 'TROUBLE', fill: '#ffffff'}).setFontSize(120)
    this.title2 = this.add.text(190,290, "EL NUMERO", { fontFamily : 'TROUBLE', fill: '#ffffff'}).setFontSize(128)

    // Graphics
    this.lupa = new Frutita({scene: this, posx: 620, posy: 160, key: 'LupaImg'})

    this.lupa.setScale(0.2)

    this.lupa.dance_function(15, 1000)

    // fullScreenButton ---------------------------------------------------------------------------------------------------
    new FullScreenBttn(this, 770, 30, 'FullscreenImg');

    // Eventos

    this.start_button.on('pointerdown', () => {
      this.sound.play('CorrectSound')
      this.pressed = true
    })

    this.start_button.on('pointerover', () => {
      this.start_button.setColor('#ffffff')
      this.sound.play('HoverSound')
      this.tweens.add({
        targets: this.start_button,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 100,
        ease: 'Power2'
      });
    });

    this.start_button.on('pointerout', () => {
      this.start_button.setColor('#ffc115')
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
    if (this.pressed) {
      const settings = this.sys.settings.data.settings; 
      this.scene.start('NumbersLoby', {settings})
    }
  }

  // Customs functions

  move_upside(spt, position, duration, escena) {
    spt.originalY = spt.originalY - position
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