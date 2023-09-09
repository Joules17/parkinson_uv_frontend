// phaser library
import Phaser from 'phaser';
import '../styles.css'

// custom classes imported: 
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// assets import
import nightsky from 'components/exercises/ArticRows/assets/img/sky.jpg';
import snowflake from 'components/exercises/ArticRows/assets/img/snowflake.png'
import fullscreen from '../assets/img/fullscreen.png';

export default class ArticOver extends Phaser.Scene {
    constructor () {
        super({key: 'ArticOver', backgroundColor: '#3f1651'});
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // mensajes
        this.title = undefined; 
        this.tiempo_total_msg = undefined; 
        this.tiempo_total_log = undefined;
        this.tiempo_promedio_msg = undefined;
        this.tiempo_promedio_log = undefined;
        this.number_errores_msg = undefined;
        this.number_errores_log = undefined; 
    }

    init (data) {
        console.log(data)
        this.tiempo_total = data.info.tiempo_total.text; 
        let arreglo = data.info.tiempo_rondas;
        let sum = 0;
        for (const elemento of arreglo) {
            sum = sum + elemento;
        }
        let promedio = sum / arreglo.length;
        this.tiempo_rondas = promedio.toFixed(2).toString();
        this.number_errores = data.info.errores.toString();
    }

    preload() {
        this.load.image('nightsky', nightsky);
        this.load.image('snowflake', snowflake);
        this.load.image('fullscreenImg', fullscreen);
    }

    create() {
        console.log('nueva escena')
        // bg image
        this.bg = this.add.image(400, 300, 'sky');

        // -------------------------
        // emiter
        this.emiter = this.add.particles(0, -10, 'snowflake', {
            x: {min: 0, max: 800},
            quantity: 2, 
            lifespan: 2500, 
            gravityY: 200, 
            scale: { start: 0.01, end: 0.005 },
        }); 

        // messages
        this.title = this.add.text(200, 100, "FIN DEL JUEGO", {fontFamily: 'TROUBLE', fontSize: 100, color: '#ffffff'}); 

        this.panelStats = this.add.graphics(); 
        this.panelStats.fillStyle(0xffffff, 1);
        this.panelStats.fillRoundedRect(100, 200, 600, 300, 20); 
        
        this.tiempo_total_msg = this.add.text(150, 250, "tiempo total:", { fontFamily : 'TROUBLE', fill: '#000000'}).setFontSize(50)
        this.tiempo_total_log = this.add.text(500, 250, this.tiempo_total, { fontFamily : 'TROUBLE', fill: '#000000'}).setFontSize(50)
        this.tiempo_promedio_msg = this.add.text(150, 310, "tiempo promedio:", { fontFamily : 'TROUBLE', fill: '#000000'}).setFontSize(50)
        this.tiempo_promedio_log = this.add.text(500, 310, this.tiempo_rondas, { fontFamily : 'TROUBLE', fill: '#000000'}).setFontSize(50)
        this.number_errores_msg = this.add.text(150, 370, "Numero de errores: ", { fontFamily : 'TROUBLE', fill: '#000000'}).setFontSize(50)
        this.number_errores_log = this.add.text(500, 370, this.number_errores, { fontFamily : 'TROUBLE', fill: '#000000'}).setFontSize(50)

        // fullScreenButton
        new FullScreenBttn(this, 770, 30, 'fullscreenImg');

    }

    
}