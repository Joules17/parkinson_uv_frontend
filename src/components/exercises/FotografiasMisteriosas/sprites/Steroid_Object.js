// phaser library
import Phaser from 'phaser';

export default class SteroidObject extends Phaser.Physics.Arcade.Sprite {
    constructor (config) {
        super(config.scene, config.posx, config.posy, config.key);
        this.setVisible(false); 
        
        // Añade fisicas de la escena
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this); 
    }
}
