// custom classes imported
// import Frutita from './Frutita.js' 
// import SteroidFruit from './SteroidFruit';
import SteroidObject from './Steroid_Object';


// object_options
import object_list from './object_list'

// assets imports 

let ruta_base = '../assets'

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
        this.type_order = config.type_order; 
        this.color_wished = config.color_wished; 
        
        this.objects = object_list;

        // this.preload();
        this.crear_matriz();
    }

    preload() {
        // imagenes a cargar
        // busca cada categoria: Fruta, Comida, Casa...
        for (let categoria in this.objects) {
            // busca cada subcategoria para cargar su correspondiente imagen
            // console.log(`Elementos en la categoría ${categoria}:`)
            for (let subcategoria in this.objects[categoria]) {
                // console.log(`- ${subcategoria}:`);
                this.scene.load.image(this.objects[categoria][subcategoria]["key"], ruta_base + this.objects[categoria][subcategoria]["key"] + ".png")
                // console.log(this.objects[categoria][subcategoria]["key"], ruta_base + this.objects[categoria][subcategoria]["key"] + ".png")
            }
        }
    }

    gen_fruits(type, color, object_list, numberDistinct, numberObjects) {
      // Ciclo para buscar categoria 
      let finalMatrix = []; 

      for (let categoria in object_list) {
        if (type == categoria) {
          if (color == undefined) {
            // se obtiene el subdiccionario a trabajar
            let obj_subdict = Object.values(object_list[categoria]).slice(0, numberDistinct); 
            
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
        }
      }
    }
    

    crear_matriz() {
        let matrizOrden = this.gen_fruits(this.type_order, this.color_wished, this.objects, this.numberDistinct, this.numberObjects);
        // console.log(matrizOrden)
        let spriteGroup = this.scene.add.group();

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
                objtSprt.setScale(0.2); 
                spriteGroup.add(objtSprt); 
              }
            }
        }
      
        console.log('Los objetos ya estan a disposicion')
    }
}