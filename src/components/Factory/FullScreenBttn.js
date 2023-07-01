class FullScreenBttn extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        // Add to the scene
        scene.add.existing(this);

        // properties and Scale
        this.setInteractive();
        this.setScale(0.03);

        // Button Actions
        this.on('pointerdown', this.onButtonClick, this);
        this.on('pointerover', this.onHover, this);
        this.on('pointerout', this.onOut, this);
    }

    onButtonClick() {
        if (this.scene.game.scale.isFullscreen) {
            // exit fullscreen Mode
            this.scene.game.scale.stopFullscreen();
        } else {
            // start fullscreen Mode
            this.scene.game.scale.startFullscreen();
        }
    }

    onHover() {
        this.scene.tweens.add({
            targets: this,
            scaleX: 0.04,
            scaleY: 0.04,
            duration: 100,
            ease: 'Power2'
        });
    }

    onOut() {
        this.scene.tweens.add({
            targets: this,
            scaleX: 0.03,
            scaleY: 0.03,
            duration: 100,
            ease: 'Power2'
        })
    }

}

export default FullScreenBttn;