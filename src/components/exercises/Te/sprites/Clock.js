// phaser
import Phaser from 'phaser';

// Figure: Letter
export default class extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.posx = config.posx;
        this.posy = config.posy;
        this.hour = config.hour;
        this.min = config.min;

        console.log('PERO QUE PASA', this.hour, this.min)


    }

    set_visible(bool) {
        this.visible = bool;
        this.hour_hand.setVisible(bool);
        this.min_hand.setVisible(bool);
    }

    hide() {
        this.set_visible(false);
    }

    show() {
        this.set_visible(true);
    }

    update_hands() {
        const hour_angle = (360 / 12) * (this.hour % 12) + (360 / 12) * (this.min / 60);
        const min_angle = (360 / 60) * this.min;

        const hour_length = 60;
        const min_length = 80;

        // Coordenadas para la manecilla de la hora
        const hour_X = this.posx + hour_length * Math.cos((hour_angle * Math.PI) / 180);
        const hour_Y = this.posy - hour_length * Math.sin((hour_angle * Math.PI) / 180);

        // Coordenadas para la manecilla de los minutos
        let min_X, min_Y;

        if (this.min === 0) {
            // Si los minutos son 0, dibujar una línea vertical
            min_X = this.posx;
            min_Y = this.posy - min_length;
        } else {
            // Calcular las coordenadas normales
            min_X = this.posx + min_length * Math.cos((min_angle * Math.PI) / 180);
            min_Y = this.posy - min_length * Math.sin((min_angle * Math.PI) / 180);
        }

        console.log('Hour: x1:', this.posx, 'y1:', this.posy, 'x2:', hour_X, 'y2:', hour_Y);
        console.log('Min: x1:', this.posx, 'y1:', this.posy, 'x2:', min_X, 'y2:', min_Y);

        // Update positions
        this.hour_hand = new Phaser.Geom.Polygon(
            {
                stroke: 0x000000,
                lineWidth: 100,
                points: [this.posx, this.posy, hour_X, hour_Y]
            });
        this.min_hand = new Phaser.Geom.Polygon({
            stroke: 0x000000,
            lineWidth: 100,
            points: [this.posx, this.posy, min_X, min_Y]
        });
    }
}