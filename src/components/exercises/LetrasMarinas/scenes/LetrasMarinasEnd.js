// Phaser Library
import Phaser from 'phaser';

// Styles
import 'components/exercises/general_assets/styles.css';

// Custom Classes Imported
import FullScreenBttn from 'components/Factory/FullScreenBttn';
import SteroidObject from 'components/Factory/SteroidObject';

export default class LetrasMarinasEnd extends Phaser.Scene {
    constructor() {
        super({ key: 'LetrasMarinasEnd', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // Panels
        this.tiempo_total = undefined;
        this.tiempo_rondas = undefined;
        this.number_errores = undefined;
    }

    init(data) {
        this.tiempo_total = data.info.tiempo_total.text.replace('Tiempo: ', '');
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
        this.number_rondas = parseInt(data.info.rondas);

        console.log('Se esta guardando: ', this.tiempo_rondas, this.tiempo_total_en_segundos, this.number_rondas);

        this.emitDataToReactComponent({
            tiempo_rondas: this.tiempo_rondas,
            errores: this.number_errores,
            tiempo_total: this.tiempo_total_en_segundos,
            number_rondas: this.number_rondas
        });
    }

    preload() {
        this.game = this.sys.game;
        // Background
        this.bg = this.add.image(400, 300, 'SeaImg').setDepth(-2);
        var change = -1;
        for (let i = 0; i < 20; i++) {
            new SteroidObject({ scene: this, posx: i * 50, posy: 580, key: 'AlgaeImg' }).setScale(0.2).dance_function(change * 15, 2000);
            change = change * -1;
        }

        this.coral_der = this.add.sprite(800, 400, 'CoralImg');
        this.coral_izq = this.add.sprite(50, 500, 'CoralOrange');

        // Panel Title
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
        this.panel_results.fillRoundedRect(100, 200, 600, 300, 20);
        this.panel_results.strokeRoundedRect(100, 200, 600, 300, 20);
        // Messages
        this.tiempo_total_msg = this.add.text(150, 250, 'tiempo total:', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_total_log = this.add.text(500, 250, this.tiempo_total, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_promedio_msg = this.add.text(150, 310, 'tiempo por nivel:', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_promedio_log = this.add.text(500, 310, this.tiempo_rondas, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.numero_rondas_msg = this.add.text(150, 370, 'Numero de rondas: ', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.numero_rondas_log = this.add.text(500, 370, this.number_rondas, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);

        // FullScreen button
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        // Event: Bubble Party!
        this.bubble_group = this.physics.add.group();

        this.timer = this.time.addEvent({
            delay: 500,
            callback: function () {
                var bubble = this.add.sprite(Math.random() * 800, 650, 'BubbleImg').setScale(0.1);
                this.bubble_group.add(bubble);
                bubble.setDepth(-1);
                bubble.body.velocity.y = -100 - Math.random() * 100;
            },
            callbackScope: this,
            loop: true
        });
    }

    update() {
        for (let i = 0; i < this.bubble_group.getChildren().length; i++) {
            if (this.bubble_group.getChildren()[i].y < -50) {
                this.bubble_group.getChildren()[i].destroy();
            }
        }
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
