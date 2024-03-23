// Phaser
import Phaser from 'phaser';

// Styles
import 'components/exercises/general_assets/styles.css'

// Custom Classes Imported:
import Level from 'components/exercises/ArticRows/sprites/levelObj.js';
import FullScreenBttn from 'components/Factory/FullScreenBttn';

const log = {
    info: {
        tiempo_total: undefined,
        tiempo_rondas: undefined,
        errores: undefined,
    }
}

export default class CatchMouseGame extends Phaser.Scene {
    constructor() {
        super({ key: 'CatchMouseGame', backgroundColor: '#8DBB6C' });
        this.worldSizeWidth = 800;
        this.worldSizeHeigth = 600;

        // Background
        this.bg = undefined;

        // Emitters
        this.emiter = undefined;
        this.glass_emitter = undefined;
        this.flag_emitter = true;

        // Cursors
        this.cursors = undefined;

        // Vars
        this.current_number = 1;

        // Timers 
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
        this.tiempo_rondas = [];
        this.tiempo_por_ronda = 0; // sec

        // Flags 
        this.number_rounds = 0;
        this.number_errors = 0;
        this.current_level = 0;
        this.top_level = 0;
        this.velocity= 3800;
        this.roundCount = 0;
        this.tries = 0;
        this.tableros = [];
        this.tablero_actual = undefined
        this.flag = undefined;
        this.cursors = undefined;
        this.errores = 0;
        this.error_flag = false;
        this.rounds_per_level = 0

        // Effects 
        this.broken_glass = undefined;

        // Config 
        this.levels_global = [];

        this.level_config = {
            scene: this,
            difficulty: 'hard',
            pos_initx: 100,
            pos_inity: 100,
            game_width: 800,
            game_height: 600,
            sprite_width: 50,
            sprite_height: 50,
            sprite_scale: 0.19,
            spritePadding: 10,
            actual: false,
            tuto_option: undefined
        };

        this.ballTween = undefined;
    }

    preload() { }

    create() {
        this.game = this.sys.game
        // Initialize 
        const settings = this.sys.settings.data.settings;
        console.log('ESTOY LLEGANDO BIEN?', settings)
        if (settings.rondas !== undefined) {
            this.number_rounds = settings.rondas;
            this.tries = settings.tries
            this.top_level = parseInt(settings.niveles)
            this.rounds_per_level = Math.floor(this.number_rounds / this.top_level)
        }
        this.time.addEvent({ delay: 1000, callback: this.addTime, callbackScope: this, loop: true });

        // Background 
        this.bg = this.add.image(400, 300, 'bgTexture');

        var isCorrect = true;
        var spaceKeyDownAllowed = true;

        const circleRadius = 210;
        const circleRadiusMove = 152;
        const circleX = this.worldSizeWidth / 2;
        const circleY = (this.worldSizeHeigth / 2) - 30;

        const graphics = this.add.graphics();
        graphics.lineStyle(20, 0xFF0000, 1); // lineStyle(ancho, color, opacidad)
        graphics.strokeCircle(circleX, circleY, circleRadius);

        const trap = this.add.image(0, 0, 'trapImg');
        trap.setScale(0.152);

        const ball = this.add.image(circleX + circleRadius, circleY, 'mouseImg');
        ball.setOrigin(0.5, 0.5);  // Establecer el origen en el centro para que la imagen se posicione correctamente
        ball.setScale(0.08)

        const path = new Phaser.Curves.Ellipse(circleX, circleY, circleRadiusMove + ball.displayWidth / 2);

        const textCorrect = this.add.text(165, 250, "¡EXCELENTE!", { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(100);
        textCorrect.setVisible(false);

        this.ballTween = this.tweens.add({
            targets: ball,
            angle: 360,
            onUpdate: function (tween) {
                const angle = Phaser.Math.Angle.WrapDegrees(tween.getValue());
                const newPosition = path.getPoint(angle / 360);
                ball.x = newPosition.x;
                ball.y = newPosition.y;

                if (Phaser.Geom.Intersects.CircleToRectangle(new Phaser.Geom.Circle(ball.x, ball.y, ball.displayWidth / 2), trap.getBounds())) {
                    isCorrect = true;
                } else {
                    isCorrect = false;
                }
            },
            ease: 'Linear',
            duration: this.velocity,
            repeat: -1,
            paused: false
        });

        // Evento cuando se presiona la tecla de espacio
        this.input.keyboard.on('keydown-SPACE', (event) => {
            if (spaceKeyDownAllowed) {
                if (!this.ballTween.paused) {
                    this.ballTween.pause();
                    isCorrect = Phaser.Geom.Intersects.CircleToRectangle(
                        new Phaser.Geom.Circle(ball.x, ball.y, ball.displayWidth / 2),
                        trap.getBounds()
                    );
        
                    if (isCorrect) {
                        // Mostrar el mensaje de excelente
                        textCorrect.setVisible(true);
                        this.current_number++
        
                        // Reiniciar la bola y el tween después de 3 segundos
                        setTimeout(() => {
                            placeRedImgRandomly();
                            textCorrect.setVisible(false);
                            spaceKeyDownAllowed = true;
                            this.ballTween.resume();
                        }, 3000);
        
                        spaceKeyDownAllowed = false;
                        this.nextLevel()
                        setTimeout(() => {
                            spaceKeyDownAllowed = true;
                        }, 4000);
                                                
                    } else {
                        this.ballTween.resume();
                        this.number_errors++;
                    }
        
                    this.update()
                }
            }
        }, this);

        function placeRedImgRandomly() {
            const randomAngle = Phaser.Math.Between(0, 360);
            const randomPosition = path.getPoint(randomAngle / 360);

            trap.x = randomPosition.x;
            trap.y = randomPosition.y;
        }

        placeRedImgRandomly();

        this.title_panel = this.add.graphics();
        this.title_panel.fillStyle(0xfff4E9DE0, 1);
        this.title_panel.fillRect(0, 535, 1000, 65);

        this.text_numberrondas = this.add
            .text(110, 555, 'Rondas: ' + this.current_number + '/' + this.number_rounds, {
                fontFamily: 'TROUBLE',
                fill: '#ffffff'
            })
            .setFontSize(35);
        this.texto_tiempototal = this.add
            .text(22, 555, this.gameTimeMin + ' : ' + this.gameTimeSec, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(35);
        this.texto_errores = this.add
            .text(290, 555, 'ERRORES: ' + this.number_errors, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(35);
        this.texto_niveles = this.add
            .text(450, 555, 'Nivel: ' + this.current_level + '/' + this.top_level, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(35);

        this.texto_intentos = this.add
            .text(610, 555, 'Intentos: ' + this.tries, { fontFamily: 'TROUBLE', fill: '#ffffff' })
            .setFontSize(35);

        
    }

    update() {
        this.text_numberrondas.setText('Rondas: ' + this.current_number + '/' + this.number_rounds) 
        this.texto_errores.setText('ERRORES: ' + this.number_errors)
        this.texto_niveles.setText('Nivel: ' + this.current_level + '/' + this.top_level)
    }

    nextLevel(){
        if (this.current_level < this.top_level) {
            this.roundCount++;

            if (this.roundCount === this.rounds_per_level) {
                this.roundCount = 0;

                this.current_level++;
                this.velocity = this.velocity - 600 
            }
        } else {
            console.log("¡Has alcanzado el nivel máximo!");
        }
    }

    // Add time 
    addTime() {
        this.gameTimeSec += 1;
        this.tiempo_por_ronda += 1;
        if (this.gameTimeSec == 60) {
            this.gameTimeSec = 0;
            this.gameTimeMin += 1;
        }
        this.texto_tiempototal.setText(this.gameTimeMin + ' : ' + this.gameTimeSec);
    }

    // Set Status
    set_status(status) {
        this.flag = status;
    }

    // Effects 
    // Aparecer
    aparecer(obj, scene) {

    }


    // Feedback
    feedback(status) {

    }

    // Set Log 
    setLog(tiempo_rondas, tiempo_total, errores) {
        log.info.tiempo_rondas = tiempo_rondas;
        log.info.tiempo_total = tiempo_total;
        log.info.errores = errores;
    }
}