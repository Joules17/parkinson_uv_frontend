// phaser library
import Phaser from 'phaser';
import '../styles.css'

// custom classes imported: 
import TableroRenewed from '../sprites/base/TableroRenewed';


// import sounds 
import good from '../assets/music/correct.wav'
import bad from '../assets/music/bad.wav'
import hover from '../assets/music/hover.mp3'

export default class rondas extends Phaser.Scene {
  constructor() {
    super({ key: 'rondas', backgroundColor: 0xffffff });
    this.blockup, this.blockdown = undefined;

    // config rondas 
    this.numberFases = 30;
    this.tableroActual = undefined;

    // texto 
    this.text_numberrondas, this.texto_tiempototal = undefined;
    this.current_number = 1;

    // errores
    this.numberErrors = 0;

    // aciertos 
    this.numberVictory = 0;

    // timers
    this.gameTimeSec = 0;
    this.gameTimeMin = 0;
    this.tiempo_rondas = [];
    this.tiempo_por_ronda = 0; // en segundos 

    // banderas
    // variable que indica cuando se puede tirar una ronda, su creacion
    // cuando esta falsa es que no se puede tirar ya que estamos en una
    this.flag = false;
    this.fin = false;
    this.fin_del_juego = false;
    this.lista_tablero = [];

    // config imported by apiRest
    this.tablero_config = {
      scene: this,
      pos_initx: 100,
      pos_inity: 260,
      scene_width: 800,
      scene_heigth: 600,
      number_range: [1, 9],
      actual: false,
      flag: this.flag, // propiedad visible del tablero 
    }

    this.limite = 20;

  }

  preload() {
    // audio 
    this.load.audio('bad', bad)
    this.load.audio('good', good)
    this.load.audio('hover', hover)

  }

  create() {

    this.cameras.main.setBackgroundColor(0xffffff);
    this.blockup = this.add.rectangle(0, 0, 1800, 100, 0x0024ad, 1);

    // text 
    this.text_numberrondas = this.add.text(10, 10, "Rondas: " + this.current_number + "/" + this.numberFases, { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(40)
    this.texto_tiempototal = this.add.text(710, 10, this.gameTimeMin + ' : ' + this.gameTimeSec, { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(40)
    this.text_numberrondas.setVisible(false);
    this.texto_tiempototal.setVisible(false);
    this.tablero = new TableroRenewed(this.tablero_config);
    this.move_y(this.blockup, -50, 1000, this);

    this.create_ronda(this.numberFases);
  }

  update() {
    console.log(this.flag)
    if (this.flag) {
      this.tiempo_rondas.push(this.tiempo_por_ronda)
      this.tiempo_por_ronda = 0;
      this.text_numberrondas.setText("Rondas: " + this.current_number + "/" + this.numberFases)
      this.create_ronda()
      this.flag = false
    }
    if (this.fin_del_juego) {
      console.log('El juego termino correctamente')
      console.log('Tiempos de reaccion', this.tiempo_rondas)
      console.log('Tiempo general', this.texto_tiempototal.text)
      this.fin_del_juego = false;
    }
  }

  // Customs functions
  create_ronda() {
    if (this.tableroActual && this.tableroActual.sprite_group) {
      this.tableroActual.sprite_group.setVisible(true);
      this.tableroActual.sprite_group.setActive(true);
      this.tableroActual.sprite_group.destroy(true);
    }
  
    // creacion de tableros / rondas
    // if (this.current_number < this.numberFases) {
      this.flag = true;
      this.tableroActual = new TableroRenewed(this.tablero_config)
    // } else {
    //   this.fin_del_juego = true;
    //   this.flag = false;
    // }
  }


  // pon_tablero() {
  //   if (this.lista_tablero.length != 0) {
  //     // this.tableroActual = this.lista_tablero.shift(); 
  //     // this.tableroActual.sprite_group.setVisible(true);  // se habilita tablero
  //     // this.tableroActual.sprite_group.setActive(true)
  //     this.flag = false
  //   } else {
  //     this.fin_del_juego = true; 
  //     this.flag = false;
  //   }
  // }

  // pon_tablero() {
  //   if (this.tableroActual) {
  //     this.tableroActual.sprite_group.destroy(true);
  //     this.tableroActual = undefined;
  //   }

  //   if (this.lista_tablero.length !== 0) {
  //     this.tableroActual = this.lista_tablero.shift();
  //     this.tableroActual.sprite_group.visible = true;
  //     this.tableroActual.sprite_group.active = true;
  //     this.flag = false;
  //   } else {
  //     this.fin_del_juego = true;
  //     this.flag = false;
  //   }
  // }

  move_y(spt, position, duration, scene) {
    spt.originalY = spt.originalY - position
    this.tweens.add({
      targets: spt,
      y: spt.y - position,
      duration: duration,
      ease: 'Power2',
      yoyo: false,
      repeat: 0,
      onComplete: function () {
        scene.text_numberrondas.setVisible(true)
        scene.texto_tiempototal.setVisible(true)
        scene.time.addEvent({ delay: 1000, callback: scene.addTime, callbackScope: scene, loop: true });
      }
    });
  }

  addTime() {
    this.gameTimeSec += 1;
    this.tiempo_por_ronda += 1;
    if (this.gameTimeSec > 59) {
      this.gameTimeSec = 0
      this.gameTimeMin += 1
    }

    this.texto_tiempototal.setText(this.gameTimeMin + ' : ' + this.gameTimeSec)
  }

  // setters
  setStatus(val) {
    this.flag = val;
  }
}
