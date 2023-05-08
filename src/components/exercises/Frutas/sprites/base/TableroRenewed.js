// custom classes imported
import SteroidObject from './Steroid_Object';

import object_list from './object_list';

export default class TableroRenewed {
    // Nota: Key: Skin: Imagen a la que hace referencia la fruta
    constructor(config) {
        this.scene = config.scene, 
        this.pos_initx = config.pos_initx; 
        this.pos_inity = config.pos_inity; 
        this.numberObjects = config.numberObjects;
        this.numberDistinct = config.numberDistinct; 
        this.number_cols = config.number_cols;
        this.number_rows = config.number_rows; 
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
      while (! ((1 + obj_subdict.length * 2) <= numberObjects)) {
        // console.log("procedo a quitar una fruta ")
        obj_subdict.splice(Math.floor(Math.random() * obj_subdict.length), 1);
      }

      for (let i in obj_subdict) {
          finalMatrix.push([obj_subdict[i], false])
          finalMatrix.push([obj_subdict[i], false])
      }

      while(finalMatrix.length < numberObjects) {
        finalMatrix.push([obj_subdict[Math.floor(Math.random() * obj_subdict.length)], false])
      }

      finalMatrix = finalMatrix.sort(() => Math.random() - 0.5);

      // console.log(finalMatrix)
      // console.log('Final Matrix se ha llenado y reorganizado correctamente')
      return finalMatrix
    }
    

    crear_matriz() {
        let matrizOrden = this.gen_fruits(this.category, this.color_wished, this.objects, this.numberDistinct, this.numberObjects);
        // console.log(matrizOrden)

        if (this.number_rows*this.number_cols < this.numberObjects) {
          console.log('Algunos elementos no saldran debido a sus dimensiones')
        }
        for (let y = 0; y < this.number_rows; y++) {
            for (let x = 0; x < this.number_cols; x++) {
              if (matrizOrden.length > 0 ) {
                const posx_gen = (this.pos_initx + (x * (this.spriteWidth + this.padding))) + (y % 2) * ((this.spriteWidth + this.padding) / 2); 
                const posy_gen = (this.pos_inity + (y * (this.spriteHeight + this.padding)) + (this.spriteHeight / 2));
                
                let objetoSacado = matrizOrden.shift(); 
                let objtSprt = new SteroidObject({
                  scene: this.scene, 
                  posx: posx_gen, 
                  posy: posy_gen, 
                  key: objetoSacado[0]["key"], 
                  selected: objetoSacado[1] 
                });
                objtSprt.setScale(0.15); 
                this.sprite_group.add(objtSprt); 
              }
            }
        }

        this.sprite_group.setVisible(this.actual)
        // console.log('Los objetos ya estan a disposicion')
    }
}