// phaser library
import Phaser from 'phaser';
import 'components/exercises/general_assets/styles.css';

// --------------------------------------- CUSTOM CLASSES IMPORTED ---------------------------------------
import FullScreenBttn from 'components/Factory/FullScreenBttn.js';
import SteroidObject from 'components/Factory/SteroidObject.js';
import TableroRenewed from '../sprites/base/TableroRenewed';
// -------------------------------------------------------------------------------------------------------

export default class ObjectLoby extends Phaser.Scene {
    constructor() {
        super({ key: 'ObjectLoby', backgroundColor: '#3f1651' });
    }

    preload() {}

    builder() {
        // vars
        this.event_finished = false;
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;
        this.button = undefined;
        this.welcome_title = undefined;

        // ---------------------------- Others ----------------------------
        this.tablero_ejemplo = undefined;
        this.score = 0; // se torna 1 cuando hizo click correctamente y -1 cuando no
        this.counter = 0;

        this.button_continue = undefined;

        // ---------------------------- Config ----------------------------
        this.tablero_config = {
            scene: this,
            game_width: 620,
            game_height: 100,
            pos_initx: 80,
            pos_inity: 250,
            numberObjects: 6,
            numberDistinct: 3,
            padding: 10,
            spriteWidth: 40,
            spriteHeight: 20,
            category: ['frutas', 'comida', 'casa'],
            actual: true, // propiedad visible del tablero
            color_wished: undefined
        };
        // ---------------------------------------------------------------
    }
    create() {
        // constructor aux
        this.builder();

        this.game = this.sys.game;
        // ----------------------- Background -----------------------
        this.cameras.main.setBackgroundColor(0xfff4e9de0);
        this.bg = this.add.sprite(400, 300, 'BgSky');
        // -----------------------------------------------------------

        // ----------------------- Welcome Title -----------------------
        // and movement:
        this.welcome_title = this.add.text(50, 1000, 'TUTORIAL', { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(100);
        this.move_upside(this.welcome_title, 970, 1000, this);

        // -------------------------------------------------------------
        // ----------------------- Panels  -----------------------------

        // panel
        this.panel = this.add.graphics();
        this.panel.fillStyle(0xffffff, 1);
        this.panel.fillRect(0, 140, 1800, 600);
        this.panel.setAlpha(0);

        // panel Title
        this.panel_title = this.add.graphics();
        this.panel_title.fillStyle(0x000000, 1);
        this.panel_title.fillRect(-10, 125, 1800, 60);
        this.panel_title.setAlpha(0);

        // -------------------------------------------------------------
        // ----------------------- Objects: Palm Sprite -----------------------------
        // palmera
        this.palmera_der = new SteroidObject({ scene: this, posx: 795, posy: 150, key: 'PalmeraImg' });
        this.palmera_der.setScale(1.4);
        this.palmera_der.setAlpha(0);
        this.palmera_der.dance_function(3, 2000);

        this.ready_text = this.add.text(60, 140, 'APRENDAMOS A COMO JUGAR', { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(40);
        this.ready_text.setAlpha(0);

        // messages
        this.error_message = this.add.text(110, 480, 'Error', { fontFamily: 'TROUBLE', fill: '#FF0000' }).setFontSize(40);
        this.error_detailed = this.add
            .text(200, 485, 'recuerda que debes seleccionar el objeto distinto', { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(30);
        this.victory_message = this.add.text(80, 480, 'EXCELENTE', { fontFamily: 'TROUBLE', fill: '#006400' }).setFontSize(40);
        this.victory_explained = this.add
            .text(230, 485, 'has entendido el ejercicio, ¡haz click en jugar!', { fontFamily: 'TROUBLE', fill: '#000000' })
            .setFontSize(30);
        this.error_message.setVisible(false);
        this.error_detailed.setVisible(false);
        this.victory_explained.setVisible(false);
        this.victory_message.setVisible(false);

        // ----------------------------------------------- BUTTONS -----------------------------------------------
        // ---------------------------- FULLSCREEN BUTTON ---------------------------
        new FullScreenBttn(this, 770, 30, 'FullscreenImg');

        // ---------------------------- CONTINUE BUTTON ---------------------------
        this.button_continue = this.add
            .text(350, 550, 'JUGAR', {
                fontFamily: 'TROUBLE',
                fill: '#e15554'
            })
            .setFontSize(60);

        this.button_continue.setInteractive();
        this.button_continue.setVisible(false);

        // ---------------------------- CONTINUE BUTTON EVENTS ---------------------------

        this.button_continue.on('pointerdown', () => {
            if (this.victory_message.visible && this.button_continue.visible) {
                const settings = this.sys.settings.data.settings;
                this.sound.play('CorrectSound');
                this.scene.start('ObjectRondas', { settings }, { game: this.game });
            }
        });

        this.button_continue.on('pointerover', () => {
            this.sound.play('HoverSound');
            this.tweens.add({
                targets: this.button_continue,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 100,
                ease: 'Power2'
            });
        });

        this.button_continue.on('pointerout', () => {
            this.tweens.add({
                targets: this.button_continue,
                scaleX: 1,
                scaleY: 1,
                duration: 100,
                ease: 'Power2'
            });
        });
    }

    update() {
        // eventos
        if (!this.score == 0) {
            if (this.score == -1 && this.counter == 0) {
                this.error_detailed.setVisible(true);
                this.error_message.setVisible(true);
                this.victory_explained.setVisible(false);
                this.victory_message.setVisible(false);
                this.button_continue.setVisible(false);
                this.counter += 1;
            } else if (this.score == 1 && this.counter == 0) {
                this.error_detailed.setVisible(false);
                this.error_message.setVisible(false);
                this.victory_explained.setVisible(true);
                this.victory_message.setVisible(true);
                this.button_continue.setVisible(true);
                this.counter += 1;
            }
        }
    }

    // Customs functions

    move_upside(spt, position, duration, scene) {
        spt.originalY = spt.originalY - position;
        this.tweens.add({
            targets: spt,
            y: spt.y - position,
            duration: duration,
            ease: 'Power2',
            yoyo: false,
            repeat: 0,
            onComplete: function () {
                scene.aparecer(scene.panel, scene);
                scene.aparecer(scene.panel_title, scene);
                scene.aparecer(scene.ready_text, scene);
                scene.aparecer(scene.palmera_der, scene);
            }
        });
    }

    getScore() {
        return this.score;
    }

    setScore(val) {
        this.score = val;
    }

    //

    aparecer(obj, scene) {
        this.tweens.add({
            targets: obj,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            onComplete: function () {
                if (!scene.event_finished) {
                    scene.tablero_ejemplo = new TableroRenewed(scene.tablero_config);
                    scene.event_finished = true;
                    scene.explanatory_text = scene.add
                        .text(90, 420, 'Haz click en el objeto que no se repita', { fontFamily: 'TROUBLE', fill: '#000000' })
                        .setFontSize(50);
                }
            }
        });
    }

    escribir(textGlobal, text, vel) {
        this.tweens.add({
            targets: { index: 0 },
            index: text.length,
            ease: 'Linear',
            duration: text.length * vel,
            onUpdate: function (target) {
                textGlobal.setText(text.substr(0, target.index));
            }
        });
    }
}
