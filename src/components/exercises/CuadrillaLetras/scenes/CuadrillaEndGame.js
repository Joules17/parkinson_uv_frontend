// phaser library
import Phaser from 'phaser';

// styles
import 'components/exercises/general_assets/styles.css';

// custom classes imported
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import SteroidObject from 'components/Factory/SteroidObject.js';

export default class CuadrillaEndGame extends Phaser.Scene {
    constructor() {
        super({ key: 'CuadrillaEndGame', backgroundColor: '#3f1651' });

        // dimensions
        this.world_size_width = 800;
        this.world_size_height = 600;
    }

    init(data) {
        this.tiempo_total = data.info.tiempo_total.text.replace('TIEMPO: ', '');;
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
        // Background ------------------------------------------------
        this.movement_bg = this.add.tileSprite(400, 300, 800, 600, 'BgForest').setScrollFactor(0);

        // Panels / Figures ------------------------------------------

        this.pino_der = new SteroidObject({ scene: this, posx: 830, posy: 300, key: 'TreeImg' });
        this.pino_izq = new SteroidObject({ scene: this, posx: -30, posy: 300, key: 'TreeImg' });

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
        this.tiempo_total_text = this.add.text(570, 300, this.tiempo_total, {
            fontFamily: 'Trouble',
            fontSize: 40,
            color: '#000000'
        });
        this.tiempo_por_ronda = this.add.text(180, 340, 'TIEMPO PROMEDIO POR RONDA:', {
            fontFamily: 'Trouble',
            fontSize: 40,
            color: '#000000'
        });
        this.tiempo_por_ronda = this.add.text(580, 340, this.tiempo_rondas, { fontFamily: 'Trouble', fontSize: 40, color: '#000000' });
        this.errores = this.add.text(180, 380, 'ERRORES:', { fontFamily: 'Trouble', fontSize: 40, color: '#000000' });
        this.errores = this.add.text(580, 380, this.number_errores, { fontFamily: 'Trouble', fontSize: 40, color: '#000000' });
        this.number_rondas_msg = this.add.text(180, 420, 'NUMERO DE RONDAS:', { fontFamily: 'Trouble', fontSize: 40, color: '#000000' });
        this.number_rondas_log = this.add.text(580, 420, this.number_rondas, { fontFamily: 'Trouble', fontSize: 40, color: '#000000' });
        
        // fullScreenButton
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    }

    update () {
        this.movement_bg.tilePositionY -= 0.5;
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
