// phaser library
import Phaser from 'phaser';

export default class SteroidObject extends Phaser.Physics.Arcade.Sprite {
    constructor (config) {
        super(config.scene, config.posx, config.posy, config.key);
        this.selected = config.selected;
        
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
            this.scene.sound.play('hover'); 
            this.scene.tweens.add({
                targets: this,
                scaleX: 0.2,
                scaleY: 0.2,
                duration: 100, 
                ease: 'Power2'
            });
        });

        // get fuhrer if out 
        this.on('pointerout', () => {
            this.scene.tweens.add({
                targets: this, 
                scaleX: 0.15, 
                scaleY: 0.15,
                duration: 100, 
                ease: 'Power2'
            });
        });

        // if clicked 
        this.on('pointerdown', () => {
            this.shake(this.selected, this.scene)
        });
    }

    // events on Fruit 
    shake(selected, scene) {
        // animacion
        var to_color = selected ? 0x00ff00 : 0xff0000;
        const startColor  = Phaser.Display.Color.ValueToColor(0xffffff) // blanco
        const endColor = Phaser.Display.Color.ValueToColor(to_color) // rojo

        let self = this.scene; 
        
        scene.sound.play(selected ? 'good' : 'bad' ); 
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
                if (self.scene.key == 'rondas') {
                    if (selected) {
                        console.log('Objeto correcto')
                        scene.numberVictory += 1; 
                        scene.current_number += 1; 
                        scene.setStatus(true)
                        
                    } else {
                        console.log('Objeto incorrecto')
                        scene.numberErrors -= 1; 
                        scene.setStatus(false)
                    }

                } else {
                    if (selected) {
                        console.log('Objeto correcto')
                        scene.counter = 0; 
                        scene.setScore(1)
                    } else {
                        console.log('Objeto Incorrecto')
                        scene.counter = 0; 
                        scene.setScore(-1)
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
