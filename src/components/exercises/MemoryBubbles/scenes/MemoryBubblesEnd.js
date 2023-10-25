// Phaser Library 
import Phaser from 'phaser'; 
import 'components/exercises/general_assets/styles.css';

// Custom Classes imported 
import SteroidObject from 'components/Factory/SteroidObject';
import FullScreenBttn from 'components/Factory/FullScreenBttn';

export default class MemoryBubblesEnd extends Phaser.Scene {
    constructor () {
        super({ key: 'MemoryBubblesEnd', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // log 
        this.tiempo_total = undefined; 
        this.tiempo_rondas = undefined; 
        this.number_errores = undefined; 
    }
    
    init (data) {
        this.tiempo_total = data.info.tiempo_total.substring(8); 
        this.numero_rondas = data.info.numero_rondas;
        this.tiempo_rondas = data.info.tiempo_rondas;
    }

    preload () {}

    create () {
        // Background ------------------------------------------------------------------------------------------------------------
        this.cameras.main.setBackgroundColor('#e0bc28');
        this.bg = this.add.sprite(400, 300, 'SeaImg').setDepth(-2);
        
        this.algae_der = new SteroidObject({scene: this, posx: -10, posy: 350, key: 'AlgaeRedImg'}).dance_function(-5, 5000); 
        this.algae_izq = new SteroidObject({scene: this, posx: 810, posy: 350, key: 'AlgaeGreenImg'}).dance_function(5, 5000);

        // Algae Base
        var change = -1 
        for (let i = 0; i < 20; i++) {
            new SteroidObject({ scene: this, posx: i*50, posy: 580, key: 'AlgaeImg'}).setScale(0.2).dance_function(change*15, 2000); 
            change = change*-1
        }

        // Panel Title ------------------------------------------------------------------------------------------------------------
        this.panel_guessing = this.add.graphics();
        this.panel_guessing.lineStyle(10, 0x3bb173);
        this.panel_guessing.strokeRect(100, 90, 600, 90);
        this.panel_guessing.fillStyle(0x000000, 1);
        this.panel_guessing.setAlpha(0.9)
        this.panel_guessing.fillRect(100, 90, 600, 90);

        this.title = this.add.text(200, 100, 'FIN DEL JUEGO', { fontFamily: 'TROUBLE', fill: '#ffffff'}).setFontSize(100); 
        // Figures
        this.panel_results = this.add.graphics();
        this.panel_results.fillStyle(0xffffff, 1);
        this.panel_results.lineStyle(10, 0x3bb173);
        this.panel_results.fillRoundedRect(100, 200, 600, 300, 20)
        this.panel_results.strokeRoundedRect(100, 200, 600, 300, 20)
        // Messages
        this.tiempo_total_msg = this.add.text(150, 250, 'tiempo total:', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_total_log = this.add.text(500, 250, this.tiempo_total, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_promedio_msg = this.add.text(150, 310, 'tiempo rondas:', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_promedio_log = this.add.text(500, 310, this.tiempo_rondas, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.numero_rondas_msg = this.add.text(150, 370, 'Numero de rondas: ', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.numero_rondas_log = this.add.text(500, 370, this.numero_rondas, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);

        // FullScreen button 
        new FullScreenBttn(this, 770, 30, 'FullscreenImg')

        // Event: Bubble Party!
        this.bubble_group = this.physics.add.group();

        this.timer = this.time.addEvent({
            delay: 500,
            callback: function() {
                var bubble = this.add.sprite(Math.random()*800, 650, 'BubbleImg').setScale(0.1)
                this.bubble_group.add(bubble)
                bubble.setDepth(-1);
                bubble.body.velocity.y = -100 - Math.random()*100;
            },
            callbackScope: this,
            loop: true
        });
    }

    update () {
        for (let i = 0; i < this.bubble_group.getChildren().length; i++) {
            if (this.bubble_group.getChildren()[i].y < -50) {
                this.bubble_group.getChildren()[i].destroy();
            }
        }
    }
}