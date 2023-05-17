// custom classes imported
import SteroidObject from './Steroid_Object';


export default class TableroRenewed {
  // Nota: Key: Skin: Imagen a la que hace referencia la fruta
  constructor(config) {
    this.scene = config.scene;
    this.scene_width = config.scene_width
    this.scene_heigth = config.scene_heigth
    this.pos_initx = config.pos_initx;
    this.pos_inity = config.pos_inity;
    this.number_range = config.number_range;
    this.actual = config.actual;
    this.colors = []

    this.sprite_group = this.scene.add.group();
    // this.preload();
    this.create_objects();
  }

  create_elements() {
    // Definimos las propiedades de los círculos
    const circleRadius = 51;
    const circleDistance = 20;

    // Dibujamos los círculos
    const centerX = 800 / 2;
    const centerY = 600 / 2;
    const colors = ["0xff8400", "0x00d305", "0x0096ff", "0xf0008d", "0xd7cf00"];
    const numberInit = 1;
    const numberFinal = 9;

    // Creamos un objeto con valores aleatorios para top, bottom, left, right y find
    const obj = {};

    let numeros = [];
    let numerosGenerados = [];

    while (numeros.length < 5) {
      // Generar un número aleatorio entre 1 y 9
      let numero = Math.floor(Math.random() * (numberFinal - numberInit + 1)) + numberInit;

      // Comprobar si el número ya ha sido generado
      if (!numerosGenerados.includes(numero)) {
        // Añadir el número al array y al array auxiliar
        numeros.push(numero);
        numerosGenerados.push(numero);
      }
    }

    // Asignamos los números y los colores a los objetos
    obj.top = {
      number: numeros[0],
      color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
      posx: centerX,
      posy: centerY - circleRadius * 2 - circleDistance
    };
    obj.bottom = {
      number: numeros[1],
      color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
      posx: centerX,
      posy: centerY + circleRadius * 2 + circleDistance
    };
    obj.left = {
      number: numeros[2],
      color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
      posx: centerX - circleRadius * 2 - circleDistance,
      posy: centerY,
    };
    obj.right = {
      number: numeros[3],
      color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
      posx: centerX + circleRadius * 2 + circleDistance,
      posy: centerY,
    };
    obj.center = {
      number: numeros[4],
      color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
      posx: centerX,
      posy: centerY,
    };
    obj.find = {
      number: obj[["top", "bottom", "left", "right"][Math.floor(Math.random() * 4)]].number,
      color: obj[["top", "bottom", "left", "right"][Math.floor(Math.random() * 4)]].color,
      posx: 700,
      posy: 532
    };

    return obj;
  }


  create_objects() {
    let matrizConfig = this.create_elements()
    for (let key in matrizConfig) {
      if (matrizConfig) {
        const obj = matrizConfig[key];
        let objtSprt = new SteroidObject({
          scene: this.scene,
          posx: obj.posx,
          posy: obj.posy,
          color: obj.color,
          selected: obj.number,
          key: key,
          find: matrizConfig.find.number
        });
        objtSprt.setScale(0.15);
        this.sprite_group.add(objtSprt);
      }else{
        console.log("no entra")
      }


    }
    this.sprite_group.setVisible(this.actual)
    console.log('Los objetos ya estan a disposicion')
  }
}