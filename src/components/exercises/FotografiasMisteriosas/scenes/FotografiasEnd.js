// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css';

// ---------------------------- CUSTOMS IMPORTS ----------------------------
// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

// -----------------------------------------------------------------
export default class FotografiasEnd extends Phaser.Scene {
    constructor() {
        super({ key: 'FotografiasEnd', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeight = 600;
    }

    init (data) {
        this.tiempo_total = data.info.tiempo_total.text; 
        this.tiempo_total = this.tiempo_total.replace('TIEMPO: ', '');

        // Convertir tiempo_total a segundos
        let tiempoTotalArray = this.tiempo_total.split(':');
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
        this.number_errores = parseInt(data.info.errores)*-1;
        if (this.number_errores === -1) {
            this.number_errores += 1; 
        }

        this.number_objects = parseInt(data.info.number_objects);
        this.number_levels = parseInt(data.info.number_levels);

        console.log('***** AQUI ***** Se esta guardando: ', this.tiempo_rondas, this.number_errores, this.tiempo_total_en_segundos, this.number_errores, this.number_objects, this.number_levels);

        this.sending_data ();
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
        if (this.number_objects === undefined || this.number_objects === null || isNaN(this.number_objects)) {
            this.number_objects = 0;
            deliver_flag = false;
        }
        if (this.number_levels === undefined || this.number_levels === null || isNaN(this.number_levels)) {
            this.number_levels = 0;
            deliver_flag = false;
        }

        if (deliver_flag) {
            this.emitDataToReactComponent({
                tiempo_rondas: this.tiempo_rondas, 
                errores: this.number_errores,
                tiempo_total: this.tiempo_total_en_segundos,
                number_objects: this.number_objects, 
                number_levels: this.number_levels
            });   
        } else {
            console.log('No se guarda el Log debido a errores durante la partida - Juego sin configurar reproducido')
        }
    }

    preload() {
    }

    create() {
        this.game = this.sys.game;

        // bg_image
        this.bg = this.add.sprite(400, 300, 'BgRed');

        // vars
        this.flag = false;

        // 
        this.panel_stats = this.add.graphics(); 
        this.panel_stats.fillStyle(0xffffff, 1);
        this.panel_stats.fillRoundedRect(100, 90, 600, 410, 20);
        this.panel_stats.setAlpha(1); 

        // title 
        this.title = this.add.text(200, 100, 'FIN DEL JUEGO' , { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(100);

        // msg 
        this.tiempo_total_msg = this.add.text(150, 200, 'Tiempo total:', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_total_log = this.add.text(500, 200, this.tiempo_total, { fontFamily: 'TROUBLE', fill: '#1A2E44' }).setFontSize(50);
        this.tiempo_promedio_msg = this.add.text(150, 260, 'Tiempo promedio:', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_promedio_log = this.add.text(500, 260, this.tiempo_rondas, { fontFamily: 'TROUBLE', fill: '#1A2E44' }).setFontSize(50);
        this.number_objects_msg = this.add.text(150, 320, 'Numero de Objetos: ', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.number_objects_log = this.add.text(500, 320, this.number_objects, { fontFamily: 'TROUBLE', fill: '#1A2E44' }).setFontSize(50);
        this.number_levels_msg = this.add.text(150, 380, 'Numero de niveles: ', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.number_levels_log = this.add.text(500, 380, this.number_levels, { fontFamily: 'TROUBLE', fill: '#1A2E44' }).setFontSize(50);
        this.number_errores_msg = this.add.text(150, 440, 'Numero de errores: ', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.number_errores_log = this.add.text(500, 440, this.number_errores, { fontFamily: 'TROUBLE', fill: '#1A2E44' }).setFontSize(50);
        
        // Rollo Img 
        this.rollo_down = this.add.tileSprite(400, 560, 3000, 269, 'RolloImg').setScale(0.3).setScrollFactor(0);
        this.rollo_up = this.add.tileSprite(400, 40, 3000, 269, 'RolloImg').setScale(0.3).setScrollFactor(0);
    
        // fullscreen
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    }

    update() {
        this.rollo_down.tilePositionX += 0.5;
        this.rollo_up.tilePositionX -= 0.5;
    }

    // Customs functions

    emitDataToReactComponent(dataToSend) {
        if (this.game) {
            // Emitir un evento personalizado
            this.game.events.emit('dataToReactComponent', dataToSend);
        } else {
            console.error('this.game no es válido. Asegúrate de que el juego esté configurado correctamente.');
        }
    }
}
