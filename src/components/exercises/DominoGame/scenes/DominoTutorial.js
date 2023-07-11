// phaser library
import Phaser from 'phaser';
import '../styles.css'

// custom classes imported:

// assets imports
import bg from 'components/exercises/DominoGame/assets/images/bg_bricks.jpg'

// audio
import hover from 'components/exercises/DominoGame/assets/music/hover.mp3'
import correct from 'components/exercises/DominoGame/assets/music/correct.wav'

export default class DominoTutorial extends Phaser.Scene {
    constructor() {
        super({key: 'DominoTutorial', backgroundColor: '#3f1651'});
        // dimensions
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // panel title
        this.panel_title = undefined;
        this.panel_explanation = undefined;
        this.title = undefined;
        this.explanation = undefined;
    }

    preload() {
        //images
        this.load.image('bg', bg);
        // audio
        this.load.audio('hover', hover);
        this.load.audio('correct', correct);
    }

    create () {
        this.bg = this.add.image(400, 300, 'bg').setScale(0.8);

        // panel
        this.panel_title = this.add.graphics();
        this.panel_title.fillStyle(0x032670, 1);
        this.panel_title.lineStyle(2, 0xffffff);
        this.panel_title.fillRoundedRect(100, 20, 600, 100, 5); // Crea el rectángulo con bordes curvos
        this.panel_title.strokeRoundedRect(100, 20, 600, 100, 5); // Dibuja los bordes negros

        // text
        this.title = this.add.text(280, 30, 'TUTORIAL', {
            fontFamily: 'Atarian',
            fill: '#ffffff',
        }).setFontSize(80);

        this.panel_explanation = this.add.graphics();
        this.panel_title.fillStyle(0x032670, 1);
        this.panel_title.lineStyle(2, 0xffffff);
        this.panel_title.fillRoundedRect(100, 500, 600, 80, 5);
        this.panel_title.strokeRoundedRect(100, 500, 600, 80, 5);

        this.title = this.add.text(180, 520, 'Haz click en SI siempre y cuando \nhaya una letra en la derecha.', {
            fontFamily: 'Atarian',
            fill: '#ffffff'
        }).setFontSize(30);
    }
}