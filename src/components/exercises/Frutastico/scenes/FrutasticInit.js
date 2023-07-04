// phaser library
import Phaser from 'phaser';
import '../styles.css'

// Clase no visible para cargar assets e inicializar el juego
export default class FrutasticInit extends Phaser.Scene {
    constructor () {
        super({key: 'FrutasticInit', backgroundColor: '#3f1651'});
    }

    preload() {
        
    }

    create () {
        this.cameras.main.setBackgroundColor('#3f1651');
        this.add.text(3000,3000, "", { fontFamily : 'ARCO', fill: '#ffffff'}).setFontSize(20)
        // Musica ---------------
        /*
        let musica; 

        
        this.soundManager = this.sound; 

        this.soundManager.on('complete', function (sound) {
        if (sound.key === 'main_music') {
            this.play({ key: 'main_music', loop: true }); 
        }
        }); 

        musica = this.soundManager.add('main_music', {loop: true}); 
        musica.play(); 
        */

        this.pass()
    } 

    pass () {
        this.scene.start('FrutasticMenu')
    }
}