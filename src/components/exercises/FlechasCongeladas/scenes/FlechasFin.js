// Phaser
import Phaser from 'phaser';

// styles
import 'components/exercises/general_assets/styles.css';

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class FlechasFin extends Phaser.Scene {
    constructor() {
        super({ key: 'FlechasFin', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;
    }

    init(data) {
        this.tiempo_total = data.info.tiempo_total.text;
        // Convertir tiempo_total a segundos
        let tiempoTotalArray = this.tiempo_total.split(' : ');
        let segundos = parseInt(tiempoTotalArray[0]) * 60 + parseInt(tiempoTotalArray[1]);
        this.tiempo_total_en_segundos = segundos;

        let arreglo = data.info.tiempo_rondas;
        let sum = 0;
        for (const elemento of arreglo) {
            sum = sum + elemento;
        }
        let promedio = sum / arreglo.length;
        this.tiempo_rondas = promedio;

        // Convertir a números
        this.number_errores = parseInt(data.info.errores);
        this.number_rondas = parseInt(data.info.rondas);

        console.log('Se esta guardando: ', this.tiempo_rondas, this.number_errores, this.tiempo_total_en_segundos, this.number_rondas);

        this.sending_data(); 
    }

    sending_data () {
        // cleaning data
        let deliver_flag = true; 
        if (this.tiempo_rondas === undefined || this.tiempo_rondas === null || isNaN(this.tiempo_rondas)) {
            this.tiempo_rondas = 0;
            deliver_flag = false; 
        }
        if (this.number_errores === undefined || this.number_errores === null || isNaN(this.number_errores)) {
            this.number_errores = 0;
            deliver_flag = false;
        }
        if (this.tiempo_total_en_segundos === undefined || this.tiempo_total_en_segundos === null || isNaN(this.tiempo_total_en_segundos)) {
            this.tiempo_total_en_segundos = 0;
            deliver_flag = false; 
        }
        if (this.number_rondas === undefined || this.number_rondas === null || isNaN(this.number_rondas)) {
            this.number_rondas = 0;
            deliver_flag = false; 
        }

        // sending data
        if (deliver_flag) {
            this.emitDataToReactComponent({
                tiempo_rondas: this.tiempo_rondas,
                errores: this.number_errores,
                tiempo_total: this.tiempo_total_en_segundos,
                number_rondas: this.number_rondas
            });
        } else {
            console.log('No se guarda Log debido a errores durante la partida - Juego sin configurar reproducido ')
        }  
    }
    preload() {}

    create() {
        this.game = this.sys.game;
        // Background
        this.bg = this.add.image(400, 300, 'BgNightSkySnow');

        // Emitter
        this.emiter = this.add.particles(0, -10, 'SnowImg', {
            x: { min: 0, max: 800 },
            quantity: 2,
            lifespan: 2500,
            gravityY: 200,
            scale: { start: 0.01, end: 0.001 }
        });

        // Messages
        this.title = this.add.text(200, 100, 'FIN DEL JUEGO', { fontFamily: 'TROUBLE', fontSize: 100, color: '#ffffff' });

        this.panelStats = this.add.graphics();
        this.panelStats.fillStyle(0xffffff, 1);
        this.panelStats.fillRoundedRect(100, 200, 600, 320, 20);

        this.tiempo_total_msg = this.add.text(150, 250, 'tiempo total:', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_total_log = this.add.text(500, 250, this.tiempo_total, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_promedio_msg = this.add.text(150, 310, 'tiempo promedio:', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_promedio_log = this.add.text(500, 310, this.tiempo_rondas, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.number_errores_msg = this.add
            .text(150, 370, 'Numero de errores: ', { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(50);
        this.number_errores_log = this.add.text(500, 370, this.number_errores, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.number_rondas_msg = this.add.text(150, 430, 'Numero de rondas: ', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.number_rondas_log = this.add.text(500, 430, this.number_rondas, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
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
