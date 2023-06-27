// assets importing 
import banana from '../../assets/frutas/banana.png'
import mango from '../../assets/frutas/mango.png'
import coco from '../../assets/frutas/coco.png'
import manzana from '../../assets/frutas/manzana.png'
import naranja from '../../assets/frutas/naranja.png'
import cafe from '../../assets/comida/cafe.png'
import croissant from '../../assets/comida/croissant.png'
import huevo from '../../assets/comida/huevo.png'
import plancha from '../../assets/casa/plancha.png'
import nevera from '../../assets/casa/nevera.png'
import lavadora from '../../assets/casa/lavadora.png'


let object_list = 
{
    frutas: {
        "banana" :  {
            "key" : "banana",
            "color" : "amarillo", 
            "imagen" : banana
            }, 
        "mango" :  {
            "key" : "mango",
            "color" : "amarillo", 
            "imagen" : mango
            }, 
        "naranja" : {
            "key" : "naranja", 
            "color" : "amarillo",
            "imagen" : naranja
        },
        "coco" :  {
            "key" : "coco",
            "color" : "cafe",
            "imagen" : coco
            }, 
        "manzana":  {
            "key" : "manzana",
            "color" : "rojo",
            "imagen" : manzana
            }     
    },
    comida: {
        "croissant" : {
            "key" : "croissant",
            "color" : "amarillo",
            "imagen": croissant
            },
        "huevo" : {
            "key" : "huevo",
            "color" : "amarillo",
            "imagen": huevo
            },
        "cafe" : {
            "key" : "cafe",
            "color" : "cafe" ,
            "imagen": cafe
            }
    },
    casa: {
        "plancha" : {
            "key" : "plancha",
            "color" : "gris",
            "imagen": plancha
            },
        "nevera" : { 
            "key" : "nevera",
            "color" : "gris",
            "imagen": nevera
            },
        "lavadora" : {
            "key" : "lavadora",
            "color" : "gris",
            "imagen": lavadora
            }
    }
}

export default object_list; 