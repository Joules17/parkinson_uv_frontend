// -------------------------------------------------------------------------------------------------------------------------------------------------
// Assets import 
// -------------------------------------------------------------------------------------------------------------------------------------------------
// fruits ------------------------------------------------------------------------------------------------------------------------------------------
import banana from './fruits/banana.png'
import mango from './fruits/mango.png'
import coco from './fruits/coco.png'
import manzana from './fruits/manzana.png'
import naranja from './fruits/naranja.png'
import green_apple from './fruits/apple.png'
import carrot from './fruits/carrot.png'
import cherry from './fruits/cereza.png'
import dragon_fruit from './fruits/dragon-fruit.png'
import fresa from './fruits/fresa.png'
import kiwi from './fruits/kiwi.png'
import lettuce from './fruits/lettuce.png'
import limon from './fruits/limon.png'
import onion from './fruits/onion.png'
import palta from './fruits/palta.png'
import papaya from './fruits/papaya.png'
import pear from './fruits/pera.png'
import pina from './fruits/pina.png'
import pumpkin from './fruits/pumpkin.png'
import sandia from './fruits/sandia.png'
import uva from './fruits/uva.png'

// food ------------------------------------------------------------------------------------------------------------------------------------------
import cafe from './food/cafe.png'
import croissant from './food/croissant.png'
import huevo from './food/huevo.png'
import bistec from './food/bistec.png'
import burguer from './food/burguer.png'
import cake from './food/cake.png'
import candy from './food/candy.png'
import chickenPlate from './food/chickenPlate.png'
import chocolate from './food/chocolate.png'
import cookie from './food/cookie.png'
import cookiecream from './food/cookiecream.png'
import hotdog from './food/hotdog.png'
import icecream from './food/icecream.png'
import juice from './food/juice.png'
import pez from './food/pez.png'
import pizza from './food/pizza.png'
import sandwich from './food/sandwich.png'
import soda from './food/soda.png'
import soup from './food/soup.png'
import taco from './food/taco.png'
import spaguetti from './food/spaguetti.png'

// house ------------------------------------------------------------------------------------------------------------------------------------------
import plancha from './house/plancha.png'
import nevera from './house/nevera.png'
import lavadora from './house/lavadora.png'
import bed from './house/bed.png'
import car from './house/car.png'
import clock from './house/clock.png'
import coffee_machine from './house/coffee-machine.png'
import dinning_room from './house/dinning-room.png'
import fan from './house/fan.png'
import flower_pot from './house/flower-pot.png'
import key_chain from './house/key-chain.png'
import microwave from './house/microwave.png'
import pc from './house/pc.png'
import seater_sofa from './house/seater-sofa.png'
import stereo from './house/stereo.png'
import table_lamp from './house/table-lamp.png'
import telephone from './house/telephone.png'
import television from './house/television.png'
import toilet_paper from './house/toilet-paper.png'
import toilet  from './house/toilet.png'
import tooth_brush from './house/tooth-brush.png'
import trash from './house/trash.png'

// animals ------------------------------------------------------------------------------------------------------------------------------------------
import bear from './animals/bear.png'
import chicken from './animals/chicken.png'
import cocodrile from './animals/cocodrile.png'
import cow from './animals/cow.png'
import dog from './animals/dog.png'
import duck from './animals/duck.png'
import fish from './animals/fish.png'
import hamster from './animals/hamster.png'
import horse from './animals/horse.png'
import lion from './animals/lion.png'
import parrot from './animals/parrot.png'
import penguin from './animals/penguin.png'
import pig from './animals/pig.png'
import snake from './animals/snake.png'
import whale from './animals/whale.png'
import bee from './animals/bee.png'
import cat from './animals/cat.png'
import crab from './animals/crab.png'
import monkey from './animals/monkey.png'
import rabbit from './animals/rabbit.png'
import sheep from './animals/sheep.png'
import snail from './animals/snail.png'
import turtle from './animals/turtle.png'

// -------------------------------------------------------------------------------------------------------------------------------------------------
let object_list = 
{
    frutas: {
        "banano" :  {
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
            }, 
        "manzana_verde" :  {
            "key" : "manzana_verde",
            "color" : "verde",
            "imagen" : green_apple
            },
        "zanahoria" :  {
            "key" : "zanahoria",
            "color" : "naranja",
            "imagen" : carrot
        },
        "cereza" :  {
            "key" : "cereza",
            "color" : "rojo",
            "imagen" : cherry
        },  
        "maracuya" :  {
            "key" : "maracuya",
            "color" : "amarillo",
            "imagen" : dragon_fruit
        },
        "fresa" :  {
            "key" : "fresa",
            "color" : "rojo",
            "imagen" : fresa
        },
        "kiwi" :  {
            "key" : "kiwi",
            "color" : "verde",
            "imagen" : kiwi
        },
        "lechuga" :  {
            "key" : "lechuga",
            "color" : "verde",
            "imagen" : lettuce
        },
        "limon" :  {
            "key" : "limon",
            "color" : "amarillo",
            "imagen" : limon
        },
        "cebolla" :  {
            "key" : "cebolla",
            "color" : "blanco",
            "imagen" : onion
        },
        "aguacate" :  {
            "key" : "aguacate",
            "color" : "verde",
            "imagen" : palta
        },
        "papaya" :  {
            "key" : "papaya",
            "color" : "amarillo",
            "imagen" : papaya
        },
        "pera" :  {
            "key" : "pera",
            "color" : "amarillo",
            "imagen" : pear
        },
        "piña" :  {
            "key" : "piña",
            "color" : "amarillo",
            "imagen" : pina
        },
        "calabaza" :  {
            "key" : "calabaza",
            "color" : "naranja",
            "imagen" : pumpkin
        },
        "sandia" :  {
            "key" : "sandia",
            "color" : "verde",
            "imagen" : sandia
        },
        "uva" :  {
            "key" : "uva",
            "color" : "amarillo",
            "imagen" : uva
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
            }, 
        "bistec" : {
            "key": "bistec",
            "color": "cafe",
            "imagen": bistec
            },
        "hamburguesa" : {
            "key": "hamburguesa",
            "color": "cafe",
            "imagen": burguer
            },
        "pastel" : {
            "key": "pastel",
            "color": "cafe",
            "imagen": cake
            },
        "dulce" : {
            "key": "dulce",
            "color": "amarillo",
            "imagen": candy
            },
        "pollofrito" : {
            "key": "pollofrito",
            "color": "amarillo",
            "imagen": chickenPlate
            },
        "chocolate" : {
            "key": "chocolate",
            "color": "cafe",
            "imagen": chocolate
            },
        "galleta" : {
            "key": "galleta",
            "color": "cafe",
            "imagen": cookie
            }, 
        "platillo" : {
            "key": "platillo",
            "color": "cafe",
            "imagen": cookiecream
            },
        "hotdog" : {
            "key": "hotdog",
            "color": "cafe",
            "imagen": hotdog
            },
        "helado" : {
            "key": "helado",
            "color": "cafe",
            "imagen": icecream
            },
        "jugo" : {
            "key": "jugo",
            "color": "amarillo",
            "imagen": juice
            },
        "pescado" : {
            "key": "pescado",
            "color": "amarillo",
            "imagen": pez
            },
        "pizza" : {
            "key": "pizza",
            "color": "amarillo",
            "imagen": pizza
            },
        "sandwich" : {
            "key": "sandwich",
            "color": "amarillo",
            "imagen": sandwich
            },
        "gaseosa" : {
            "key": "gaseosa",
            "color": "amarillo",
            "imagen": soda
            },
        "sopa" : {
            "key": "sopa",
            "color": "amarillo",
            "imagen": soup
            },
        "taco" : {
            "key": "taco",
            "color": "amarillo",
            "imagen": taco
            },
        "spaguetti" : {
            "key": "spaguetti",
            "color": "amarillo",
            "imagen": spaguetti
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
        },
        "cama" : {
            "key" : "cama",
            "color" : "cafe",
            "imagen": bed
        },
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
        "cafetera" : {
            "key" : "cafetera",
            "color" : "cafe",
            "imagen": coffee_machine
        },
        "sala" : {
            "key" : "sala",
            "color" : "cafe",
            "imagen": dinning_room
        },
        "ventilador" : {
            "key" : "ventilador",
            "color" : "cafe",
            "imagen": fan
        },
        "maceta" : {
            "key" : "maceta",
            "color" : "cafe",
            "imagen": flower_pot
        },
        "llaves" : {
            "key" : "llaves",
            "color" : "cafe",
            "imagen": key_chain
        },
        "microondas" : {
            "key" : "microondas",
            "color" : "cafe",
            "imagen": microwave
        },
        "computador" : {
            "key" : "computador",
            "color" : "cafe",
            "imagen": pc
        },
        "sofa" : {
            "key" : "sofa",
            "color" : "cafe",
            "imagen": seater_sofa
        },
        "estereo" : {
            "key" : "estereo",
            "color" : "cafe",
            "imagen": stereo
        },
        "lampara" : {
            "key" : "lampara",
            "color" : "cafe",
            "imagen": table_lamp
        },
        "telefono" : {
            "key" : "telefono",
            "color" : "cafe",
            "imagen": telephone
        },
        "television" : {
            "key" : "television",
            "color" : "cafe",
            "imagen": television
        },
        "higienico" : {
            "key" : "higienico",
            "color" : "cafe",
            "imagen": toilet_paper
        },
        "inodoro" : {
            "key" : "inodoro",
            "color" : "cafe",
            "imagen": toilet
        },
        "cepillo" : {
            "key" : "cepillo",
            "color" : "cafe",
            "imagen": tooth_brush
        },
        "basura" : {
            "key" : "basura",
            "color" : "cafe",
            "imagen": trash
        }
    }, 
    animales : {
        "oso" : {
            "key": "oso",
            "color": "cafe",
            "imagen": bear
        },
        "gallina" : {
            "key": "gallina",
            "color": "amarillo",
            "imagen": chicken
        },
        "cocodrilo" : {
            "key": "cocodrilo",
            "color": "verde",
            "imagen": cocodrile
        },
        "vaca" : {
            "key": "vaca",
            "color": "blanco",
            "imagen": cow
        },
        "perro" : {
            "key": "perro",
            "color": "cafe",
            "imagen": dog
        },
        "pato" : {
            "key": "pato",
            "color": "amarillo",
            "imagen": duck
        },
        "pez" : {
            "key": "pez",
            "color": "gris",
            "imagen": fish
        },
        "hamster" : {
            "key": "hamster",
            "color": "cafe",
            "imagen": hamster
        },
        "caballo" : {
            "key": "caballo",
            "color": "cafe",
            "imagen": horse
        },
        "leon" : {
            "key": "leon",
            "color": "amarillo",
            "imagen": lion
        },
        "loro" : {
            "key": "loro",
            "color": "verde",
            "imagen": parrot
        },
        "pinguino" : {
            "key": "pinguino",
            "color": "blanco",
            "imagen": penguin
        },
        "cerdo" : {
            "key": "cerdo",
            "color": "rosado",
            "imagen": pig
        },
        "serpiente" : {
            "key": "serpiente",
            "color": "verde",
            "imagen": snake
        },
        "ballena" : {
            "key": "ballena",
            "color": "gris",
            "imagen": whale
        }, 
        "abeja" : {
            "key": "abeja",
            "color": "amarillo",
            "imagen": bee
        },
        "gato" : {
            "key": "gato",
            "color": "cafe",
            "imagen": cat
        },
        "cangrejo" : {
            "key": "cangrejo",
            "color": "cafe",
            "imagen": crab
        },
        "mono" : {
            "key": "mono",
            "color": "cafe",
            "imagen": monkey
        },
        "conejo" : {
            "key": "conejo",
            "color": "blanco",
            "imagen": rabbit
        },
        "oveja" : {
            "key": "oveja",
            "color": "blanco",
            "imagen": sheep
        },
        "caracol" : {
            "key": "caracol",
            "color": "cafe",
            "imagen": snail
        },
        "tortuga" : {
            "key": "tortuga",
            "color": "verde",
            "imagen": turtle
        }
    }
}

export default object_list; 