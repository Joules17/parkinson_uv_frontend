// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css'

// custom classes imported: 
import TableroRenewed from '../sprites/base/TableroRenewed';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class NumbersLoby extends Phaser.Scene {
  constructor() {
    super({ key: 'NumbersLoby', backgroundColor: '#0024ad' });
  }

  preload() {}

  builder () {
    this.eventFinished = false;
    this.worldSizeWidth = 800;
    this.worldSizeHeigth = 600;
    this.button = undefined;
    this.welcome_title = undefined;

    // paneles
    this.panel = undefined;

    // texto
    this.ready_text = undefined;
    this.explanatory_text = undefined;
    this.explanatory_text2 = undefined;
    this.error_message = undefined;
    this.error_detailed = undefined;
    this.victory_message = undefined;
    this.victory_explained = undefined;

    // otros 
    this.flecha = undefined;
    this.tablero_ejemplo = undefined;
    this.score = 0; // se torna 1 cuando hizo click correctamente y -1 cuando no 
    this.counter = 0;

    this.button_continue = undefined;

    // tablero ejemplo config 
    this.tablero_config = {
      scene: this,
      pos_initx: 100,
      pos_inity: 260,
      scene_width: 800,
      scene_heigth: 600,
      number_range: [1, 9],
      actual: true, // propiedad visible del tablero 
    }
  }
  create() {
    // constructor aux 
    this.builder(); 

    // game ---
    this.cameras.main.setBackgroundColor(0x0024ad);

    // -----------------------
    this.welcome_title = this.add.text(270, 1000, "TUTORIAL", { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(100)
    this.move_upside(this.welcome_title, 970, 1000, this)

    // panel 
    this.panel = this.add.graphics();
    this.panel.fillStyle(0x0024ad, 1);
    this.panel.fillRect(0, 140, 1800, 600);
    this.panel.setAlpha(0);

    // messages
    this.error_message = this.add.text(80, 500, "ERROR", { fontFamily: 'TROUBLE', fill: "#ff0000" }).setFontSize(40)
    this.error_detailed = this.add.text(160, 500, 'selecciona el numero correcto', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(40)
    this.victory_message = this.add.text(105, 490, "EXCELENTE!", { fontFamily: 'TROUBLE', fill: "#00d305" }).setFontSize(40)
    this.victory_explained = this.add.text(260, 490, 'ahora haz click en jugar:', { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(40)
    this.error_message.setVisible(false)
    this.error_detailed.setVisible(false)
    this.victory_explained.setVisible(false)
    this.victory_message.setVisible(false)

    // fullScreenButton ---------------------------------------------------------------------------------------------------
    new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    
    // prettier button 
    this.button_continue = this.add.text(355, 545, "jugar", {
      fontFamily: 'TROUBLE',
      fill: '#00d305'
    }).setFontSize(50)

    this.button_continue.setInteractive();
    this.button_continue.setVisible(false);

    this.button_continue.on('pointerdown', () => {
      if (this.victory_message.visible && this.button_continue.visible) {
        this.sound.play('CorrectSound')
        const settings = this.sys.settings.data.settings; 
        this.scene.start('rondas', {settings})
      }
    })

    this.button_continue.on('pointerover', () => {
      this.sound.play('HoverSound')
      this.tweens.add({
        targets: this.button_continue,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 100,
        ease: 'Power2'
      });
    });

    this.button_continue.on('pointerout', () => {
      this.tweens.add({
        targets: this.button_continue,
        scaleX: 1,
        scaleY: 1,
        duration: 100,
        ease: 'Power2'
      });
    });
  }


  update() {
    // eventos 
    if (!this.score == 0) {
      if (this.score == -1 && this.counter == 0) {
        this.error_detailed.setVisible(true);
        this.error_message.setVisible(true);
        this.victory_explained.setVisible(false);
        this.victory_message.setVisible(false);
        this.button_continue.setVisible(false);
        this.counter += 1;
      } else if (this.score == 1 && this.counter == 0) {
        this.error_detailed.setVisible(false);
        this.error_message.setVisible(false);
        this.victory_explained.setVisible(true);
        this.victory_message.setVisible(true);
        this.button_continue.setVisible(true);
        this.flecha.destroy()
        this.explanatory_text.destroy()
        this.explanatory_text2.destroy()
        this.counter += 1;
      }
    }
  }

  // Customs functions

  move_upside(spt, position, duration, scene) {
    spt.originalY = spt.originalY - position
    this.tweens.add({
      targets: spt,
      y: spt.y - position,
      duration: duration,
      ease: 'Power2',
      yoyo: false,
      repeat: 0,
      onComplete: function () {
        scene.aparecer(scene.panel, scene)
        scene.aparecer(scene.ready_text, scene)
      }
    });
  }

  // get missclick and set missclick

  getScore() {
    return this.score;
  }

  setScore(val) {
    this.score = val;

  }

  //TableroRenewed

  aparecer(obj, scene) {
    this.tweens.add({
      targets: obj,
      alpha: 1,
      duration: 1000,
      ease: 'Power2',
      onComplete: function () {
        if (!scene.eventFinished) {
          scene.tablero_ejemplo = new TableroRenewed(scene.tablero_config)
          scene.eventFinished = true;
          scene.explanatory_text = scene.add.text(610, 360, "Haz click sobre el", { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(28)
          scene.explanatory_text2 = scene.add.text(610, 390, "numero igual a este:", { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(26)
          scene.flecha = scene.add.image(700, 450, "ArrowImg")
          scene.flecha.setScale(0.1)
        }
      }
    });
  }

  escribir(textGlobal, text, vel) {
    this.tweens.add({
      targets: { index: 0 },
      index: text.length,
      ease: 'Linear',
      duration: text.length * vel,
      onUpdate: function (target) {
        textGlobal.setText(text.substr(0, target.index));
      }
    });
  }

}