// phaser library 
import Phaser from 'phaser'; 
import '../styles.css'; 

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// assets imports 
import bg from 'components/exercises/LetraAventura/assets/images/bg_game.png';
import fullscreen from '../assets/images/fullscreen.png';

// audio 
import win from 'components/exercises/LetraAventura/assets/music/win.mp3'; 

export default class LetrasOver extends Phaser.Scene {
    constructor() {
        super({ key: 'LetrasOver', backgroundColor: '#3f1651'})

        // dimensions 
        this.world_size_width = 800;
        this.world_size_height = 600;

        // var
        this.flag = false; 
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
        this.tiempo_total = data.info.tiempo_total.text; 
        let arreglo = data.info.tiempo_rondas; 
        let sum = 0; 
        for (let i = 0; i < arreglo.length; i++) {
            sum = sum + arreglo[i]; 
        }
        let promedio = sum / arreglo.length; 
        this.tiempo_rondas = promedio.toString(); 
        this.number_errores = data.info.errores.toString();
    }

    preload () {
        // images
        this.load.image('bg', bg); 
        this.load.image('fullscreenImg', fullscreen);

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

        // msg
        this.tiempo_total_msg = this.add.text(150, 200, 'tiempo total:', { fontFamily: 'ComicSans', fill: '#000000' }).setFontSize(35);
        this.tiempo_total_log = this.add.text(500, 200, this.tiempo_total, { fontFamily: 'ComicSans', fill: '#000000' }).setFontSize(35);
        this.tiempo_promedio_msg = this.add.text(150, 300, 'tiempo promedio:',{ fontFamily: 'ComicSans', fill: '#000000' }).setFontSize(35);
        this.tiempo_promedio_log = this.add.text(500, 300, this.tiempo_rondas,{ fontFamily: 'ComicSans', fill: '#000000' }).setFontSize(35);
        this.number_errores_msg = this.add.text(150, 400, 'Numero de errores: ', { fontFamily: 'ComicSans', fill: '#000000' }).setFontSize(35);
        this.number_errores_log = this.add.text(500, 400, this.number_errores, { fontFamily: 'ComicSans', fill: '#000000' }).setFontSize(35);
        this.statsShow(this, false);
        // -----------------------------------------------------
        this.aparecer(this.panel_results, this)
        
        // fullScreenButton
        new FullScreenBttn(this, 770, 30, 'fullscreenImg');
    }

    update () {
        if (this.flag) {
            this.statsShow(this, true)
            this.flag = false; 
        }
    }

    // custom functions 

    statsShow(scene, value) {
        scene.tiempo_total_msg.setVisible(value);
        scene.tiempo_total_log.setVisible(value);
        scene.tiempo_promedio_msg.setVisible(value);
        scene.tiempo_promedio_log.setVisible(value);
        scene.number_errores_msg.setVisible(value);
        scene.number_errores_log.setVisible(value);
    }

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