// phaser library
import Phaser from 'phaser';
import '../styles.css'
import FullScreenBttn from 'components/Factory/FullScreenBttn';

export default class finDelJuego extends Phaser.Scene {

  constructor() {
    super({key: 'finDelJuego', backgroundColor: '#3f1651'});
    this.worldSizeWidth = 800;
    this.worldSizeHeigth = 600;

    // paneles
    this.panelStats = undefined;

    // Mensajes
    this.title = undefined;
    this.tiempo_total_msg = undefined;
    this.tiempo_total_log = undefined;
    this.tiempo_promedio_msg = undefined;
    this.tiempo_promedio_log = undefined;
    this.number_rondas_msg = undefined;
    this.number_rondas_log = undefined;

    // figuras
    this.waveOffset = undefined;
    this.olas = undefined;

    // variables
    this.pressed = false;

    // log
    this.tiempo_total = undefined;
    this.tiempo_rondas = undefined;
    this.number_rondas = undefined;
  }

  init(data) {
    console.log(data)
    this.tiempo_total = data.info.tiempo_total;
    let arreglo = data.info.tiempo_rondas;
    let sum = 0;
    for (let i = 0; i < arreglo.length; i++) {
        sum = sum + arreglo[i];
    }
    let promedio = sum / arreglo.length;

    this.tiempo_rondas = promedio.toFixed(2).toString();
    this.number_rondas = data.info.numero_rondas.toString();
    }

  preload() {
    //
    this.waveOffset = 0;
  }

  create() {
    this.cameras.main.setBackgroundColor('#3f1651');

    // -------------------------
    this.flag = false;
    // -------------------------

    this.title = this.add.text(160,40, "fin del juego", { fontFamily : 'ARCO', fill: '#ffffff'}).setFontSize(60)

    // ---------------------

    this.panelStats = this.add.graphics();
    this.panelStats.fillStyle(0xffffff, 1);
    this.panelStats.fillRoundedRect(50, 120, 700, 480, 20); // x, y, ancho, alto, radio de curvatura
    this.panelStats.setAlpha(0)

    // ---------------------
    // Mensajes
    this.tiempo_total_msg = this.add.text(100, 150, "Tiempo total:", { fontFamily : 'ARCO', fill: '#000000'}).setFontSize(35)
    this.tiempo_total_log = this.add.text(500, 150, this.tiempo_total, { fontFamily : 'ARCO', fill: '#1A2E44'}).setFontSize(35)
    this.tiempo_promedio_msg = this.add.text(100, 300, "Tiempo promedio:", { fontFamily : 'ARCO', fill: '#000000'}).setFontSize(35)
    this.tiempo_promedio_log = this.add.text(500, 300, this.tiempo_rondas, { fontFamily : 'ARCO', fill: '#1A2E44'}).setFontSize(35)
    this.number_rondas_msg = this.add.text(100, 450, "Numero rondas: ", { fontFamily : 'ARCO', fill: '#000000'}).setFontSize(35)
    this.number_rondas_log = this.add.text(500, 450, this.number_rondas, { fontFamily : 'ARCO', fill: '#1A2E44'}).setFontSize(35)
    this.statsShow(this, false)

    // ---------------------
    this.aparecer(this.panelStats, this)

    this.olas = this.physics.add.group()

    for (let i = 0; i < 10; i++) {
      this.olas.add(this.add.circle(50 + i*90, 600, 70, 0xfff89f5b, 0))
    }

    this.olas.children.iterate(ball => {
      ball.originalY = ball.y;
      // console.log('aqui estoy', ball.x, ball.y)
      // ball.setScale(0.1);
    })

    new FullScreenBttn(this, 770, 30, 'fullsceenImg');

  }

  update () {
    this.waveOffset += 0.01;
    if (!this.pressed) {
      this.olas.children.each(child => {
        child.y = child.originalY + Math.sin(child.x / 40 + this.waveOffset) * 20;
      });
    }
    if (this.flag) {
      this.statsShow(this, true)
      this.flag = false;
    }
  }

  // Customs functions

  move_upside(spt, position, duration, escena) {
    spt.originalY = spt.originalY - position
    this.tweens.add({
      targets: spt,
      y: spt.y - position,
      duration: duration,
      ease: 'Power2',
      yoyo: false,
      repeat: 0,
      onComplete: function () {
        escena.flag = true;
      }
    });
  }

  aparecer (obj, scene) {
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

  statsShow (scene, value) {
    scene.tiempo_total_msg.setVisible(value)
    scene.tiempo_total_log.setVisible(value)
    scene.tiempo_promedio_msg.setVisible(value)
    scene.tiempo_promedio_log.setVisible(value)
    scene.number_rondas_msg.setVisible(value)
    scene.number_rondas_log.setVisible(value)
  }

}