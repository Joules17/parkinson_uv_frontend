// custom classes imported
import object_list from 'components/exercises/general_assets/images/objects/object_list.js';
import SteroidObject from './Steroid_Object'; 

export default class Board {
    // Nota: Key: Skin: Imagen a la que hace referencia al objeto
    constructor(config) {
        this.scene = config.scene; 
        this.game_width = config.game_width; 
        this.game_height = config.game_height;
        this.pos_initx = config.pos_initx; 
        this.pos_inity = config.pos_inity; 
        this.number_objects = config.number_objects;  
        this.padding = config.padding; 
        this.sprite_width = config.spriteWidth; 
        this.sprite_height = config.spriteHeight;
        this.sprite_scale = config.sprite_scale;  
        this.category = config.category; 
        this.actual = config.actual; 
        this.color_wished = config.color_wished;
        this.maxRetryAttempts = 3; 
        
        this.objects = object_list;
        
        this.matrices_generadas = this.create_rounds(this.category, this.color_wished, this.objects, this.number_objects);
        // console.log(this.matrices_generadas)
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

  checkOverlap(spriteA, spriteB) {
    const spriteABounds = spriteA.getBounds();
    const spriteBBounds = spriteB.getBounds();

    const paddedBoundsA = new Phaser.Geom.Rectangle(spriteABounds.x - this.padding, spriteABounds.y - this.padding, spriteABounds.width + 2 * this.padding, spriteABounds.height + 2 * this.padding);
    return Phaser.Geom.Rectangle.Overlaps(paddedBoundsA, spriteBBounds);
  }

  // funcion que crea un tablero por medio del arreglo de los objetos ordenados: 
  create_board(env, index) {
    let matrizOrden = env; 
    const sprites = []; 
    let sprite_group = undefined; 
    sprite_group = this.scene.add.group(); 
    const totalSprites = env.length; 
    let retryAttempts = 0; // Contador de intentos adicionales
    for (let i = 0; i < totalSprites; i++) {
      if (matrizOrden.length > 0) {
        let validPosition = false; 
        let posx_gen, posy_gen;
        let attempts = 0;
        const maxAttempts = 100; // limit

        while(!validPosition) {
          if (attempts >= maxAttempts) {
            if (retryAttempts >= this.maxRetryAttempts) {
              console.log('estoy llegando aqui? ')
              console.log('No se pudo crear el tablero:', index);
              break;
            } else {
              // console.log('errores con la creacion de los sprites del tablero: ', index)
              // reinicio de creacion de tablero en especifico 
              sprites.forEach(sprite => sprite.destroy());
              sprite_group = undefined; 
              sprite_group = this.scene.add.group();
              sprites.length = 0; 
              attempts = 0; 
              retryAttempts++; 
              matrizOrden = env; 
              console.log('se esta haciendo', retryAttempts)
              i = -1;  
              break; 
            }
          }

          posx_gen = this.pos_initx + Math.random() * (this.game_width - this.sprite_width + this.padding); 
          posy_gen = this.pos_inity + Math.random() * (this.game_height - this.sprite_height + this.padding); 
          // overlap? 
          validPosition = true; 
          for (let j = 0; j < sprites.length; j++) {
            if (this.checkOverlap({ getBounds: () => new Phaser.Geom.Rectangle(posx_gen, posy_gen, this.sprite_width, this.sprite_height)}, sprites[j])) {
              validPosition = false; 
              break; 
            }
          }

          attempts++; 
        }

        if (validPosition) {
          let objetoSacado = matrizOrden.shift();
          let objSprt = new SteroidObject({
            scene: this.scene,
            posx: posx_gen,
            posy: posy_gen,
            key: objetoSacado[0]['key'], 
            selected: objetoSacado[1], 
            original_scale: this.sprite_scale
          });  
          
          objSprt.setDepth(5); 
          sprite_group.add(objSprt); 
          sprites.push(objSprt)
        }
      }
    }

    if (sprites.length === totalSprites) {
      console.log('El tablero:', index, 'se creo correctamente')
    } else {
      console.log('Las complicaciones creando el tablero: ', index, ' persisten')
    }

    sprite_group.setVisible(this.actual);
    return sprite_group
  }

  // create_rounds: funcion que se encarga de crear todos los tableros: 
  create_rounds(category, color, object_list, number_objects) {
    let generated_env = this.gen_env(category, color, object_list, number_objects); 
    let matrices = []; 
    for (let i = 0; i < generated_env.length; i++) {
      matrices.push(this.create_board(generated_env[i], i))
    }
    console.log('aqui estas son todas', matrices)
    return matrices;
  }

  get_matrices() {
    return this.matrices_generadas; 
  }
}