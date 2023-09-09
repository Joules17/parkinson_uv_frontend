// custom classes imported
import SteroidObject from './Steroid_Object';
import object_list from 'components/exercises/general_assets/images/objects/object_list.js';

export default class TableroRenewed {
  // Nota: Key: Skin: Imagen a la que hace referencia la fruta
  constructor(config) {
    this.scene = config.scene;
    this.game_width = config.game_width;
    this.game_height = config.game_height;
    this.pos_initx = config.pos_initx;
    this.pos_inity = config.pos_inity;
    this.numberObjects = config.numberObjects;
    this.numberDistinct = config.numberDistinct;
    this.padding = config.padding;
    this.spriteWidth = config.spriteWidth;
    this.spriteHeight = config.spriteHeight;
    this.category = config.category;
    this.actual = config.actual;
    this.color_wished = config.color_wished;

    this.objects = object_list;

    this.sprite_group = this.scene.add.group();
    // this.preload(); 
    this.crear_matriz();
  }

  gen_fruits(category, color, object_list, numberDistinct, numberObjects) {
    // Ciclo para buscar categoria 
    let finalMatrix = [];
    let mergeCategory = [];

    for (let i = 0; i < category.length; i++) {
      if (color == undefined) {
        // console.log(Object.values(object_list[category[i]]), 'AQUI' ,category[i])
        mergeCategory = mergeCategory.concat(Object.values(object_list[category[i]]));
      }
    }
    // console.log(typeof mergeCategory, mergeCategory)
    // revolvemos mergeCategory 
    mergeCategory.sort(() => Math.random() - 0.5)

    // se obtiene el subdiccionario a trabajar
    let obj_subdict = mergeCategory.slice(0, numberDistinct);

    // se saca la fruta correcta
    let correct_fruit = obj_subdict.splice(Math.floor(Math.random() * obj_subdict.length), 1)[0];
    finalMatrix.push([correct_fruit, true])

    // rellenamos finalMatrix con las frutas restantes de obj_subdict siempre y cuando estos objetos puedan repetirse 
    // 1 + n x 2 <= numberObjects
    // funcion para quitar frutas opcionales y que concuerde que 1 + nx2 <= numberObjects 
    while (!((1 + obj_subdict.length * 2) <= numberObjects)) {
      // console.log("procedo a quitar una fruta ")
      obj_subdict.splice(Math.floor(Math.random() * obj_subdict.length), 1);
    }

    for (let i in obj_subdict) {
      finalMatrix.push([obj_subdict[i], false])
      finalMatrix.push([obj_subdict[i], false])
    }

    while (finalMatrix.length < numberObjects) {
      finalMatrix.push([obj_subdict[Math.floor(Math.random() * obj_subdict.length)], false])
    }

    finalMatrix = finalMatrix.sort(() => Math.random() - 0.5);

    // console.log(finalMatrix)
    // console.log('Final Matrix se ha llenado y reorganizado correctamente')
    return finalMatrix
  }

  checkOverlap(spriteA, spriteB) {
    const spriteABounds = spriteA.getBounds();
    const spriteBBounds = spriteB.getBounds();

    const paddedBoundsA = new Phaser.Geom.Rectangle(spriteABounds.x - this.padding, spriteABounds.y - this.padding, spriteABounds.width + 2 * this.padding, spriteABounds.height + 2 * this.padding);

    return Phaser.Geom.Rectangle.Overlaps(paddedBoundsA, spriteBBounds);
  }

  crear_matriz() {
    console.log("genera sprt");
    let matrizOrden = this.gen_fruits(this.category, this.color_wished, this.objects, this.numberDistinct, this.numberObjects);
    // console.log(matrizOrden)
  
    const sprites = [];
    const totalSprites = this.numberObjects;
  
    for (let i = 0; i < totalSprites; i++) {
      if (matrizOrden.length > 0) {
        let validPosition = false;
        let posx_gen, posy_gen;
        let attempts = 0;
        const maxAttempts = 100; // limit
  
        while (!validPosition) {
          if (attempts >= maxAttempts) {
            // Reiniciar el proceso de distribución y buscar una forma alternativa
            sprites.forEach(sprite => sprite.destroy());
            sprites.length = 0;
            matrizOrden = this.gen_fruits(this.category, this.color_wished, this.objects, this.numberDistinct, this.numberObjects);
            i = -1; // Reiniciar el índice
            break;
          }
  
          posx_gen = this.pos_initx + Math.random() * (this.game_width - this.spriteWidth + this.padding);
          posy_gen = this.pos_inity + Math.random() * (this.game_height - this.spriteHeight + this.padding);
  
          // check overlapping
          validPosition = true;
          for (let j = 0; j < sprites.length; j++) {
            if (this.checkOverlap({ getBounds: () => new Phaser.Geom.Rectangle(posx_gen, posy_gen, this.spriteWidth, this.spriteHeight) }, sprites[j])) {
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
            selected: objetoSacado[1]
          });

          objSprt.setScale(0.15);
          // console.log('objeto creado', posx_gen, posy_gen)
          objSprt.setDepth(5); 
          this.sprite_group.add(objSprt);
          
  
          sprites.push(objSprt);
        }
      }
    }
  
    if (sprites.length === totalSprites) {
      this.sprite_group.setVisible(this.actual);
      // console.log('Los objetos ya están a disposición')
    } else {
      console.log('No se pudo encontrar una distribución válida después de varios intentos.');
    }
  }
}