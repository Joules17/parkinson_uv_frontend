// assets arrows 
// good 
import good_right from 'components/exercises/general_assets/images/objects/arrows/good/good_right.png'
import good_up from 'components/exercises/general_assets/images/objects/arrows/good/good_up.png'
import good_left from 'components/exercises/general_assets/images/objects/arrows/good/good_left.png'
import good_down from 'components/exercises/general_assets/images/objects/arrows/good/good_down.png'

// bad 
import bad_right from 'components/exercises/general_assets/images/objects/arrows/bad/bad_right.png'
import bad_up from 'components/exercises/general_assets/images/objects/arrows/bad/bad_up.png'
import bad_left from 'components/exercises/general_assets/images/objects/arrows/bad/bad_left.png'
import bad_down from 'components/exercises/general_assets/images/objects/arrows/bad/bad_down.png'

// neutral 
import neutral_right from 'components/exercises/general_assets/images/objects/arrows/neutral/neutral_right.png'
import neutral_up from 'components/exercises/general_assets/images/objects/arrows/neutral/neutral_up.png'
import neutral_left from 'components/exercises/general_assets/images/objects/arrows/neutral/neutral_left.png'
import neutral_down from 'components/exercises/general_assets/images/objects/arrows/neutral/neutral_down.png'

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
    neutral: {
        "right" :  {
            "key" : "neutral_right",
            "color" : "white",
            "imagen" : neutral_right
        }, 
        "up" :  {
            "key" : "neutral_up",
            "color" : "white",
            "imagen" : neutral_up
        }, 
        "left" :  {
            "key" : "neutral_left",
            "color" : "white",
            "imagen" : neutral_left
        }, 
        "down" :  {
            "key" : "neutral_down",
            "color" : "white",
            "imagen" : neutral_down
        },
    }
}

export default arrow_list;