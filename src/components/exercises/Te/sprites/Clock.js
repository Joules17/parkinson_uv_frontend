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
        this.visible = config.visible; 


        this.update_hands(); 
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

    check_complete () {
        let hour_marked = this.scene.current_hour.split(' '); 
        let min_marked = this.scene.current_min.split(' ');
        hour_marked = hour_marked[0] + hour_marked[1];
        min_marked = min_marked[1] + min_marked[2];

        hour_marked = parseInt(hour_marked);
        min_marked = parseInt(min_marked);

        if (hour_marked === this.hour && min_marked === this.min) {
            return true;
        } else {
            return false; 
        }
    }

    update_hands() {
        const hour_angle = 30 * this.hour + (this.min / 2);
        const min_angle = 6 * this.min; 
    
        const hour_length = 100;
        const min_length = 130;
    
        // Coordenadas para la manecilla del min
        const min_X = this.posx + min_length * Math.sin((min_angle * Math.PI) / 180);
        const min_Y = this.posy - min_length * Math.cos((min_angle * Math.PI) / 180);

        // Coordenadas para la manecilla de la hora
        const hour_X = this.posx + hour_length * Math.sin((hour_angle * Math.PI) / 180);
        const hour_Y = this.posy - hour_length * Math.cos((hour_angle * Math.PI) / 180);
    
        //console.log('Hour: x1:', this.posx, 'y1:', this.posy, 'x2:', hour_X, 'y2:', hour_Y);
        //console.log('Min: x1:', this.posx, 'y1:', this.posy, 'x2:', min_X, 'y2:', min_Y);
    
        this.hour_hand = this.scene.add.line(0, 0, this.posx, this.posy, hour_X, hour_Y, 0x000000).setOrigin(0);
        this.hour_hand.setLineWidth(5).setDepth(3);
        this.min_hand = this.scene.add.line(0, 0, this.posx, this.posy, min_X, min_Y, 0x0000ff).setOrigin(0);
        this.min_hand.setLineWidth(3);

        if (!this.visible) {
            this.hide(); 
        } 
    }
}