// phaser library 
import Phaser from 'phaser'; 

export default class steroid_object extends Phaser.Physics.Arcade.Sprite {
    constructor (config) {
        super(config.scene, config.posx, config.posy, config.key);
        this.question = config.question; 
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
        this.content = this.scene.add.text(config.posx, config.posy, config.key, { fontFamily: 'Arial', fill: this.color}).setFontSize(200);
        this.content.setVisible(this.actual)

        this.question = this.scene.add.text(230, 20, this.question, { fontFamily: 'Arial', fill: "#ffffff"}).setFontSize(50); 
        this.question.setVisible(this.actual)
        // agregamos interactive a este tipo de Sprite 
        this.setInteractive(); 
    }

    set_visible(bool) {
        this.content.setVisible(bool); 
        this.question.setVisible(bool);
    }

}