// phaser
import Phaser from 'phaser';

// Figure: Letter
export default class extends Phaser.GameObjects.Container {
    constructor (config) {
        super(config.scene);
        this.posx= config.posx;
        this.posy= config.posy;
        this.real_posx = 80 + this.posx * 90
        this.real_posy = 80 + this.posy * 90
        this.letra= config.letra;
        this.visible= config.visible;

        // create Letter
        this.figure = this.scene.add.text(this.real_posx, this.real_posy, this.letra, { fontFamily: 'TROUBLE', fontSize: 40, color: '#000000' }).setOrigin(0.5).setVisible(this.visible);
        // Base - bubble
        this.bubble_sprite = this.scene.add.sprite(this.real_posx, this.real_posy, 'BubbleImg').setScale(0.135).setAlpha(0.9)

        this.check_bubble_color();
    }

    set_letter (letra) {
        this.letra = letra;
        this.figure.setText(this.letra);
        this.check_bubble_color();
    }

    get_letter () {
        return this.letra;
    }

    check_bubble_color () {
        if (this.posy == 2) {
            this.bubble_sprite.setTexture('BubbleRedImg')
            this.figure.setColor('#00008B')
        } else {
            this.bubble_sprite.setTexture('BubbleImg')
            this.figure.setColor('#000000')
        }
    }

    set_visible (bool) {
        this.visible = bool;
        this.figure.setVisible(this.visible);
        this.bubble_sprite.setVisible(this.visible);
    }

    hide () {
        this.set_visible(false); 
    }

    show () {
        this.set_visible(true);
    }
}