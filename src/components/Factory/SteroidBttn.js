class SteroidBttn extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style, audioIn, colorIn, colorOut, functionToDo) {
        super(scene, x, y, text, style); 
        this.functionToDo = functionToDo; 
        this.audioIn = audioIn; 
        this.colorIn = colorIn; 
        this.colorOut = colorOut; 


        this.setInteractive(); 
        

        // button actions
        this.on('pointerdown', this.onButtonClick, this);
        this.on('pointerover', this.onHover, this);
        this.on('pointerout', this.onOut, this);

        // scene 
        scene.add.existing(this); 
    }

    onButtonClick () {
        this.functionToDo()
    }

    onHover () {
        this.setColor(this.colorIn); 
        this.scene.sound.play(this.audioIn); 
        this.scene.sound.play(); 
        this.scene.tweens.add({
            targets: this, 
            scaleX: 1.1, 
            scaleY: 1.1, 
            duration: 100, 
            ease: 'Power2'
        }); 
    }

    onOut () {
        this.setColor(this.colorOut); 
        this.scene.tweens.add({
            targets: this,
            scaleX: 1, 
            scaleY: 1, 
            duration: 100, 
            ease: 'Power2'
        }); 
    }
}

export default SteroidBttn; 