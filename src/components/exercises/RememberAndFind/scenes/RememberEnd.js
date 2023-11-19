// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css';

// custom classes
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class RememberEnd extends Phaser.Scene {
    constructor() {
        super({ key: 'RememberEnd', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // paneles
        this.panelStats = undefined;

        // figuras
        this.waveOffset = undefined;
        this.olas = undefined;

        // variables
        this.pressed = false;

        // grupos
        this.frutas_lluviosas = undefined;
        // skins
        this.skins = ['coco', 'mango', 'banana', 'manzana'];
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
        this.bg = this.add.sprite(400, 300, 'BgSkye').setDepth(-2);

        // Flag variable   ------------------------------------------------------------------------------------------------------------
        this.flag = false;

        // Figuras de fondo ------------------------------------------------------------------------------------------------------------
        this.bushes_sprite = this.add.sprite(100, 500, 'FirstBush').setScale(0.12);
        this.bushes_sprite2 = this.add.sprite(600, 500, 'SecondBush').setScale(0.12);
        // ---------------------

        this.panelStats = this.add.graphics();
        this.panelStats.fillStyle(0xffffff, 1);
        this.panelStats.fillRoundedRect(100, 200, 600, 320, 20); // x, y, ancho, alto, radio de curvatura
        this.panelStats.setAlpha(0);

        this.title = this.add.text(200, 100, 'FIN DEL JUEGO', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(100);

        this.panelStats = this.add.graphics();
        this.panelStats.fillStyle(0xffffff, 1);
        this.panelStats.fillRoundedRect(100, 200, 600, 300, 20); // x, y, ancho, alto, radio de curvatura
        this.panelStats.setAlpha(0);

        // Mensajes
        this.tiempo_total_msg = this.add.text(150, 250, 'tiempo total:', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_total_log = this.add.text(500, 250, this.tiempo_total, { fontFamily: 'TROUBLE', fill: '#1A2E44' }).setFontSize(50);
        this.tiempo_promedio_msg = this.add.text(150, 310, 'tiempo promedio:', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_promedio_log = this.add.text(500, 310, this.tiempo_rondas, { fontFamily: 'TROUBLE', fill: '#1A2E44' }).setFontSize(50);
        this.number_errores_msg = this.add.text(150, 370, 'Numero de errores: ', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.number_errores_log = this.add.text(500, 370, this.number_errores, { fontFamily: 'TROUBLE', fill: '#1A2E44' }).setFontSize(50);
        this.number_rondas_msg = this.add.text(150, 430, 'Numero de rondas: ', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.number_rondas_log = this.add.text(500, 430, this.number_rondas, { fontFamily: 'TROUBLE', fill: '#1A2E44' }).setFontSize(50);

        this.statsShow(this, false);
        
        // fullScreenButton ---------------------------------------------------------------------------------------------------
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        // ---------------------
        this.aparecer(this.panelStats, this);

        // Frutas lluviosas ------------------------------------------------------------------------------------------------------------
        this.frutas_lluviosas = this.physics.add.group();

        // ------------------------------------------------------------------------------------------------------------
        // Eventos
        // caida de las frutas
        this.timer = this.time.addEvent({
            delay: 200,
            callback: function () {
                var randind = Math.floor(Math.random() * this.skins.length);
                var fruit = this.add.sprite(Math.random() * 800, -50, this.skins[randind]).setScale(0.1);
                this.frutas_lluviosas.add(fruit);
                fruit.setDepth(-1);
                fruit.body.velocity.y = 100 + Math.random() * 100;
            },
            callbackScope: this,
            loop: true
        });
    }

    update() {
        for (let i = 0; i < this.frutas_lluviosas.getChildren().length; i++) {
            if (this.frutas_lluviosas.getChildren()[i].y > 600) {
                this.frutas_lluviosas.getChildren()[i].destroy(true);
            }
        }
        if (this.flag) {
            this.statsShow(this, true);
            this.flag = false;
        }
    }

    // Customs functions
    aparecer(obj, scene) {
        this.tweens.add({
            targets: obj,
            alpha: 1,
            duration: 1500,
            ease: 'Power2',
            onComplete: function () {
                scene.flag = true;
            }
        });
    }

    statsShow(scene, value) {
        scene.tiempo_total_msg.setVisible(value);
        scene.tiempo_total_log.setVisible(value);
        scene.tiempo_promedio_msg.setVisible(value);
        scene.tiempo_promedio_log.setVisible(value);
        scene.number_errores_msg.setVisible(value);
        scene.number_errores_log.setVisible(value);
        scene.number_rondas_msg.setVisible(value);
        scene.number_rondas_log.setVisible(value);
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
