// ----------------------------------------- ASSETS IMPORTING ----------------------------------------- //
// ----------------------------------------- FRUITS ----------------------------------------- 
import banana from './fruits/banana.png'
import mango from './fruits/mango.png'
import coco from './fruits/coco.png'
import manzana from './fruits/manzana.png'
import naranja from './fruits/naranja.png'
// ----------------------------------------- FOOD -----------------------------------------
import cafe from './food/cafe.png'
import croissant from './food/croissant.png'
import huevo from './food/huevo.png'
// ----------------------------------------- HOUSE -----------------------------------------
import plancha from './house/plancha.png'
import nevera from './house/nevera.png'
import lavadora from './house/lavadora.png'
// ----------------------------------------- ANIMALS -----------------------------------------


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