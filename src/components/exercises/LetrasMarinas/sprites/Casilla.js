// phaser 
import Phaser from "phaser";

// Componente de Phaser que hace de Casilla para almacenar una letra de la sopa de letras
export default class extends Phaser.GameObjects.Container {
    constructor (config) {
        // Config Inicial de Casilla
        super(config.scene);
        console.log('Se crea una casilla uwu')
        this.scene = config.scene;  
        this.board = config.board; 
        this.pos_x = config.pos_x; 
        this.pos_y = config.pos_y;
        this.letter = config.letter; 
        this.pressed = false; 
        this.isSelected = false; 
        this.isHorizontal = false; 
        this.isVertical = false;

        this.setSize(40, 40); // size
        // Background de Casilla 
        this.bg = this.scene.add.graphics(); 
        this.bg.fillStyle(0xffffff, 1);
        this.bg.fillRoundedRect(this.pos_x, this.pos_y, this.width, this.height, 10);
        this.scene.add.rectangle(this.pos_x, this.pos_y, this.width, this.height, 0xffffff);
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
            if (this.board.selecting) {
                this.bg.setFillStyle(0xe0bc28); 
                this.texto.setTint(0xffffff);
                this.board.selected_casillas.push(this);
            } else {
                this.bg.setFillStyle(0xb5b6b7)
            }
        });

        this.bg.on('pointerdown', () => {
            if (!this.board.selecting) {
                this.board.selecting = true; 
                this.bg.setFillStyle(0xe0bc28); 
                this.texto.setTint(0xffffff);
                this.board.selected_casillas = [this]; 

            }
        }); 

        this.bg.on('pointerup', () => {
            if (this.board.selecting) {
                this.board.selecting = false; 
                this.board.selected_casillas = []; 
                this.bg.setFillStyle(0xffffff); 
                this.texto.setTint(0x000000);
            }
        }); 

        this.bg.on('pointermove', (pointer) => {
            if (this.isSelected) {
                const dx = Math.abs(pointer.worldX - this.bg.x);
                const dy = Math.abs(pointer.worldY - this.bg.y);
            
                if (dx > dy) {
                    this.isHorizontal = true; 
                    this.isVertical = false; 
                } else {
                    this.isHorizontal = false; 
                    this.isVertical = true; 
                }
            }
        }); 
    }


}