// phaser library
import Phaser from 'phaser';

// styles 
import 'components/exercises/general_assets/styles.css';

// custom classes imported
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import SteroidObject from 'components/Factory/SteroidObject.js';

export default class LettersEndGame extends Phaser.Scene {
    constructor () {
        super({ key: 'LettersEndGame' , backgroundColor: '#3f1651' });

        // dimensions 
        this.world_size_width = 800;
        this.world_size_height = 600;

        // vars 
        this.tiempo_total = undefined; 
        this.tiempo_rondas = undefined; 
        this.number_errores = undefined; 
        
    }

    init (data) {
        this.tiempo_total = data.info.tiempo_total.text
        let arreglo = data.info.tiempo_rondas;
        let sum = 0; 
        for (let i = 0; i < arreglo.length; i++) {
            sum = sum + arreglo[i];
        }
        let promedio = sum / arreglo.length;
        this.tiempo_rondas = promedio.toFixed(2).toString();
        this.number_errores = data.info.errores.toString();
        this.num_rondas = data.info.number_rondas.toString(); 
    }

    preload () {}

    create () {
        // Background ------------------------------------------------ 
        this.bg = this.add.image(400, 300, 'BgForest'); 

        // Panels / Figures ------------------------------------------

        this.pino_der = new SteroidObject({ scene: this, posx: 830, posy: 300, key: 'TreeImg'}); 
        this.pino_izq = new SteroidObject({ scene: this, posx: -30, posy: 300, key: 'TreeImg'}); 

        this.pino_der.setScale(0.4); 
        this.pino_izq.setScale(0.4).setFlipX(true); 

        this.pino_der.dance_function(3, 2000); 
        this.pino_izq.dance_function(-3, 2000); 
        // Panels
        this.panel_results = this.add.graphics(); 
        this.panel_results.fillStyle(0xffffff, 1);
        this.panel_results.lineStyle(5, 0x000000);
        this.panel_results.fillRect(150, 250, 500, 250);
        this.panel_results.strokeRect(150, 250, 500, 250);

        // text 
        this.panel_title = this.add.graphics(); 
        this.panel_title.fillStyle(0x000000, 1);
        this.panel_title.fillRect(150, 110, 500, 100);
        this.title = this.add.text(200, 120, 'FIN DEL JUEGO', { fontFamily: 'Trouble', fontSize: 100, color: '#eb3724' });
        this.explanation = this.add.text(180, 260, 'RESULTADOS:  ', { fontFamily: 'Trouble', fontSize: 40, color: '#000000' });
        this.tiempo_total_text = this.add.text(180, 300, 'TIEMPO TOTAL: ', { fontFamily: 'Trouble', fontSize: 40, color: '#000000' });
        this.tiempo_total_text= this.add.text(570, 300, this.tiempo_total.substring(7), { fontFamily: 'Trouble', fontSize: 40, color: '#000000' });
        this.tiempo_por_ronda = this.add.text(180, 340, 'TIEMPO PROMEDIO POR RONDA:', { fontFamily: 'Trouble', fontSize: 40, color: '#000000' });
        this.tiempo_por_ronda = this.add.text(580, 340, this.tiempo_rondas, { fontFamily: 'Trouble', fontSize: 40, color: '#000000' })
        this.errores = this.add.text(180, 380, 'ERRORES:', { fontFamily: 'Trouble', fontSize: 40, color: '#000000' });
        this.errores = this.add.text(580, 380, this.number_errores, { fontFamily: 'Trouble', fontSize: 40, color: '#000000' })
        this.number_rondas = this.add.text(180, 420, 'NUMERO DE RONDAS:', { fontFamily: 'Trouble', fontSize: 40, color: '#000000' });
        this.number_rondas = this.add.text(580, 420, this.num_rondas, { fontFamily: 'Trouble', fontSize: 40, color: '#000000' })
        
        // fullScreenButton
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    }
}