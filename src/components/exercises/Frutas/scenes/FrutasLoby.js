// phaser library
import Phaser from 'phaser';
import '../styles.css'

// custom classes imported:
import Frutita from '../sprites/base/Frutita.js'
import TableroRenewed from '../sprites/base/TableroRenewed';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// assets imports
import PalmeraImg from '../assets/img/palmera.png'
import object_list from '../sprites/base/object_list';

// import sounds
import good from '../assets/music/correct.wav'
import bad from '../assets/music/bad.wav'
import hover from '../assets/music/hover.mp3'

export default class FrutasLoby extends Phaser.Scene {
  constructor() {
    super({ key: 'FrutasLoby', backgroundColor: '#3f1651' });
    this.eventFinished = false;
    this.worldSizeWidth = 800;
    this.worldSizeHeigth = 600;
    this.button = undefined;
    this.welcome_title = undefined;

    // paneles
    this.panel = undefined;
    this.panelTitle = undefined;

    // texto
    this.ready_text = undefined;
    this.explanatory_text = undefined;
    this.error_message = undefined;
    this.error_detailed = undefined;
    this.victory_message = undefined;
    this.victory_explained = undefined;

    // otros
    this.palmeraDer = undefined;
    this.tablero_ejemplo = undefined;
    this.score = 0; // se torna 1 cuando hizo click correctamente y -1 cuando no
    this.counter = 0;

    this.button_continue = undefined;

    // tablero ejemplo config
    this.tablero_config = {
      scene: this,
      game_width: 620,
      game_height: 100,
      pos_initx: 80,
      pos_inity: 250,
      numberObjects: 6,
      numberDistinct: 3,
      padding: 10,
      spriteWidth: 40,
      spriteHeight: 20,
      category: ["frutas", "comida", "casa"],
      actual: true, // propiedad visible del tablero
      color_wished: undefined
    }
  }

  preload() {
    // images
    this.load.image('palmeraImg', PalmeraImg)
    for (let categoria in object_list) {
      // busca cada subcategoria para cargar su correspondiente imagen
      // console.log(`Elementos en la categoría ${categoria}:`)
      for (let subcategoria in object_list[categoria]) {
        this.load.image(object_list[categoria][subcategoria]["key"], object_list[categoria][subcategoria]["imagen"])
      }
    }

    // audio
    this.load.audio('bad', bad)
    this.load.audio('good', good)
    this.load.audio('hover', hover)
  }

  create() {
    this.cameras.main.setBackgroundColor(0xfff4e9de0);
    // this.initializer();
    // -----------------------
    this.welcome_title = this.add.text(50, 1000, "TUTORIAL", { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(100)
    this.move_upside(this.welcome_title, 970, 1000, this)

    // panel
    this.panel = this.add.graphics();
    this.panel.fillStyle(0xffffff, 1);
    this.panel.fillRect(0, 140, 1800, 600);
    this.panel.setAlpha(0);

    this.panelTitle = this.add.graphics();
    this.panelTitle.fillStyle(0x000000, 1);
    this.panelTitle.fillRect(-10, 125, 1800, 60);
    this.panelTitle.setAlpha(0);

    // palmera
    this.palmeraDer = new Frutita({ scene: this, posx: 795, posy: 150, key: 'palmeraImg' })
    this.palmeraDer.setScale(1.4)
    this.palmeraDer.setAlpha(0)
    this.palmeraDer.dance_function(3, 2000)

    this.ready_text = this.add.text(60, 140, "aprendamos a Como jugar:", { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(40)
    this.ready_text.setAlpha(0)

    // messages
    this.error_message = this.add.text(110, 480, "Error", { fontFamily: 'TROUBLE', fill: "#FF0000" }).setFontSize(40)
    this.error_detailed = this.add.text(200, 485, 'recuerda que debes seleccionar el objeto distinto', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(30)
    this.victory_message = this.add.text(80, 480, "EXCELENTE", { fontFamily: 'TROUBLE', fill: "#006400" }).setFontSize(40)
    this.victory_explained = this.add.text(230, 485, 'has entendido el ejercicio, ¡haz click en jugar!', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(30)
    this.error_message.setVisible(false)
    this.error_detailed.setVisible(false)
    this.victory_explained.setVisible(false)
    this.victory_message.setVisible(false)

    // botones fullscreen

    new FullScreenBttn(this, 770, 30, 'fullscreenImg')

    // prettier button
    this.button_continue = this.add.text(350, 550, "jugar", {
      fontFamily: 'TROUBLE',
      fill: '#e15554'
    }).setFontSize(60)

    this.button_continue.setInteractive();
    this.button_continue.setVisible(false);

    this.button_continue.on('pointerdown', () => {
      if (this.victory_message.visible && this.button_continue.visible) {
        const settings = this.sys.settings.data.settings;
        this.sound.play('good')
        this.scene.start('rondas', {settings})
      }
    })

    this.button_continue.on('pointerover', () => {
      this.sound.play('hover')
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
        scene.aparecer(scene.panelTitle, scene)
        scene.aparecer(scene.ready_text, scene)
        scene.aparecer(scene.palmeraDer, scene)
      }
    });
  }

  getScore() {
    return this.score;
  }

  setScore(val) {
    this.score = val;

  }

  //

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
          scene.explanatory_text = scene.add.text(90, 420, "Haz click en el objeto que no se repita", { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50)
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