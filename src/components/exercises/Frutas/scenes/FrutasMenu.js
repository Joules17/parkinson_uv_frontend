// phaser library
import Phaser from 'phaser';
import '../styles.css'

// assets imports
import FondoFrutas from '../assets/img/fruits_bg.jpg'
import PalmeraImg from '../assets/img/palmera.png'
import coco from '../assets/fruits/coco.png'
import banana from '../assets/fruits/mango.png'
import circle_orange from '../assets/fruits/orangel_circle.png'

export default class FrutasMenu extends Phaser.Scene {
  constructor() {
    super({key: 'FrutasMenu', backgroundColor: '#3f1651'});
    this.worldSizeWidth = 800;
    this.worldSizeHeigth = 600;
    this.button = undefined; 
    this.title = undefined; 
    this.start = undefined;
    this.palmera = undefined;
    this.palmera2 = undefined; 
    this.coquito = undefined; 
    this.mango = undefined; 
    this.waveOffset = undefined;
    this.olas = undefined; 
  }

  preload() {
    this.load.image('fondoMenu', FondoFrutas)
    this.load.image('palmeraImg', PalmeraImg)
    this.load.image('cocoImg', coco)
    this.load.image('mangoImg', banana)
    this.load.image('ballImg', circle_orange)
    this.waveOffset = 0;
  }

  create() {
    this.cameras.main.setBackgroundColor('#3f1651');

    this.start = this.add.text(290, 380, "Iniciar", {
      fontFamily: 'ARCO', 
      fill: '#f89f5b',
    }).setFontSize(50)

    this.start.setInteractive();

    this.palmera = this.add.image(795, 150, "palmeraImg")
    this.palmera2 = this.add.image(5, 150, "palmeraImg")
    
    this.palmera.setScale(1.4)
    this.palmera2.setFlipX(true)
    this.palmera2.setScale(1.4)

    this.title = this.add.text(125,250, "Frutas Locas", { fontFamily : 'ARCO', fill: '#ffffff'}).setFontSize(70)
    
    this.coquito = this.add.image(700, 310, "cocoImg")
    this.coquito.setScale(0.1)
    this.mango = this.add.image(105, 260, "mangoImg")
    this.mango.setScale(0.1)

    this.olas = this.add.group({
      key: 'ballImg',
      repeat: 10,
      setXY: {x: 80, y: 650, stepX: 70 },
    });

    this.olas.children.iterate(ball => {
      ball.originalY = ball.y;
      console.log('aqui estoy', ball.x, ball.y)
      ball.setScale(0.1);
    })

    this.start.on('pointerdown', () => {
      console.log('Haz hecho click en el boton');
    })

    this.start.on('pointerover', () => {
      this.start.setColor('#ffffff')
      this.tweens.add({
        targets: this.start,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 100, 
        ease: 'Power2'
      });
    });

    this.start.on('pointerout', () => {
      this.start.setColor('#f89f5b')
      this.tweens.add({
        targets: this.start,
        scaleX: 1,
        scaleY: 1,
        duration: 100, 
        ease: 'Power2'
      });
    });

    //this.button = this.add.image(400,300, 'playButton')
    //this.button.setScale(0.3)
    //this.button.setInteractive()
    //this.button.on('pointerdown', () => this.start())
    //this.button.on('pointerover',this.over);
  }

  over () {
    console.log('Si estoy encima')
  }

  update () {
    this.waveOffset += 0.01;
    this.olas.children.each(child => {
      child.y = child.originalY + Math.sin(child.x / 40 + this.waveOffset) * 20;
    });
  }

  start () {
    console.log('comenzo el juego')
  }
}