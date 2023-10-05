// phaser
import Phaser from "phaser";

// Componente de Phaser que hace de Casilla para almacenar una letra de la sopa de letras
export default class extends Phaser.GameObjects.Container {
    constructor (config) {
        // Config Inicial de Casilla
        super(config.scene);
        this.scene = config.scene;
        this.board = config.board;
        this.pos_x = config.pos_x;
        this.pos_y = config.pos_y;
        this.letter = config.letter;
        this.pressed = false;
        this.discovered = false;
        this.isSelected = false;
        this.isHorizontal = false;
        this.isVertical = false;

        this.setSize(50, 50); // size
        // Background de Casilla
        this.bg = this.scene.add.rectangle(this.pos_x, this.pos_y, this.width, this.height, 0xffffff);
        this.bg.setOrigin(0);

        // Texto de Casilla
        this.texto = this.scene.add.text((this.pos_x + (this.width / 2)), (this.pos_y + (this.height / 2)), this.letter, {
            fontFamily: 'TROUBLE',
            fill: '#000000',
            align: 'center'
        }).setFontSize(50);
        this.texto.setOrigin(0.5);

        this.scene.add.existing(this);

        this.bg.setInteractive({ useHandCursor: true}); // Listener
        // Eventos de Casilla

        this.bg.on('pointerover', () => {
            this.bg.setFillStyle(0xe0bc28);
            this.texto.setTint(0xffffff);
            if (!this.board.selected_casillas.includes(this)) {
                this.board.selected_casillas.push(this);
            }
        });

        this.bg.on('pointerdown', () => {
            if (!this.board.selecting) {
                this.board.selecting = true;
                this.bg.setFillStyle(0xe0bc28);
                this.texto.setTint(0xffffff);
                this.pressed = true;
                this.board.selected_casillas = [this];
            }
        });

        this.bg.on('pointerout', () => {
            if (!this.board.selecting) {
                this.limpiar();
            }
        });

        this.bg.on('pointerup', () => {
            this.board.selecting = false;
            this.board.check_selection();
            this.board.clean_casillas();
        });

        this.bg.on('pointermove', () => {
            if (!this.discovered) {
                if (this.board.selecting && !this.pressed) {
                    if (!this.board.selected_casillas.includes(this)) {
                        this.board.selected_casillas.push(this);
                    }
                }
            }
        });
    }

    limpiar () {
        if (!this.discovered) {
            this.bg.setFillStyle(0xffffff);
            this.texto.setTint(0x000000);
            this.pressed = false;
        }
    }


}