// phaser
import Phaser from 'phaser';

// Figure: Skin
export default class extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.posx = config.posx;
        this.posy = config.posy;
        this.figure = config.figure;
        this.bubble_sprite = undefined;
        this.visible = config.visible;

        // Figure
        this.figure = this.scene.add.sprite(this.posx, this.posy, this.figure).setScale(0.25).setVisible(this.visible)

        // Bubble
        this.bubble_sprite = this.scene.add.sprite(this.posx, this.posy, 'BubbleImg').setScale(0.3).setVisible(this.visible)

        // Add Physics
        this.scene.physics.world.enable([this.figure, this.bubble_sprite]);
        this.float()

    }

    mostrar(bool) {
        this.figure.setVisible(bool);
        this.bubble_sprite.setVisible(bool);
    }

    float() {
        this.scene.tweens.add({
            targets: [this.figure, this.bubble_sprite],
            y: 180,
            duration: 5000,
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });
    }
}