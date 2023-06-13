// phaser library 
import Phaser from 'phaser'; 
import '../styles.css'; 

// assets imports 
import bg from 'components/exercises/LetraAventura/assets/images/bg_game.png';

// audio 
import win from 'components/exercises/LetraAventura/assets/music/win.mp3'; 

export default class LetrasOver extends Phaser.Scene {
    constructor() {
        super({ key: 'LetrasOver', backgroundColor: '#3f1651'})

        // dimensions 
        this.world_size_width = 800;
        this.world_size_height = 600;

        // panels 
        this.panel_results = undefined; 

        // text 
        this.title = undefined; 
        // log
        this.tiempo_total = undefined; 
        this.tiempo_rondas = undefined; 
        this.number_errores = undefined; 
    }

    init (data) {
        console.log(data)
    }

    preload () {
        // images
        this.load.image('bg', bg)

        // audio 
        this.load.audio('win', win)
    }

    create () {
        // bg 
        this.bg = this.add.image(400, 300, 'bg')

        // figures
        this.panel_results = this.add.graphics(); 
        this.panel_results.fillStyle(0xffffff, 1); 
        this.panel_results.fillRoundedRect(100, 100, 600, 400, 10)
        this.panel_results.setAlpha(0); 

        // -----------------------------------------------------
        this.aparecer(this.panel_results, this)
    }

    update () {
        if (flag) {
            this.stats_show(this, true)
            this.flag = false; 
        }
    }

    // custom functions 
    aparecer (obj, scene) {
        this.tweens.add({
            targets: obj, 
            alpha: 1, 
            duration: 1500, 
            ease: 'Power 2', 
            onComplete: function () {
                scene.flag = true; 
            }
        });
    }
}