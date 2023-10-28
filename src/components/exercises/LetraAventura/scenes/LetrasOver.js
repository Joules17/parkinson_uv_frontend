// phaser library 
import Phaser from 'phaser'; 

// styles
import 'components/exercises/general_assets/styles.css'; 

// custom classes imported:
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';

export default class LetrasOver extends Phaser.Scene {
    constructor() {
        super({ key: 'LetrasOver', backgroundColor: '#3f1651'})

        // dimensions 
        this.world_size_width = 800;
        this.world_size_height = 600;
        // var
        this.flag = false; 
        // log
        this.tiempo_total = undefined;
        this.tiempo_rondas = undefined;
        this.number_errores = undefined;
    }

    init (data) {
        console.log(data)
        this.emitDataToReactComponent(data)
        this.tiempo_total = data.info.tiempo_total.text; 
        let arreglo = data.info.tiempo_rondas; 
        let sum = 0; 
        for (let i = 0; i < arreglo.length; i++) {
            sum = sum + arreglo[i]; 
        }
        let promedio = sum / arreglo.length; 
        this.tiempo_rondas = promedio.toFixed(2).toString(); 
        this.number_errores = data.info.errores.toString();
    }

    preload () {
        this.waveOffset = 0;
    }

    create () {
        this.game = this.sys.game
        // bg 
        this.bg = this.add.image(400, 300, 'BgMint')

        this.title = this.add.text(200,100, "fin del juego", { fontFamily : 'TROUBLE', fill: '#000000'}).setFontSize(100)

        // Figures ------------------------------------------------------------------------------------------
        this.panel_results = this.add.graphics(); 
        this.panel_results.fillStyle(0xffffff, 1); 
        this.panel_results.fillRoundedRect(100, 200, 600, 300, 20)
        this.panel_results.setAlpha(0); 

        // Messages -----------------------------------------------------------------------------------------
        this.tiempo_total_msg = this.add.text(150, 250, 'tiempo total:', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_total_log = this.add.text(500, 250, this.tiempo_total, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_promedio_msg = this.add.text(150, 310, 'tiempo promedio:',{ fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.tiempo_promedio_log = this.add.text(500, 310, this.tiempo_rondas,{ fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.number_errores_msg = this.add.text(150, 370, 'Numero de errores: ', { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.number_errores_log = this.add.text(500, 370, this.number_errores, { fontFamily: 'TROUBLE', fill: '#000000' }).setFontSize(50);
        this.statsShow(this, false);
        // -----------------------------------------------------
        this.aparecer(this.panel_results, this)
        
        // Clouds ------------------------------------------------------------------------------------------------
        this.clouds = this.physics.add.group(); 
        for (let i = 0; i < 10; i++) {
            this.clouds.add(this.add.circle(50 + i * 90, 0, 70,0xfff7768ad, 0));
            this.clouds.add(this.add.circle(50 + i * 90, 600, 70,0xfff7768ad, 0));
        }

        this.clouds.children.iterate((ball) => {
            ball.originalY = ball.y;
        });

        // fullScreenButton
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');
    }

    update () {
        this.waveOffset += 0.01;
        // wave movement 
        this.clouds.children.each((child) => {
            child.y = child.originalY + Math.sin(child.x / 40 + this.waveOffset) * 20;
        });
        if (this.flag) {
            this.statsShow(this, true)
            this.flag = false; 
        }
    }

    // custom functions 

    statsShow(scene, value) {
        scene.tiempo_total_msg.setVisible(value);
        scene.tiempo_total_log.setVisible(value);
        scene.tiempo_promedio_msg.setVisible(value);
        scene.tiempo_promedio_log.setVisible(value);
        scene.number_errores_msg.setVisible(value);
        scene.number_errores_log.setVisible(value);
    }

    aparecer (obj, scene) {
        this.tweens.add({
            targets: obj, 
            alpha: 1, 
            duration: 1500, 
            ease: 'Power 2', 
            onComplete: function () {
                scene.flag = true; 
            }
        });
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