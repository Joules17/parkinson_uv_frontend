// phaser library
import Phaser from 'phaser';

// styles
import 'components/exercises/general_assets/styles.css'

// custom classes imported: 
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class ArticOver extends Phaser.Scene {
    constructor () {
        super({key: 'ArticOver', backgroundColor: '#3f1651'});
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;
    }

    init (data) {
        console.log(data)
        this.emitDataToReactComponent(data)
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

    preload() {}

    create() {
        this.game = this.sys.game
        // Background
        this.bg = this.add.image(400, 300, 'BgNightSky');

        // Emitter
        this.emiter = this.add.particles(0, -10, 'SnowImg', {
            x: {min: 0, max: 800},
            quantity: 2, 
            lifespan: 2500, 
            gravityY: 200, 
            scale: { start: 0.01, end: 0.005 },
        }); 

        // Messages
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

        // FullScreen bttn 
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

    }

    emitDataToReactComponent(dataToSend) {
        if (this.game) {
            // Emitir un evento personalizado
            this.game.events.emit('dataToReactComponent', dataToSend);
        } else {
            console.error('this.game no es válido. Asegúrate de que el juego esté configurado correctamente.');
        }
    }
}