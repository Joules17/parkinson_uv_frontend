// phaser
import Phaser from 'phaser';

// Figure: Skin
export default class extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.posx = config.posx;
        this.posy = config.posy;
        this.bubble_sprite = undefined;
        this.type = config.type;
        this.correct_option = config.correct_option;
        this.completed = false;

        this.figure = undefined;

        // Base
        this.base_figure = this.scene.add.graphics();
        this.base_figure.fillStyle(0x6ca9f6, 1 );
        this.base_figure.lineStyle(2, 0x000000)
        this.base_figure.strokeCircle(this.posx, this.posy, 142);
        this.base_figure.fillCircle(this.posx, this.posy, 142);

        // Skin
        this.create_figure(this.type);

        // Bubble
        this.bubble_sprite = this.scene.add.sprite(this.posx, this.posy, 'BubbleTransparentImg').setScale(0.15).setAlpha(0.5)

        // Physics
        this.scene.physics.world.enable([this.bubble_sprite, this.figure]);

        // Making Group
        this.objectGroup = this.scene.add.container(0, 400, [this.base_figure, this.figure, this.bubble_sprite]).setDepth(-2);
    }

    create_figure(type) {
        this.figure = this.scene.add.sprite(this.posx, this.posy, type+'Img').setScale(0.3)
    }

    // Movements of bubble
    appear (bubble) {
        this.scene.tweens.add({
            targets: this.objectGroup,
            y: 100,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                bubble.dance();
            }
        });

    }

    leave (bubble) {
        this.scene.tweens.add({
            targets: this.objectGroup,
            y: -1000,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                bubble.completed = true;
                bubble.setAppeareance(false); 
            }
        });
    }

    dance ()  {
        this.scene.tweens.add({
            targets: this.objectGroup,
            y: 0,
            duration: 2000,
            ease: 'Linear',
            yoyo: true,
            loop: -1
        });
    }

    pump_bubble () {
        this.objectGroup.remove(this.base_figure);
        this.objectGroup.remove(this.bubble_sprite);

        this.base_figure.setAlpha(0);
        this.bubble_sprite.setAlpha(0);

        this.scene.physics.world.enable([this.figure]);

        const diagonalSpeed = 100;
        this.figure.x = this.posx;
        this.figure.y = this.posy;
        this.figure.body.setCollideWorldBounds(true);
        this.figure.body.onWorldBounds = true;
        this.figure.body.setVelocity(diagonalSpeed, diagonalSpeed);
        this.figure.body.setBounce(1);
    }

    getFigureSkin () {
        const figure_skin = this.figure.texture.key.replace('Img', '');
        return figure_skin;
    }

    setAppeareance(bool) {
        this.base_figure.setVisible(bool); 
        this.figure.setVisible(bool); 
        this.bubble_sprite.setVisible(bool);
    }
}
