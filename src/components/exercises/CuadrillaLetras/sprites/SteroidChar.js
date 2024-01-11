// phaser library 
import Phaser from 'phaser'; 

export default class SteroidChar extends Phaser.Physics.Arcade.Sprite {
    constructor (config) {
        super(config.scene, config.posx, config.posy, config.key);
        // scaling 
        this.original_scale = config.original_scale;
        this.setScale(this.original_scale); 
        this.actual = config.actual;
        this.setVisible(false)
        // color 
        this.color = config.color; 
        
        // scene physics
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        // depth 
        // console.log('se posiciona en', config.posx, config.posy)
        this.content = this.scene.add.text(config.posx, config.posy, config.key, { fontFamily: 'Arial', fill: this.color, stroke: '#000000', strokeThickness: 4  }).setFontSize(this.original_scale);
        this.content.setVisible(this.actual)

        // agregamos interactive a este tipo de Sprite 
        this.setInteractive(); 
    }

    set_visible(bool) {
        this.content.setVisible(bool); 
    }

}