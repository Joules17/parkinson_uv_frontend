// phaser library
import Phaser from 'phaser';
import '../styles.css'

// custom classes imported: 
import Frutita from '../sprites/base/Frutita.js' 
import Tablero from '../sprites/base/Tablero.js'

// assets imports
import PalmeraImg from '../assets/img/palmera.png'

export default class FrutasLoby extends Phaser.Scene {
  constructor() {
    super({key: 'FrutasLoby', backgroundColor: 0xfff89f5b});
    this.eventFinished = false;
    this.worldSizeWidth = 800;
    this.worldSizeHeigth = 600;
    this.button = undefined; 
    this.welcome_title = undefined; 
    this.panel = undefined; 
    this.ready_text = undefined; 
    this.explanatory_text = undefined; 
    this.palmeraDer = undefined; 
    this.tablero_ejemplo = undefined;
    this.score = 0; // se torna 1 cuando hizo click correctamente y -1 cuando no 
    this.counter = 0; 
    this.error_message = undefined; 
    this.error_detailed = undefined; 
    this.victory_message = undefined; 
    this.victory_explained = undefined; 
    this.button_continue = undefined; 
  }

  preload() {
    this.load.image('palmeraImg', PalmeraImg)
  }

  create() {
    this.cameras.main.setBackgroundColor(0xfff89f5b);

    // -----------------------
    this.welcome_title = this.add.text(170,1000, "TUTORIAL", { fontFamily : 'ARCO', fill: '#ffffff'}).setFontSize(70)
    this.move_upside(this.welcome_title, 970, 1000, this)
    
    // panel 
    this.panel = this.add.graphics();
    this.panel.fillStyle(0xffffff, 1);
    this.panel.fillRect(0, 150, 1800, 350);
    this.panel.setAlpha(0);
    //---------

    // palmera
    this.palmeraDer = new Frutita({scene: this, posx: 795, posy: 150, key: 'palmeraImg'})
    this.palmeraDer.setScale(1.4)
    this.palmeraDer.setAlpha(0)
    this.palmeraDer.dance_function(3, 2000)
  
    this.ready_text = this.add.text(180,160, "aprendamos a Como jugar:", { fontFamily : 'ARCO', fill: '#000000'}).setFontSize(25)
    this.ready_text.setAlpha(0)

    // messages
    this.error_message = this.add.text(80, 450, "Error", { fontFamily : 'ARCO', fill: "#FF0000"}).setFontSize(20)
    this.error_detailed = this.add.text(160, 450, 'recuerda que debes seleccionar la fruta distinta',{ fontFamily : 'ARCO', fill: '#000000'}).setFontSize(20)
    this.victory_message = this.add.text(60, 450, "EXCELENTE", { fontFamily : 'ARCO', fill: "#006400"}).setFontSize(20)
    this.victory_explained =  this.add.text(190, 450, 'has entendido el ejercicio, ¡haz click en jugar!',{ fontFamily : 'ARCO', fill: '#000000'}).setFontSize(20)
    this.error_message.setVisible(false)
    this.error_detailed.setVisible(false)
    this.victory_explained.setVisible(false)
    this.victory_message.setVisible(false)
    
    // prettier button 
    this.button_continue = this.add.text(350, 530, "jugar", {
      fontFamily: 'ARCO', 
      fill: '#ffffff',
    }).setFontSize(30)

    this.button_continue.setInteractive();
    this.button_continue.setVisible(false);
    
    this.button_continue.on('pointerdown', () => {
      if (this.victory_message.visible && this.button_continue.visible) {
        this.scene.start('rondas')
      }
    })

    this.button_continue.on('pointerover', () => {
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

   
  update () {
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
        scene.aparecer(scene.palmeraDer, scene)
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

  //

  aparecer (obj, scene) {    
    this.tweens.add({
      targets: obj,
      alpha: 1, 
      duration: 1000, 
      ease: 'Power2',
      onComplete: function () {
        if (!scene.eventFinished) {
          scene.tablero_ejemplo = new Tablero({scene: scene, pos_initx: 200, pos_inity: 280, pos_finx: 600, pos_finy: 300, numberFruits: 3})
          scene.eventFinished = true;
          scene.explanatory_text = scene.add.text(80, 400, "¡Haz click en la fruta diferente a las demas!", { fontFamily : 'ARCO', fill: '#000000'}).setFontSize(25)
        } 
      }
    }); 
  }

  escribir (textGlobal, text, vel) {
    this.tweens.add({
      targets: {index: 0 },
      index: text.length, 
      ease: 'Linear',
      duration: text.length * vel,
      onUpdate: function (tween, target) {
        textGlobal.setText(text.substr(0, target.index)); 
      }
    }); 
    }
  
}