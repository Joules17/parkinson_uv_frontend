// phaser library
import Phaser from 'phaser';

// custom classes imported
// import Frutita from './Frutita.js' 
import SteroidFruit from './SteroidFruit';

// assets imports 
/*
import coco from '../../assets/fruits/coco.png'
import mango from '../../assets/fruits/mango.png'
import banana from '../../assets/fruits/banana.png'
import apple from '../../assets/fruits/apple.png'
*/
export default class Tablero {
    // Nota: Key: Skin: Imagen a la que hace referencia la fruta 
    constructor(config) {
        this.scene = config.scene;
        this.pos_initx = config.pos_initx;
        this.pos_inity = config.pos_inity;
        this.pos_finx = config.pos_finx;
        this.pos_finy = config.pos_finy;
        this.numberFruits = config.numberFruits; 
        this.minDistance = 100;
        this.yellow_ones = ['bananaImg', 'mangoImg']
        this.circle_ones = ['cocoImg', 'appleImg']
        // ponemos todas las categorias 
        this.total_fruits = [...this.yellow_ones, ...this.circle_ones]
        this.preload()
        this.ordenar()
    }

    preload() {
      this.scene.load.image('cocoImg', coco)
      this.scene.load.image('mangoImg', mango)
      this.scene.load.image('bananaImg', banana)
      this.scene.load.image('appleImg', apple)
    }

    gen_fruits(numberFruits) {
      let options = [this.total_fruits, this.yellow_ones, this.circle_ones]
      let selection = Math.floor(Math.random() * options.length);
      // console.log(selection, options[selection], options)
      
      // se selecciona la primera fruta 
      let selection2 = Math.floor(Math.random() * options[selection].length);
      let solucionFinal = []
      for (let i = 0; i < numberFruits; i++) {
        // agrega n frutas iguales 
        solucionFinal.push([options[selection][selection2], false])
      }

      // escoge otra fruta aleatoria que no sea la misma con la que se rellenaron ahorita 
      let selection3 = selection2; 
      while (selection2 == selection3) {
        selection3 = Math.floor(Math.random() * options[selection].length);
      }
      
      let randomPlace =  Math.floor(Math.random() * solucionFinal.length);
      // se pone la fruta distinta!
      solucionFinal[randomPlace] = [options[selection][selection3], true]
      return solucionFinal
    }

    limpiar_tablero() {
        for (let i = 0; i < this.fruit_list.length; i++) {
            this.fruit_list[i].destroy()
            this.fruit_list.splice(i, 1)
        }
        this.pos_initx, this.pos_inity, this.number_cols, this.number_rows, this.AnchoTablero, this.LargoTablero  = undefined;
    }

    cambiar_tablero(pos_initx, pos_inity, fruit_list) {
        this.pos_initx = pos_initx; 
        this.pos_inity = pos_inity; 
        this.pos_finx = pos_finx; 
        this.pos_finy = pos_finy; 
        this.fruit_list = fruit_list; 
        this.ordenar(); 
    }

    ordenar() {
        let spriteGroup = this.scene.add.group(); 
        let i = 0; 
        let solucionFinal = this.gen_fruits(this.numberFruits)
        while (i < solucionFinal.length) {
          // Creamos frutas por cada una de las listas
          let fruit_obj = new SteroidFruit({scene : this.scene, 
                                       posx: Phaser.Math.Between(this.pos_initx, this.pos_finx),
                                       posy: Phaser.Math.Between(this.pos_inity, this.pos_finy),
                                       key: solucionFinal[i][0],
                                       selected: solucionFinal[i][1]
                                      }
                                      ); 
          fruit_obj.setScale(0.2)
          
          // Check de que no este tan cerca de los otros sprites 
          let cerca = spriteGroup.getChildren().some((spriteN) => {
            return Phaser.Math.Distance.Between(fruit_obj.x, fruit_obj.y, spriteN.x, spriteN.y) < this.minDistance;
          });

          // Sprite esta lejos? Se agrega el grupo si no, se destruye el objeto del sprite y se vuelve a intentar
          if (!cerca) {
            spriteGroup.add(fruit_obj);
            console.log('Hola, aqui estoy', fruit_obj.x,  fruit_obj.y)
            i++;
          } else {
            fruit_obj.destroy();
          } 
        }
        console.log('tabero actual x1, y1, x2, y2', this.pos_initx, this.pos_inity, this.pos_finx, this.pos_finy)
    }
    
     
}