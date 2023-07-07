// phaser library
import Phaser from 'phaser';

export default class Frutita extends Phaser.Physics.Arcade.Sprite {
    // Nota: Key: Skin: Imagen a la que hace referencia la fruta
    constructor(config) {
        super(config.scene, config.posx, config.posy, config.key);

        // Añade fisicas de la escena
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

    }

    dance_function(angle, duration) {
        const rotaIzq = this.scene.tweens.add({
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