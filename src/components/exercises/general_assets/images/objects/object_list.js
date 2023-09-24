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
            }, 
        "green_apple" :  {
            "key" : "green_apple",
            "color" : "verde",
            "imagen" : green_apple
            },
        "carrot" :  {
            "key" : "carrot",
            "color" : "naranja",
            "imagen" : carrot
        },
        "cherry" :  {
            "key" : "cherry",
            "color" : "rojo",
            "imagen" : cherry
        },  
        "dragon_fruit" :  {
            "key" : "dragon_fruit",
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
        "lettuce" :  {
            "key" : "lettuce",
            "color" : "verde",
            "imagen" : lettuce
        },
        "limon" :  {
            "key" : "limon",
            "color" : "amarillo",
            "imagen" : limon
        },
        "onion" :  {
            "key" : "onion",
            "color" : "blanco",
            "imagen" : onion
        },
        "palta" :  {
            "key" : "palta",
            "color" : "verde",
            "imagen" : palta
        },
        "papaya" :  {
            "key" : "papaya",
            "color" : "amarillo",
            "imagen" : papaya
        },
        "pear" :  {
            "key" : "pear",
            "color" : "amarillo",
            "imagen" : pear
        },
        "pina" :  {
            "key" : "pina",
            "color" : "amarillo",
            "imagen" : pina
        },
        "pumpkin" :  {
            "key" : "pumpkin",
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
        "burguer" : {
            "key": "burguer",
            "color": "cafe",
            "imagen": burguer
            },
        "cake" : {
            "key": "cake",
            "color": "cafe",
            "imagen": cake
            },
        "candy" : {
            "key": "candy",
            "color": "amarillo",
            "imagen": candy
            },
        "chickenPlate" : {
            "key": "chickenPlate",
            "color": "amarillo",
            "imagen": chickenPlate
            },
        "chocolate" : {
            "key": "chocolate",
            "color": "cafe",
            "imagen": chocolate
            },
        "cookie" : {
            "key": "cookie",
            "color": "cafe",
            "imagen": cookie
            }, 
        "cookiecream" : {
            "key": "cookiecream",
            "color": "cafe",
            "imagen": cookiecream
            },
        "hotdog" : {
            "key": "hotdog",
            "color": "cafe",
            "imagen": hotdog
            },
        "icecream" : {
            "key": "icecream",
            "color": "cafe",
            "imagen": icecream
            },
        "juice" : {
            "key": "juice",
            "color": "amarillo",
            "imagen": juice
            },
        "pez" : {
            "key": "pez",
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
        "soda" : {
            "key": "soda",
            "color": "amarillo",
            "imagen": soda
            },
        "soup" : {
            "key": "soup",
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
        "bed" : {
            "key" : "bed",
            "color" : "cafe",
            "imagen": bed
        },
        "car" : {
            "key" : "car",
            "color" : "cafe",
            "imagen": car
        },
        "clock" : {
            "key" : "clock",
            "color" : "cafe",
            "imagen": clock
        },
        "coffee_machine" : {
            "key" : "coffee_machine",
            "color" : "cafe",
            "imagen": coffee_machine
        },
        "dinning_room" : {
            "key" : "dinning_room",
            "color" : "cafe",
            "imagen": dinning_room
        },
        "fan" : {
            "key" : "fan",
            "color" : "cafe",
            "imagen": fan
        },
        "flower_pot" : {
            "key" : "flower_pot",
            "color" : "cafe",
            "imagen": flower_pot
        },
        "key_chain" : {
            "key" : "key_chain",
            "color" : "cafe",
            "imagen": key_chain
        },
        "microwave" : {
            "key" : "microwave",
            "color" : "cafe",
            "imagen": microwave
        },
        "pc" : {
            "key" : "pc",
            "color" : "cafe",
            "imagen": pc
        },
        "seater_sofa" : {
            "key" : "seater_sofa",
            "color" : "cafe",
            "imagen": seater_sofa
        },
        "stereo" : {
            "key" : "stereo",
            "color" : "cafe",
            "imagen": stereo
        },
        "table_lamp" : {
            "key" : "table_lamp",
            "color" : "cafe",
            "imagen": table_lamp
        },
        "telephone" : {
            "key" : "telephone",
            "color" : "cafe",
            "imagen": telephone
        },
        "television" : {
            "key" : "television",
            "color" : "cafe",
            "imagen": television
        },
        "toilet_paper" : {
            "key" : "toilet_paper",
            "color" : "cafe",
            "imagen": toilet_paper
        },
        "toilet" : {
            "key" : "toilet",
            "color" : "cafe",
            "imagen": toilet
        },
        "tooth_brush" : {
            "key" : "tooth_brush",
            "color" : "cafe",
            "imagen": tooth_brush
        },
        "trash" : {
            "key" : "trash",
            "color" : "cafe",
            "imagen": trash
        }
    }, 
    animales : {
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
        }, 
        "bee" : {
            "key": "bee",
            "color": "amarillo",
            "imagen": bee
        },
        "cat" : {
            "key": "cat",
            "color": "cafe",
            "imagen": cat
        },
        "crab" : {
            "key": "crab",
            "color": "cafe",
            "imagen": crab
        },
        "monkey" : {
            "key": "monkey",
            "color": "cafe",
            "imagen": monkey
        },
        "rabbit" : {
            "key": "rabbit",
            "color": "blanco",
            "imagen": rabbit
        },
        "sheep" : {
            "key": "sheep",
            "color": "blanco",
            "imagen": sheep
        },
        "snail" : {
            "key": "snail",
            "color": "cafe",
            "imagen": snail
        },
        "turtle" : {
            "key": "turtle",
            "color": "verde",
            "imagen": turtle
        }
    }
}

export default object_list; 