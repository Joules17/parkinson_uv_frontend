// phaser library
import Phaser from 'phaser';
import '../styles.css'

// custom classes imported: 
import TableroRenewed from '../sprites/base/TableroRenewed';

// import object_list
import object_list from '../sprites/base/object_list';

export default class rondas extends Phaser.Scene {
  constructor() {
    super({key: 'rondas', backgroundColor: 0xffffff});
    this.blockup, this.blockdown = undefined; 
    this.numberFases = 10;
    // texto 
    this.text_numberrondas, this.texto_tiempototal = undefined; 
    this.current_number =  1;  

    // errores
    this.numberErrors = 0; 

    // timers
    this.gameTimeSec = 0;
    this.gameTimeMin = 0;  
    this.tiempo_rondas = []; 
    this.tiempo_por_ronda = 0; // en segundos 
    
    // banderas
    // variable que indica cuando se puede tirar una ronda, su creacion
    // cuando esta falsa es que no se puede tirar ya que estamos en una
    this.verde = false; 
    this.tablero  = undefined; 
    
    // config imported by apiRest
    this.tablero_config = {
      scene: this, 
      pos_initx: 250,
      pos_inity: 300, 
      numberObjects: 10, 
      numberDistinct: 3, 
      number_cols: 3, 
      number_rows: 4, 
      padding: 10, 
      spriteWidth: 40, 
      spriteHeight: 40, 
      type_order: "frutas", 
      color_wished: undefined
    } 

  }

  preload() {
    for (let categoria in object_list) {
      // busca cada subcategoria para cargar su correspondiente imagen
      // console.log(`Elementos en la categoría ${categoria}:`)
      for (let subcategoria in object_list[categoria]) {
          // console.log(`- ${subcategoria}:`);
          this.load.setBaseURL('../assets/');
          this.load.image(object_list[categoria][subcategoria]["key"], object_list[categoria][subcategoria]["key"] + ".png")
          console.log(object_list[categoria][subcategoria]["key"], object_list[categoria][subcategoria]["key"] + ".png")
      }
    }
  
  }

  create() {
    this.cameras.main.setBackgroundColor(0xffffff);
    this.blockdown = this.add.rectangle(0, 800, 1800, 200, 0xfff89f5b, 0);
    this.blockup = this.add.rectangle(0, 0, 1800, 100, 0xfff89f5b, 0); 

    // text 
    this.text_numberrondas = this.add.text(10,560, "Rondas: " + this.current_number + "/" + this.numberFases, { fontFamily : 'ARCO', fill: '#ffffff'}).setFontSize(25)
    this.texto_tiempototal = this.add.text(710,560, this.gameTimeMin +' : '+ this.gameTimeSec, { fontFamily : 'ARCO', fill: '#ffffff'}).setFontSize(25)
    this.text_numberrondas.setVisible(false); 
    this.texto_tiempototal.setVisible(false); 
    
    this.move_y(this.blockdown, 150, 2000, this); 
    this.wawa = new TableroRenewed(this.tablero_config)
    this.pruebas = this.add.sprite(250, 250, 'bananaIMG')
    


  }

   
  update () {
    if (this.verde) {
    

    } else {
      

    }
  }

  // Customs functions
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
      }
    });
  }

  addTime(){
    this.gameTimeSec += 1;
    //console.log(this.gameTimeSec)
    //console.log(this.gameTimeMin)
    if (this.gameTimeSec > 59) {
        this.gameTimeSec = 0
        this.gameTimeMin += 1
        console.log(this.gameTimeMin)
        if (this.gameTimeMin >= 5) {
            console.log("Cambio de escena")
            this.scene.start('ganar')
        }
    }

    this.texto_tiempototal.setText(this.gameTimeMin +' : '+ this.gameTimeSec)
  }
}
