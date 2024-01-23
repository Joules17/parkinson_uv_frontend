// Phaser
import Phaser from 'phaser'

// Styles
import 'components/exercises/general_assets/styles.css'

// Bgs
import ClockBgImg from 'components/exercises/general_assets/images/textures/clock_texture.png'
import TeGameBgImg from 'components/exercises/general_assets/images/textures/te_texture.png'
import ClockShapeImg from 'components/exercises/general_assets/images/objects/others/ClockShape.png'

// images
import FullscreenImg from 'components/exercises/general_assets/images/objects/others/fullscreen.png'
import ArrowUpImg from 'components/exercises/general_assets/images/objects/arrows/simple/up_arrow.png'
import ArrowDownImg from 'components/exercises/general_assets/images/objects/arrows/simple/bottom_arrow.png'

// audio
import HoverSound from 'components/exercises/general_assets/sounds/hover.mp3'
import CorrectSound from 'components/exercises/general_assets/sounds/correct.wav'
import GoodSound from 'components/exercises/general_assets/sounds/good.mp3'
import BadSound from 'components/exercises/general_assets/sounds/bad.wav';
import BubblePopSound from 'components/exercises/general_assets/sounds/BubblePop.mp3';

export default class TeInit extends Phaser.Scene {
    constructor () {
        super({key: 'TeInit', backgroundColor: '#3f1651'});
    }

    preload () {
        // Img
        this.load.image('ClockBgImg', ClockBgImg);
        this.load.image('ClockShapeImg', ClockShapeImg);
        this.load.image('TeGameBgImg', TeGameBgImg);
        this.load.image('FullscreenImg', FullscreenImg);
        this.load.image('ArrowUpImg', ArrowUpImg);
        this.load.image('ArrowDownImg', ArrowDownImg);

        // sounds
        this.load.audio('HoverSound', HoverSound);
        this.load.audio('CorrectSound', CorrectSound);
        this.load.audio('GoodSound', GoodSound);
        this.load.audio('BadSound', BadSound);
        this.load.audio('BubblePopSound', BubblePopSound);
    }

    create () {
        this.game = this.sys.game
        this.cameras.main.setBackgroundColor('#3f1651');
        this.add.text(3000,3000, "ESTO ES UN TEXTO DE INICIALIZACION", { fontFamily : 'TROUBLE', fill: '#ffffff'}).setFontSize(20)
        this.pass()
    }

    pass () {
        const settings = this.sys.settings.data.setting;
        // console.log('Llego bien?', settings)
        this.scene.start('TeMenu', {settings}, {game: this.game})
    }
}