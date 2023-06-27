// phaser library
import Phaser from 'phaser';

export default class NumerosMain extends Phaser.Scene {
  constructor() {
    super({key: 'NumerosMain'});
    this.bg = undefined; 
    this.button = undefined; 
    this.title = undefined; 
  }

  preload() {
     this.load.image('fondoMenu', '')
     this.load.image('playButton', '')
  }

  create() {
    const logo = this.add.image(400, 150, 'logo');
      
        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
  }
  
}
