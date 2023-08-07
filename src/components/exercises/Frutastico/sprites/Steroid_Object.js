// phaser library
import Phaser from 'phaser';

export default class SteroidObject extends Phaser.Physics.Arcade.Sprite {
    constructor (config) {
        super(config.scene, config.posx, config.posy, config.key);
        this.active = true; 
        this.original_scale = config.original_scale;
        this.setScale(this.original_scale)
        this.added_scale = this.original_scale + 0.05;
        this.selected = config.selected;
        this.name = config.key; 
        
        // Añade fisicas de la escena
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        // agregamos interactive a este tipo de Sprite 
        this.setInteractive(); 

        // bailar!
        const randomOption = Math.random();
        let orientation = undefined; 
        if (randomOption >= 0.5) {
            orientation = 1; 
        } else {
            orientation = -1; 
        }
        this.dance_function(orientation*10, 1000); 

        // Listeners: 
        // get closer if over
        this.on('pointerover', () => {
            var added = this.added_scale; 
            this.scene.sound.play('hover'); 
            this.scene.tweens.add({
                targets: this,
                scaleX: added,
                scaleY: added,
                duration: 100, 
                ease: 'Power2'
            });
        });

        // get fuhrer if out 
        this.on('pointerout', () => {
            var original = this.original_scale; 
            this.scene.tweens.add({
                targets: this, 
                scaleX: original, 
                scaleY: original,
                duration: 100, 
                ease: 'Power2'
            });
        });

        // if clicked 
        this.on('pointerdown', () => {
            if (this.active) {
                this.shake(this.selected, this.scene)
            } 
        });
    }

    get_name() {
        return this.name; 
    }

    // events on Fruit 
    shake(selected, scene) {
        // animacion
        var to_color = selected ? 0x00ff00 : 0xff0000;
        const startColor  = Phaser.Display.Color.ValueToColor(0xffffff) // blanco
        const endColor = Phaser.Display.Color.ValueToColor(to_color) // rojo

        let self = this.scene; 
        let obj = this; 
        
        scene.sound.play(selected ? 'good' : 'bad' ); 
        if (selected) {
            obj.active = false; 
        }
        this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 100,
            repeat: 2,
            yoyo: true,
            onUpdate: tween => {
                const value = tween.getValue()
                const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
                    startColor,
                    endColor,
                    100,
                    value
                )

                const color = Phaser.Display.Color.GetColor(
                    colorObject.r,
                    colorObject.g,
                    colorObject.b,
                )
                this.setTint(color)
            },
            onComplete: function () {
                if (self.scene.key == 'FrutasticRondas') {
                    if (selected) {
                        // console.log('Objeto correcto')
                        scene.current_number += 1; 
                        scene.setStatus(true)
                        
                    } else {
                        // console.log('Objeto incorrecto')
                        scene.number_errors += 1;
                        scene.error_flag = true; 
                        scene.setStatus(false)
                    }

                } else {
                    if (selected) {
                        console.log('Objeto correcto')
                        scene.counter = 0; 
                        scene.setScore(1); 
                        scene.setStatus(true);
                    } else {
                        console.log('Objeto Incorrecto') 
                        scene.setStatus(false);
                        scene.setScore(-1);
                        scene.counter = 0; 
                    }
                }
               
              }
        })
    }

    dance_function(angle, duration) {
        var rotaIzq = this.scene.tweens.add({
            targets: this,
            angle: '-=' + angle, 
            duration: duration, 
            yoyo: true, 
            repeat: -1,
            ease: 'Linear'
        }); 

        return rotaIzq;
    }

}
