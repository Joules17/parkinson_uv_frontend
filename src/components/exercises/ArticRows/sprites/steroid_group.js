// phaser library
import Phaser from 'phaser';

export default class steroid_group extends Phaser.GameObjects.Group {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.correct_option = config.correct_option;
        this.active = config.active;

        // Listeners del teclado: 
        this.scene.input.keyboard.on('keydown', this.handle_keydown, this); 
        // Mapeo de teclas y opciones
        // keyCode needed: 
        this.key_code_list = {
            up: 38,
            right: 39,
            down: 40,
            left: 37
        };

        if (this.correct_option !== undefined) {
            this.correct_option_translated = this.key_code_list[this.correct_option];
        } else {
            this.correct_option_translated = -1; 
        }
        this.mostrar(this.active); 
    }

    mostrar(bool) {
        this.active = bool; 
        this.children.iterate((sprite) => {
            sprite.setVisible(bool);
        });
    }

    set_correct_option(option) {
        this.correct_option = option;
        this.correct_option_translated = this.key_code_list[this.correct_option];
    }

    // events on Group
    handle_keydown(event) {
        if (this.active) {
            // console.log('tienes que presinar: ', this.correct_option_translated, this.correct_option)
            if (event.keyCode === this.correct_option_translated) {
                // console.log('good!');
                this.victory();
            } else {
                // console.log('bad');
                this.scene.broke_screen(this);
                this.scene.sound.play('CrackingSound');
                this.scene.set_status(false);
                this.damage();
            }
        }
    }

    victory() {
        // console.log('buen trabajo!');
        this.scene.current_number += 1;
        this.scene.feedback(true);
        this.scene.sound.play('StartButtonSound');
        this.scene.set_status(true);
    }

    damage() {
        this.scene.broke_screen(this);
        this.scene.feedback(false);
        this.scene.sound.play('CrackingSound');
        this.scene.errores += 1; 
        this.scene.tries -= 1;
        this.scene.error_flag = true; 
        this.scene.set_status(false);
    }

    dance_function () {
        let var_x = 0;
        let var_y = 0;
        let option = Math.random() < 0.5 ?  -1 : 1; // Genera un número aleatorio entre 0 y 1 y determina la dirección basado en si es menor a 0.5
        if (option === -1) {
            var_x = 1;
          } else {
            var_y = 1;
          }
        // console.log('caso', var_x, var_y)

        for (let i = 0; i < this.getChildren().length; i++) {
            this.scene.tweens.add({
                targets: this.getChildren()[i],
                x: this.getChildren()[i].x + var_x*50, 
                y: this.getChildren()[i].y + var_y*50, 
                duration: 1000,
                ease: 'Linear',
                yoyo: true, // Repetir el movimiento de ida y vuelta infinitamente
                repeat: -1, // Repetir infinitamente
              });
        }
    }
}
