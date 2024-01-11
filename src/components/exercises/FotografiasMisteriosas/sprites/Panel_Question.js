// phaser library
import Phaser from 'phaser';

export default class Panel_Question extends Phaser.GameObjects.Group {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.level = config.level; 
        this.order = config.order;
        this.questions = config.questions;
        this.active = config.active;
    }

    create_question() {
        this.scene.question.setText('Cual fue la fotografia No. ' + this.order + ' \n              presentada? ');
        console.log('preguntas: ', this.questions);
    
        // Configurar las opciones
        this.setupInteractiveText(this.scene.first_option, this.questions[0][0].key, this.questions[0][1]);
        this.setupInteractiveText(this.scene.second_option, this.questions[1][0].key, this.questions[1][1]);
        this.setupInteractiveText(this.scene.third_option, this.questions[2][0].key,this.questions[2][1]);
    
        this.centerText(this.scene.first_option, 800);
        this.centerText(this.scene.second_option, 800);
        this.centerText(this.scene.third_option, 800);
    }
    
    setupInteractiveText(textObject, content, isCorrect) {
        textObject.setText(content); 
        textObject.setInteractive({ useHandCursor: true }); 
    
        textObject.on('pointerover', () => {
            textObject.setColor('#ff69b4');
            this.scene.sound.play('HoverSound', {volume: 0.2}); 
        }); 

        textObject.on('pointerout', () => {
            textObject.setColor('#000000');

        }); 
        textObject.on('pointerdown', () => {
            if (this.active) {
                if (isCorrect) {
                    this.scene.sound.play('CorrectSound');
                    console.log('Respuesta Correcta'); 
                    this.ocultar(); 
                    this.level.mostrarSiguientePregunta();
                } else {
                    this.scene.sound.play('BadSound');
                    console.log('Respuesta Incorrecta', this.scene.scene.key )
                    if (this.scene.scene.key === 'FotografiasGame') {
                        this.scene.tries--;
                        this.scene.text_intentos.setText('Intentos: ' + this.scene.tries);
                        this.scene.errores++; 
                        this.scene.check_failure(); 
                    }

                }
            }
        });
    }

    centerText(textObject, gameWidth) {
        const textWidth = textObject.displayWidth;
        const xPosition = (gameWidth - textWidth) / 2;
        textObject.setX(xPosition);
    }

    mostrar() {
        this.set_active(true);
        this.create_question();
    }

    ocultar() {
        this.set_active(false); 
    }

    set_active(bool) {
        this.active = bool;
        if (!bool) {
            this.scene.question.setText('');
            this.scene.first_option.setText('');
            this.scene.second_option.setText('');
            this.scene.third_option.setText('');
        } 
    }
}
