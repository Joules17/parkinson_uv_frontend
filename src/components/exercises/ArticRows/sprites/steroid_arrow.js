// phaser library
import Phaser from 'phaser';

export default class steroid_arrow extends Phaser.Physics.Arcade.Sprite {
    constructor (config) {
        super(config.scene, config.posx, config.posy, config.key);
        this.original_scale = config.original_scale;
        this.correct_option = config.correct_option;
        this.setScale(this.original_scale)
        this.added_scale = this.original_scale + 0.05;
        
        // Añade fisicas de la escena
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.setDepth(1)

        // agregamos interactive a este tipo de Sprite 
        this.setInteractive(); 
    }
}
