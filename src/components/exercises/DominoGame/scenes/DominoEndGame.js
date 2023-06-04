// phaser library
import Phaser from 'phaser';
import '../styles.css';

// assets imports
import bg from 'components/exercises/DominoGame/assets/images/bg_bricks.jpg';
import up_curtain from 'components/exercises/DominoGame/assets/images/up_curtain.png';

// sounds 
// import sounds here 


export default class DominoEndGame extends Phaser.Scene {
    constructor () {
        super({ key: 'DominoEndGame' , backgroundColor: '#3f1651' });

        // dimensions 
        this.world_size_width = 800;
        this.world_size_height = 600;

        // panels 
        this.panel_results = undefined;

        // text 
        this.title = undefined;
        this.explanation = undefined; 
        this.tiempo_total_text = undefined;

        // vars 
        this.tiempo_total = undefined; 
        this.tiempo_rondas = undefined; 
        this.number_errores = undefined; 
        
    }

    init (data) {
        console.log(data)
        this.tiempo_total = data.info.tiempo_total
        let arreglo = data.info.tiempo_rondas;
        let sum = 0; 
        for (let i = 0; i < arreglo.length; i++) {
            sum = sum + arreglo[i];
        }
        let promedio = sum / arreglo.length;
        this.tiempo_rondas = promedio.toString();
        this.number_errores = data.info.errores.toString();
        this.num_rondas = data.info.number_rondas.toString(); 
    }

    preload () {
        // images 
        this.load.image('bg', bg);
        this.load.image('up_curtain', up_curtain);

    }

    create () {
        // bg 
        this.bg = this.add.image(400, 300, 'bg').setScale(0.8); 

        // panels / figures
        // figures
        this.up_curtain = this.add.image(400, 40, 'up_curtain').setScale(1.16);

        // panels
        this.panel_results = this.add.graphics(); 
        this.panel_results.fillStyle(0x032670, 1);
        this.panel_results.lineStyle(2, 0xffffff);
        this.panel_results.fillRoundedRect(100, 100, 600, 470, 5);
        this.panel_results.strokeRoundedRect(100, 100, 600, 470, 5);

        // text 
        this.title = this.add.text(300, 120, '¡Felicidades!', { fontFamily: 'Atarian', fontSize: 50, color: '#ffffff' });
        this.explanation = this.add.text(290, 180, ' --- RESULTADOS --- ', { fontFamily: 'Atarian', fontSize: 30, color: '#ffffff' });
        this.tiempo_total_text = this.add.text(330, 230, 'TIEMPO TOTAL', { fontFamily: 'Atarian', fontSize: 30, color: '#ffffff' });
        this.tiempo_total_text= this.add.text(310, 260, this.tiempo_total, { fontFamily: 'Atarian', fontSize: 30, color: '#ffffff' });
        this.tiempo_por_ronda = this.add.text(260, 310, 'TIEMPO PROMEDIO POR RONDA', { fontFamily: 'Atarian', fontSize: 30, color: '#ffffff' });
        this.tiempo_por_ronda = this.add.text(390, 340, this.tiempo_rondas, { fontFamily: 'Atarian', fontSize: 30, color: '#ffffff' })
        this.errores = this.add.text(350, 390, 'ERRORES', { fontFamily: 'Atarian', fontSize: 30, color: '#ffffff' });
        this.errores = this.add.text(390, 420, this.number_errores, { fontFamily: 'Atarian', fontSize: 30, color: '#ffffff' })
        this.number_rondas = this.add.text(300, 470, 'NUMERO DE RONDAS', { fontFamily: 'Atarian', fontSize: 30, color: '#ffffff' });
        this.number_rondas = this.add.text(390, 500, this.num_rondas, { fontFamily: 'Atarian', fontSize: 30, color: '#ffffff' })
    }
}