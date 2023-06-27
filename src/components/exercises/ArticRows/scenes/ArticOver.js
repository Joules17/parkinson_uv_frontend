// phaser library
import Phaser from 'phaser';
import '../styles.css'

// assets import
import nightsky from 'components/exercises/ArticRows/assets/img/sky.jpg';
import snowflake from 'components/exercises/ArticRows/assets/img/snowflake.png'

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
        this.tiempo_total = data.info.tiempo_total;
        let arreglo = data.info.tiempo_rondas;
        let sum = 0;
        for (let i = 0; i < arreglo.length; i++) {
            sum = sum + arreglo[i];
        }
        let promedio = sum / arreglo.length;
        this.tiempo_rondas = promedio.toString();
        this.number_errores = data.info.errores.toString();
    }

    preload() {
        this.load.image('nightsky', nightsky);
        this.load.image('snowflake', snowflake);
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
        this.title = this.add.text(220, 40, "FIN DEL JUEGO", {fontFamily: 'kongtext', fontSize: 30, color: '#ffffff'}); 

        this.tiempo_total_msg = this.add.text(100, 150, "tiempo total:", { fontFamily : 'kongtext', fill: '#ffffff'}).setFontSize(15)
        this.tiempo_total_log = this.add.text(400, 150, this.tiempo_total, { fontFamily : 'kongtext', fill: '#ffffff'}).setFontSize(15)
        this.tiempo_promedio_msg = this.add.text(100, 300, "tiempo promedio:", { fontFamily : 'kongtext', fill: '#ffffff'}).setFontSize(15)
        this.tiempo_promedio_log = this.add.text(400, 300, this.tiempo_rondas, { fontFamily : 'kongtext', fill: '#ffffff'}).setFontSize(15)
        this.number_errores_msg = this.add.text(100, 450, "Numero de errores: ", { fontFamily : 'kongtext', fill: '#ffffff'}).setFontSize(15)
        this.number_errores_log = this.add.text(400, 450, this.number_errores, { fontFamily : 'kongtext', fill: '#ffffff'}).setFontSize(15)

        // -------------------------

    }

    
}