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
        this.scene.physics.world.enable([this.bubble_sprite]);

        // Making Group
        this.objectGroup = this.scene.add.container(0, 400, [this.base_figure, this.figure, this.bubble_sprite]).setDepth(-2);
        console.log(this.posx, this.posy)
        // Appear Bubble 
        this.appear(this); 
    }

    create_figure(type) {
        this.figure = this.scene.add.graphics();
        if (type === 'triangle') {
            this.figure.fillStyle(0xe0bc28, 1);
            this.figure.lineStyle(2, 0x000000)
            // Calcula las coordenadas de los vértices del triángulo equilátero
            const triangleSize = 170; // Tamaño del triángulo
            const halfSize = triangleSize / 2; // Mitad del tamaño del triángulo

            // Coordenadas de los vértices del triángulo
            const x1 = this.posx - halfSize;
            const y1 = this.posy + (Math.sqrt(3) / 2) * halfSize;

            const x2 = this.posx + halfSize;
            const y2 = y1;

            const x3 = this.posx;
            const y3 = this.posy - Math.sqrt(3) * halfSize + 50;

            // Define los puntos del triángulo
            const triangle = new Phaser.Geom.Triangle(x1, y1, x2, y2, x3, y3);

            // Rellena el triángulo
            this.figure.fillTriangleShape(triangle);
            this.figure.strokeTriangleShape(triangle);
        } else if (type === 'square') {
            const width = 150; 
            const x1 = this.posx - width/2;
            const y1 = this.posy - width/2;

            this.figure.fillStyle(0x7768ad, 1);
            this.figure.lineStyle(2, 0x000000)
            this.figure.fillRect(x1, y1, width, width);
            this.figure.strokeRect(x1, y1, width, width);
        } else if (type === 'circle') {
            const radius = 80;
            this.figure.fillStyle(0xe15554, 1);
            this.figure.lineStyle(2, 0x000000)
            this.figure.fillCircle(this.posx, this.posy, radius);
            this.figure.strokeCircle(this.posx, this.posy, radius);
        } else if (type === 'star') {
            this.figure.fillStyle(0x3bb173, 1);
            this.figure.lineStyle(2, 0x000000)
            // Drawing a star
            const points = 5; // Número de puntas de la estrella
            const innerRadius = 60; // Radio interno
            const outerRadius = 120; // Radio externo

            this.figure.beginPath();
            for (let i = 0; i < 2 * points; i++) {
                const radius = i % 2 === 0 ? innerRadius : outerRadius;
                const angle = (i * Math.PI) / points;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                this.figure.lineTo(this.posx + x, this.posy + y);
            }
            this.figure.closePath();
            this.figure.fillPath();
            this.figure.strokePath(); 
        }
    }

    // Movements of bubble
    appear (bubble) {
        this.scene.tweens.add({
            targets: this.objectGroup,
            y: 0,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                bubble.pump_bubble(); 
            }
        });

    }

    leave () {
        this.scene.tweens.add({
            targets: this.objectGroup, 
            y: -500, 
            alpha: 1, 
            duration: 500,
            ease: 'Power2', 
            onComplete: () => {
                console.log('termine')
            } 
        }); 
    }

    dance ()  {
        this.scene.tweens.add({
            targets: this.objectGroup,
            y: -100,
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
        this.figure.body.setVelocity(diagonalSpeed, diagonalSpeed);
        this.figure.body.setBounce(1);

    }
}
