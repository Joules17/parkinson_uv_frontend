// Phaser Library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css';

// Custom Classes imported
import FullScreenBttn from 'components/Factory/FullScreenBttn';

export default class TeEnd extends Phaser.Scene {
    constructor() {
        super({ key: 'TeEnd', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;
    }

    init(data) {
        this.tiempo_total = data.info.tiempo_total.text.replace('TIEMPO: ', '');;
        // Convertir tiempo_total a segundos
        let tiempoTotalArray = this.tiempo_total.split(':');
        console.log(tiempoTotalArray[0], 'QUE ES ESTO')
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
        // Background ------------------------------------------------------------------------------------------------------------
        this.cameras.main.setBackgroundColor('#e0bc28');
        this.bg = this.add.sprite(400, 300, 'ClockBgImg').setDepth(-2);

        // Clock 
        this.panel_circle = this.add.graphics();
        this.panel_circle.fillStyle(0xd2cfe2, 1);
        this.panel_circle.fillCircle(790, 300, 280);

        // Clock
        this.clock_shape = this.add.sprite(790, 300, 'ClockShapeImg').setScale(0.22);

        // hand 
        this.hand = this.add.graphics();
        this.hand.lineStyle(10000, 0xff0000); 

        // center dot 
        this.center_dot = this.add.graphics();
        this.center_dot.fillStyle(0x000000, 1);
        this.center_dot.fillCircle(790, 300, 10);

        // Panel Title ------------------------------------------------------------------------------------------------------------
        this.panel_guessing = this.add.graphics();
        this.panel_guessing.lineStyle(10, 0x3bb173);
        this.panel_guessing.strokeRect(100, 90, 600, 90);
        this.panel_guessing.fillStyle(0x000000, 1);
        this.panel_guessing.setAlpha(0.9);
        this.panel_guessing.fillRect(100, 90, 600, 90);

        this.title = this.add.text(200, 100, 'FIN DEL JUEGO', { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(100);
        // Figures
        this.panel_results = this.add.graphics();
        this.panel_results.fillStyle(0xffffff, 1);
        this.panel_results.lineStyle(10, 0x3bb173);
        this.panel_results.fillRoundedRect(100, 200, 600, 320, 20);
        this.panel_results.strokeRoundedRect(100, 200, 600, 320, 20);
        // Messages
        this.tiempo_total_msg = this.add.text(150, 250, 'tiempo total:', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_total_log = this.add.text(500, 250, this.tiempo_total, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_promedio_msg = this.add.text(150, 310, 'tiempo rondas:', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_promedio_log = this.add.text(500, 310, this.tiempo_rondas, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.numero_rondas_msg = this.add.text(150, 370, 'Numero de rondas: ', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.numero_rondas_log = this.add.text(500, 370, this.number_rondas, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.numero_errores_msg = this.add.text(150, 430, 'Numero de errores: ', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.numero_errores_log = this.add.text(500, 430, this.number_errores, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        
        // FullScreen button
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        this.time.addEvent({
            delay: 1000,
            callback: this.rotateHand,
            callbackScope: this,
            loop: true,
        });
    }

    update() {
        
    }

    rotateHand() {
        const currentTime = this.time.now * 0.0001;
        const angle = currentTime * (Math.PI * 2 / 6); 

        this.hand.clear();
        
        this.updateHand(angle);
    }

    updateHand(angle) {
        console.log('HOLA')
        this.hand.lineBetween(790, 300, 790 - Math.cos(angle) * 250, 300 - Math.sin(angle) * 250);
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
