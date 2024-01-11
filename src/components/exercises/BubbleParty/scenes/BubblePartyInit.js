// Phaser
import Phaser from 'phaser';

// Styles
import 'components/exercises/general_assets/styles.css'

// Images
import SeaImg from 'components/exercises/general_assets/images/textures/sea_texture.png'
import AlgaeImg from 'components/exercises/general_assets/images/objects/others/algae.png'
import AlgaeRedImg from 'components/exercises/general_assets/images/objects/others/algae_red.png'
import AlgaeGreenImg from 'components/exercises/general_assets/images/objects/others/algae_green.png'
import BubbleImg from 'components/exercises/general_assets/images/objects/others/Bubble.png';
import BubbleRedImg from 'components/exercises/general_assets/images/objects/others/BubbleRed.png';
import BubbleTransparentImg from 'components/exercises/general_assets/images/objects/others/bubble_transparente.png';
import FullscreenImg from 'components/exercises/general_assets/images/objects/others/fullscreen.png';
import CrabImg from 'components/exercises/general_assets/images/objects/others/Crab.png';

import TriangleImg from 'components/exercises/general_assets/images/objects/figures/triangle.png'
import CircleImg from 'components/exercises/general_assets/images/objects/figures/circle.png'
import StarImg from 'components/exercises/general_assets/images/objects/figures/star.png'
import NeutralArrowLeft from 'components/exercises/general_assets/images/objects/arrows/neutral/neutral_left.png'
import NeutralArrowRight from 'components/exercises/general_assets/images/objects/arrows/neutral/neutral_right.png'

// arrows
import ArrowLeftImg from 'components/exercises/general_assets/images/objects/arrows/simple/left_arrow.png'
import ArrowRightImg from 'components/exercises/general_assets/images/objects/arrows/simple/right_arrow.png'
import ArrowUpImg from 'components/exercises/general_assets/images/objects/arrows/simple/up_arrow.png'
import ArrowDownImg from 'components/exercises/general_assets/images/objects/arrows/simple/bottom_arrow.png'

// bubble_list
import bubble_list from 'components/exercises/general_assets/images/objects/bubble_list.js'

// Audio
import HoverSound from 'components/exercises/general_assets/sounds/hover.mp3'
import CorrectSound from 'components/exercises/general_assets/sounds/correct.wav'
import BadSound from 'components/exercises/general_assets/sounds/bad.wav';
import BubblePopSound from 'components/exercises/general_assets/sounds/BubblePop.mp3';
import PickBubbleSound from 'components/exercises/general_assets/sounds/PickBubble.mp3';
import GoodSound from 'components/exercises/general_assets/sounds/good.mp3';

export default class BubblePartyInit extends Phaser.Scene {
    constructor () {
        super({key: 'BubblePartyInit', backgroundColor: '#3f1651'});
    }

    preload () {
        // images
        this.load.image('SeaImg', SeaImg);
        this.load.image('AlgaeImg', AlgaeImg);
        this.load.image('FullscreenImg', FullscreenImg);
        this.load.image('BubbleImg', BubbleImg);
        this.load.image('BubbleRedImg', BubbleRedImg);
        this.load.image('AlgaeRedImg', AlgaeRedImg);
        this.load.image('AlgaeGreenImg', AlgaeGreenImg);
        this.load.image('NeutralArrowRight', NeutralArrowRight);
        this.load.image('NeutralArrowLeft', NeutralArrowLeft);
        this.load.image('BubbleTransparentImg', BubbleTransparentImg);
        this.load.image('CrabImg', CrabImg);

        // arrows
        this.load.image('ArrowLeftImg', ArrowLeftImg);
        this.load.image('ArrowRightImg', ArrowRightImg);
        this.load.image('ArrowUpImg', ArrowUpImg);
        this.load.image('ArrowDownImg', ArrowDownImg);

        // Figures
        this.load.image('TriangleImg', TriangleImg);
        this.load.image('CircleImg', CircleImg);
        this.load.image('StarImg', StarImg);
        // this.load.image('SquareImg', SquareImg);
        // this.load.image('RhombusImg', RhombusImg);

        // bubble_list
        for (let categoria in bubble_list) {
            // busca cada subcategoria para cargar su correspondiente imagen
            // console.log(`Elementos en la categoría ${categoria}:`)
            for (let subcategoria in bubble_list[categoria]) {
              this.load.image(bubble_list[categoria][subcategoria]["key"], bubble_list[categoria][subcategoria]["imagen"])
            }
        }

        // sounds
        this.load.audio('HoverSound', HoverSound);
        this.load.audio('CorrectSound', CorrectSound);
        this.load.audio('BadSound', BadSound);
        this.load.audio('BubblePopSound', BubblePopSound);
        this.load.audio('PickBubbleSound', PickBubbleSound);
        this.load.audio('GoodSound', GoodSound);
    }

    create () {
        this.game = this.sys.game
        this.cameras.main.setBackgroundColor('#3f1651');
        this.add.text(3000,3000, "ESTO ES UN TEXTO DE INICIALIZACION", { fontFamily : 'TROUBLE', fill: '#ffffff'}).setFontSize(20)
        this.pass()
    }

    pass () {
        const settings = this.sys.settings.data.setting;
        this.scene.start('BubblePartyMenu', {settings}, {game: this.game});
    }
}
