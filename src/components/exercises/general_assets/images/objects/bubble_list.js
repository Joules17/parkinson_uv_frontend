// -------------------------------------------------------------------------------------------------------------------------------------------------
// Assets import
// -------------------------------------------------------------------------------------------------------------------------------------------------
// fruits ------------------------------------------------------------------------------------------------------------------------------------------
import mango from './fruits/mango.png'
import fresa from './fruits/fresa.png'
import limon from './fruits/limon.png'

// food ------------------------------------------------------------------------------------------------------------------------------------------

import huevo from './food/huevo.png'
import candy from './food/candy.png'
import pizza from './food/pizza.png'

// house ------------------------------------------------------------------------------------------------------------------------------------------
import car from './house/car.png'
import clock from './house/clock.png'
// animals ------------------------------------------------------------------------------------------------------------------------------------------
import dog from './animals/dog.png'
import pig from './animals/pig.png'
import bee from './animals/bee.png'
import sheep from './animals/sheep.png'

// -------------------------------------------------------------------------------------------------------------------------------------------------
let bubble_list =
{
    frutas: {
        "mango" :  {
            "key" : "mango",
            "color" : "amarillo",
            "imagen" : mango
            },
        "fresa" :  {
            "key" : "fresa",
            "color" : "rojo",
            "imagen" : fresa
        },
        "limon" :  {
            "key" : "limon",
            "color" : "amarillo",
            "imagen" : limon
        },
        },
    comida: {
        "huevo" : {
            "key" : "huevo",
            "color" : "amarillo",
            "imagen": huevo
            },
        "dulce" : {
            "key": "dulce",
            "color": "amarillo",
            "imagen": candy
            },
        "pizza" : {
            "key": "pizza",
            "color": "amarillo",
            "imagen": pizza
            },
    },
    casa: {
        "carro" : {
            "key" : "carro",
            "color" : "cafe",
            "imagen": car
        },
        "reloj" : {
            "key" : "reloj",
            "color" : "cafe",
            "imagen": clock
        },
    },
    animales : {
        "perro" : {
            "key": "perro",
            "color": "cafe",
            "imagen": dog
        },
        "cerdo" : {
            "key": "cerdo",
            "color": "rosado",
            "imagen": pig
        },
        "abeja" : {
            "key": "abeja",
            "color": "amarillo",
            "imagen": bee
        },
        "oveja" : {
            "key": "oveja",
            "color": "blanco",
            "imagen": sheep
        },
    }
}

export default bubble_list;