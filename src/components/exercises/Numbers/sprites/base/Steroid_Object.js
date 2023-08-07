// phaser library
import Phaser from 'phaser';

export default class SteroidObject extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.posx, config.posy, config.key, config.color, config.number, config.find, config.flag);
        this.active = true; 
        this.selected = config.selected;
        const circleRadius = 51;

        this.panel = config.scene.add.graphics();
        // Añade fisicas de la escena
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        const circle = config.scene.add.circle(config.posx, config.posy, circleRadius, config.color);

        // Crea un objeto de texto
        const numberText = config.scene.add.text(config.posx, config.posy, config.selected.toString(), {
            fontFamily: 'TROUBLE',
            fontSize: '70px',
            color: '#ffffff',
            align: 'center'
        });

        // Centra el objeto de texto en el círculo
        numberText.setOrigin(0.5);

        if (config.key == "find") {
            this.panel.lineStyle(5, 0xffffff);
            this.panel.strokeCircle(config.posx, config.posy, circleRadius);
        } else {
            // agregamos interactive a este tipo de Sprite 
            circle.setInteractive();

            // Listeners: 
            // get closer if over
            circle.on('pointerover', () => {
                this.scene.sound.play('hover');
                this.scene.tweens.add({
                    targets: circle,
                    scaleX: 1.2,
                    scaleY: 1.2,
                    duration: 100,
                    ease: 'Power2'
                });
                numberText.setScale(1.2);
                this.panel.clear();
                this.panel.lineStyle(5, 0xffffff);
                this.panel.strokeCircle(config.posx, config.posy, 61);
            });

            // get fuhrer if out 
            circle.on('pointerout', () => {
                this.panel.clear();
                this.scene.tweens.add({
                    targets: circle,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 100,
                    ease: 'Power2'
                });
                numberText.setScale(1);
            });

            // if clicked 
            circle.on('pointerdown', () => {
                if (this.active) {
                    this.shake(this.selected, this.scene, config.find, circle)
                }
            });

        }

    }

    // events on Fruit 
    shake(selected, scene, find, circle) {
        // animacion
        // var to_color = selected == find ? 0x00ff00 : 0xff0000;
        const initialX = circle.x;
        const initialY = circle.y;
        let self = this.scene;
        let obj = this; 

        scene.sound.play(selected == find ? 'good' : 'bad');
        if (selected) {
            obj.active = false; 
        }
        this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 100,
            repeat: 1,
            yoyo: true,
            onUpdate: () => {
                if (find !== selected) {
                    // Mover el círculo
                    const offset = 0.8;
                    const x = circle.x + Phaser.Math.Between(-offset, offset);
                    const y = circle.y + Phaser.Math.Between(-offset, offset);
                    circle.setPosition(x, y);
                }
            },
            onComplete: function () {
                // Restablecer a la posición inicial
                circle.setPosition(initialX, initialY);
                if (self.scene.key == 'rondas') {
                    if (selected == find) {
                        console.log('Objeto correcto')
                        scene.numberVictory += 1;
                        scene.current_number += 1;
                        scene.setStatus(true)
                        // self.scene.destroy(true)
                    } else {
                        console.log('Objeto incorrecto')
                        scene.numberErrors -= 1;
                        scene.setStatus(false)
                    }

                } else {
                    if (selected == find) {
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

}
