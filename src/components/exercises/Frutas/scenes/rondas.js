// phaser library
import Phaser from 'phaser';
import '../styles.css'

// custom classes imported: 
import TableroRenewed from '../sprites/base/TableroRenewed';

// import object_list
import object_list from '../sprites/base/object_list';

// import sounds 
import good from '../assets/music/correct.wav'
import bad from '../assets/music/bad.wav'
import hover from '../assets/music/hover.mp3'

export default class rondas extends Phaser.Scene {
  constructor() {
    super({key: 'rondas', backgroundColor: 0xffffff});
    this.blockup, this.blockdown = undefined;
    
    // config rondas 
    this.numberFases = 30;
    this.tableroActual = undefined; 
    
    // texto 
    this.text_numberrondas, this.texto_tiempototal = undefined; 
    this.current_number =  1;  

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
    this.lista_tablero  = [];
    
    // config imported by apiRest
    this.tablero_config = {
      scene: this, 
      pos_initx: 100,
      pos_inity: 100, 
      numberObjects: 10, 
      numberDistinct: 3, 
      number_cols: 3, 
      number_rows: 4, 
      padding: 100, 
      spriteWidth: 40, 
      spriteHeight: 10, 
      category: ["frutas"], 
      actual: false,
      color_wished: undefined
    } 

    this.limite = 20; 

  }

  preload() {
    // images
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
    this.cameras.main.setBackgroundColor(0xffffff);
    this.blockdown = this.add.rectangle(0, 800, 1800, 200,  0x3f1651, 1);
    this.blockup = this.add.rectangle(0, 0, 1800, 100,  0x3f1651, 1); 

    // text 
    this.text_numberrondas = this.add.text(10,560, "Rondas: " + this.current_number + "/" + this.numberFases, { fontFamily : 'ARCO', fill: '#ffffff'}).setFontSize(25)
    this.texto_tiempototal = this.add.text(710,560, this.gameTimeMin +' : '+ this.gameTimeSec, { fontFamily : 'ARCO', fill: '#ffffff'}).setFontSize(25)
    this.text_numberrondas.setVisible(false); 
    this.texto_tiempototal.setVisible(false); 
    
    this.move_y(this.blockdown, 150, 1000, this); 
    this.tablero = new TableroRenewed(this.tablero_config); 
    this.create_rondas(this.numberFases);   
  }

   
  update () {
    if (this.flag) {
      if (!(this.tableroActual === undefined)) {
        this.tableroActual.sprite_group.setVisible(false)
        this.tiempo_rondas.push(this.tiempo_por_ronda) 
        this.tiempo_por_ronda = 0; 
        this.text_numberrondas.setText("Rondas: " + this.current_number + "/" + this.numberFases)
      }
      this.pon_tablero()
    } 
    if (this.fin_del_juego) {
      console.log('El juego termino correctamente')
      console.log('Tiempos de reaccion', this.tiempo_rondas)
      console.log('Tiempo general', this.texto_tiempototal.text)
      this.fin_del_juego = false; 
    }
  }

  // Customs functions
  create_rondas(numFases) {
    // creacion de tableros / rondas
    for (let i = 0; i < numFases; i++) {
      this.lista_tablero.push(new TableroRenewed(this.tablero_config))
      if (this.tablero_config.numberObjects < this.limite) {
        this.tablero_config.numberObjects += 1;
        this.tablero_config.numberDistinct += 1;
        if (this.tablero_config.numberObjects > this.tablero_config.number_cols*this.tablero_config.number_rows) {
          if (this.tablero_config.number_rows < 4) {
            this.tablero_config.number_rows += 1; 
          }
          if (this.tablero_config.number_cols < 5) {
            this.tablero_config.number_cols += 1; 
          }
        } 
      }
    }
    this.flag = true; 
  }

  pon_tablero() {
    if (this.lista_tablero.length != 0) {
      this.tableroActual = this.lista_tablero.shift(); 
      this.tableroActual.sprite_group.setVisible(true);  // se habilita tablero
      this.flag = false
    } else {
      this.fin_del_juego = true; 
      this.flag = false;
    }
  }

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
        scene.time.addEvent({ delay: 1000, callback:scene.addTime, callbackScope: scene, loop: true });
      }
    });
  }

  addTime(){
    this.gameTimeSec += 1;
    this.tiempo_por_ronda += 1;
    if (this.gameTimeSec > 59) {
        this.gameTimeSec = 0
        this.gameTimeMin += 1
    }

    this.texto_tiempototal.setText(this.gameTimeMin +' : '+ this.gameTimeSec)
  }

  // setters
  setStatus(val) {
    this.flag = val; 
  }
}
