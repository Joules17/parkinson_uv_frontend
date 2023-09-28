// Phaser 
import Phaser from 'phaser'; 

// Styles
import 'components/exercises/general_assets/styles.css'; 

// Custom Classes Imported: 
import SteroidObject from 'components/Factory/SteroidObject.js';
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import Level from '../sprites/Level';

export default class LetrasMarinasGame extends Phaser.Scene {
    constructor() {
        super({ key: 'LetrasMarinasGame', backgroundColor: '#3f1651' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;
    }

    preload () {}

    create () {
        // Background 
        this.bg = this.add.sprite(400, 300, 'SeaImg').setDepth(-2);

        // Coral
        this.coral_izq = this.add.sprite(50, 500, 'CoralOrange')
        // Panel
        this.panel_nivel = this.add.graphics(); 
        this.panel_nivel.lineStyle(10, 0x3bb173);
        this.panel_nivel.strokeRoundedRect(15, 15, 555, 555, 10);
        this.panel_nivel.fillStyle(0x000000, 1);
        this.panel_nivel.setAlpha(0.5)
        this.panel_nivel.fillRoundedRect(15, 15, 555, 555, 10);

        // Panel tiem 
        this.panel_time = this.add.graphics(); 
        this.panel_time.fillStyle(0xffffff, 0.5);
        this.panel_time.fillRect(600, 500, 185, 50);


        const nivel = new Level({scene: this, pos_initx: 20, pos_inity: 20, number_cols : 11, number_rows : 11, number_words : 3, categories: ['animales', 'frutas']})

        // Fullscreen button 
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

    }
}