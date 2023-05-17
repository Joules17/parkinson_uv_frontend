// custom classes imported

import object_list from './object_list';
import SteroidObject from './Steroid_Object'; 

export default class Board {
    // Nota: Key: Skin: Imagen a la que hace referencia al objeto
    constructor(config) {
        this.scene = config.scene; 
        this.game_width = config.game_width; 
        this.pos_inity = config.pos_inity; 
        this.number_objects = config.number_objects;
        this.number_cols = config.number_cols; 
        this.number_rows = config.number_rows;  
        this.padding = config.padding; 
        this.spriteWidth = config.spriteWidth; 
        this.spriteHeight = config.spriteHeight;
        this.sprite_scale = config.sprite_scale;  
        this.category = config.category; 
        this.actual = config.actual; 
        this.color_wished = config.color_wished; 
        
        this.objects = object_list;

        
        // this.preload(); 
        this.matrices_generadas = this.create_board(this.category, this.color_wished, this.objects, this.number_objects);
      }

  gen_env(category, color, object_list, number_objects) {
    // Ciclo para buscar categoria 
    let mergeCategory = []; 

    // Creacion de mergeCategory el cual es un arreglo con cada objeto unico! de las categorias disponibles
    for (let i = 0; i < category.length; i++) {
      if (color == undefined) {
        // console.log(Object.values(object_list[category[i]]), 'AQUI' ,category[i])
        mergeCategory = mergeCategory.concat(Object.values(object_list[category[i]]));
      }
    }
    // console.log(typeof mergeCategory, mergeCategory)
    // revolvemos mergeCategory 
    mergeCategory.sort(() => Math.random() - 0.5)
    // aqui comienza lo chido, se comienzan a sacar listas de listas de cada ambiente
    
    if (number_objects > mergeCategory.length) {
      console.log('ERROR: No hay suficientes objetos para llenar el tablero')
      return
    } else {
      var ambiente = []; 
      for (let i = 0; i < number_objects; i++) {
        var aux  = []
        // Verificar si ambiente tiene elementos
        const last = ambiente.length > 0 ? ambiente[ambiente.length-1] : [];
        for (let j = 0; j < last.length; j++) {
          // console.log(last[j][0], 'aqui?')
          aux.push([last[j][0], false])
        }
        aux.push([mergeCategory[i], true])
        aux.sort(() => Math.random() - 0.5)
        ambiente.push(aux)
      }
      return ambiente; 
    }
  }

  // funcion que por medio del ambiente generado se encarga de disponer los tableros en pantalla 
  create_board(category, color, object_list, number_objects) {
    let generated_env = this.gen_env(category, color, object_list, number_objects); 
    
    let matrices = [];  
    var spriteGroup = undefined; 
    var matrizOrden = undefined;
    console.log(generated_env, 'gen env')
    for (let i = 0; i < generated_env.length; i++) {
      spriteGroup = undefined; 
      matrizOrden = generated_env[i]
      spriteGroup = this.scene.add.group();
      
      // calculo de pos_initx 
      const row_size =  (this.spriteWidth + this.padding) * this.number_cols[i]
      const pos_initx = (this.game_width - row_size) / 2;

      if (this.number_rows[i]*this.number_cols[i] < this.numberObjects) {
        console.log('Algunos elementos no saldran debido a sus dimensiones')
      }
  
      for (let y = 0; y < this.number_rows[i]; y++) {
          for (let x = 0; x < this.number_cols[i]; x++) {
            if (matrizOrden.length > 0 ) {
              const posx_gen = (pos_initx + (x * (this.spriteWidth + this.padding))) + (y % 2) * ((this.spriteWidth + this.padding) / 2); 
              const posy_gen = (this.pos_inity + (y * (this.spriteHeight + this.padding)) + (this.spriteHeight / 2));
              
              let objetoSacado = matrizOrden.shift(); 
              let objtSprt = new SteroidObject({
                scene: this.scene, 
                posx: posx_gen, 
                posy: posy_gen, 
                key: objetoSacado[0]["key"], 
                selected: objetoSacado[1], 
                original_scale: this.sprite_scale
              });
              spriteGroup.add(objtSprt); 
            }
          }
      }
      spriteGroup.setVisible(this.actual)
      matrices.push(spriteGroup); 
    } 
    /*  
    console.log('generated env at this point************')
    for (let u = 0; u < matrices.length; u++) { 
      for (let z = 0; z < matrices[u].getChildren().length; z++) { 
        console.log('grupo #', u, 'elemento', matrices[u].getChildren()[z])
      }
      
    }
    */
    return matrices; 
  }

  get_matrices() {
    return this.matrices_generadas; 
  }
}