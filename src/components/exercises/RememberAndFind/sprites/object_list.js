// assets importing 
import banana from '../assets/frutas/banana.png'
import mango from '../assets/frutas/mango.png'
import coco from '../assets/frutas/coco.png'
import manzana from '../assets/frutas/manzana.png'
import naranja from '../assets/frutas/naranja.png'
import cafe from '../assets/comida/cafe.png'
import croissant from '../assets/comida/croissant.png'
import huevo from '../assets/comida/huevo.png'
import plancha from '../assets/casa/plancha.png'
import nevera from '../assets/casa/nevera.png'
import lavadora from '../assets/casa/lavadora.png'
// animals

import bear from '../assets/animals/bear.png'
import chicken from '../assets/animals/chicken.png'
import cocodrile from '../assets/animals/cocodrile.png'
import cow from '../assets/animals/cow.png'
import dog from '../assets/animals/dog.png'
import duck from '../assets/animals/duck.png'
import fish from '../assets/animals/fish.png'
import hamster from '../assets/animals/hamster.png'
import horse from '../assets/animals/horse.png'
import lion from '../assets/animals/lion.png'
import parrot from '../assets/animals/parrot.png'
import penguin from '../assets/animals/penguin.png'
import pig from '../assets/animals/pig.png'
import snake from '../assets/animals/snake.png'
import whale from '../assets/animals/whale.png'

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
    }, 
    animals : {
        "bear" : {
            "key": "bear",
            "color": "cafe",
            "imagen": bear
        },
        "chicken" : {
            "key": "chicken",
            "color": "amarillo",
            "imagen": chicken
        },
        "cocodrile" : {
            "key": "cocodrile",
            "color": "verde",
            "imagen": cocodrile
        },
        "cow" : {
            "key": "cow",
            "color": "blanco",
            "imagen": cow
        },
        "dog" : {
            "key": "dog",
            "color": "cafe",
            "imagen": dog
        },
        "duck" : {
            "key": "duck",
            "color": "amarillo",
            "imagen": duck
        },
        "fish" : {
            "key": "fish",
            "color": "gris",
            "imagen": fish
        },
        "hamster" : {
            "key": "hamster",
            "color": "cafe",
            "imagen": hamster
        },
        "horse" : {
            "key": "horse",
            "color": "cafe",
            "imagen": horse
        },
        "lion" : {
            "key": "lion",
            "color": "amarillo",
            "imagen": lion
        },
        "parrot" : {
            "key": "parrot",
            "color": "verde",
            "imagen": parrot
        },
        "penguin" : {
            "key": "penguin",
            "color": "blanco",
            "imagen": penguin
        },
        "pig" : {
            "key": "pig",
            "color": "rosado",
            "imagen": pig
        },
        "snake" : {
            "key": "snake",
            "color": "verde",
            "imagen": snake
        },
        "whale" : {
            "key": "whale",
            "color": "gris",
            "imagen": whale
        }
    }
}

export default object_list; 