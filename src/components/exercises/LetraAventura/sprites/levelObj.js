const randomWords = require('random-spanish-words');

// custom classes:
import Card from './card'

export default class Level {
    constructor(config) {
        this.scene = config.scene;
        this.limit = config.limit;
        this.game_width = config.game_width;
        this.sprite_scale = config.sprite_scale;
        this.actual = config.actual;

        // const
        this.letter_width = 80;
        // word
        this.word = undefined;
        // list
        this.letters_generated = [];
        this.letter_space = [];
        // function
        this.create_tablero();
    }

    create_word() {
        let aux = '';
        do {
            aux = randomWords(1)[0];
        } while (aux.length > this.limit);
        this.word = aux;
        this.word = this.word.toUpperCase();
        this.word = this.word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Ñ/g, "N");
        return this.word;
    }

    create_tablero () {
        let palabra = this.create_word();
        console.log(palabra)
        const len = palabra.length;
        const total_width = len * this.letter_width;
        const offset = (this.game_width - total_width) / 2;

        // creacion de la palabra secreta y de las cards
        for (let i = 0; i < len; i++) {
            // creacion de la palabra secreta
            let key = palabra[i];
            let sprite = this.scene.add.sprite(offset + (i * this.letter_width), 300, key);
            this.letters_generated.push(sprite);
            sprite.setVisible(this.actual);
            sprite.setScale(this.sprite_scale);
            sprite.setInteractive();
            sprite.key = key;
            sprite.on('pointerdown', function() {
                console.log(this.key);
            });
            // creacion de la card
            let tarjeta = new Card(this.scene, offset + (i * this.letter_width), 80, key, this.actual, this.actual);
            this.letter_space.push(tarjeta);
        }
    }

    get_correct_word() {
        return this.word;
    }

    set_visible (val) {
        for (let elem of this.letters_generated) {
            elem.setVisible(val);
        }
        for (let elem of this.letter_space) {
            elem.set_visible(val);
        }
    }

    set_hiden() {
        for (let elem of this.letter_space) {
            elem.set_covered(false);
        }
    }
}