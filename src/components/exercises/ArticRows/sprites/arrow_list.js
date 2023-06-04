// assets arrows 
// good 
import good_right from '../assets/img/arrow/good/good_right.png'
import good_up from '../assets/img/arrow/good/good_up.png'
import good_left from '../assets/img/arrow/good/good_left.png'
import good_down from '../assets/img/arrow/good/good_down.png'

// bad 
import bad_right from '../assets/img/arrow/bad/bad_right.png'
import bad_up from '../assets/img/arrow/bad/bad_up.png'
import bad_left from '../assets/img/arrow/bad/bad_left.png'
import bad_down from '../assets/img/arrow/bad/bad_down.png'

// frozen 
import frozen_right from '../assets/img/frozen/right.png'
import frozen_up from '../assets/img/frozen/up.png'
import frozen_left from '../assets/img/frozen/left.png'
import frozen_down from '../assets/img/frozen/down.png'

let arrow_list = 
{
    good: {
        "right" :  {
            "key" : "good_right",
            "color" : "green",
            "imagen" : good_right
            },
        "up" :  {
            "key" : "good_up",
            "color" : "green",
            "imagen" : good_up
            },
        "left" :  {
            "key" : "good_left",
            "color" : "green",
            "imagen" : good_left
            },
        "down" :  {
            "key" : "good_down",
            "color" : "green",
            "imagen" : good_down
            },
        },
    bad: {
        "right" :  {
            "key" : "bad_right",
            "color" : "red",
            "imagen" : bad_right
            },
        "up" :  {
            "key" : "bad_up",
            "color" : "red",
            "imagen" : bad_up
            },
        "left" :  {
            "key" : "bad_left",
            "color" : "red",
            "imagen" : bad_left
            },
        "down" :  {
            "key" : "bad_down",
            "color" : "red",
            "imagen" : bad_down
            },
    },
    frozen: {
        "right" :  {
            "key" : "frozen_right",
            "color" : "white",
            "imagen" : frozen_right
        }, 
        "up" :  {
            "key" : "frozen_up",
            "color" : "white",
            "imagen" : frozen_up
        }, 
        "left" :  {
            "key" : "frozen_left",
            "color" : "white",
            "imagen" : frozen_left
        }, 
        "down" :  {
            "key" : "frozen_down",
            "color" : "white",
            "imagen" : frozen_down
        },
    }
}

export default arrow_list;