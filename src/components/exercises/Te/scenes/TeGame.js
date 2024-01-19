// phaser library
import Phaser from 'phaser';

// styles
import 'components/exercises/general_assets/styles.css'

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import Clock from 'components/exercises/Te/sprites/Clock.js';

export default class TeGame extends Phaser.Scene {
    constructor() {
        super({ key: 'TeGame', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // vars
        this.pressed = false;

    }

    preload() { }

    create() {
        this.game = this.sys.game
        // Background --------------------------------------------------
        this.add.sprite(400, 300, 'TeGameBgImg');

        // panel_circle
        this.panel_circle = this.add.graphics();
        this.panel_circle.fillStyle(0xd2cfe2, 1);
        this.panel_circle.fillCircle(590, 337, 210);

        // Clock
        this.clock_shape = this.add.sprite(590, 337, 'ClockShapeImg').setScale(0.165);

        // center dot
        this.center_dot = this.add.graphics();
        this.center_dot.fillStyle(0x000000, 1);
        this.center_dot.fillCircle(590, 337, 10);

        // Panels
        this.panel_rounds = this.add.graphics();
        this.panel_rounds.fillStyle(0xffffff, 0.5);
        this.panel_rounds.fillRect(10, 0, 200, 50);

        this.clocky = new Clock({
            scene: this,
            posx: 590,
            posy: 337,
            hour: 1,
            min: 0
        })

        this.clocky.update_hands();

        // Fullscreen
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    }


    update() {
    }
}