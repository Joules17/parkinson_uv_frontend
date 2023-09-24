// Phaser 
import Phaser from 'phaser'; 

// Styles 
import 'components/exercises/general_assets/styles.css'

// Custom Classes Imported: 
import Level from 'components/exercises/ArticRows/sprites/levelObj.js'; 
import FullScreenBttn from 'components/Factory/FullScreenBttn';

// 
export default class FlechasTuto extends Phaser.Scene {
    constructor () {
        super({key: 'FlechasTuto', backgroundColor: '#3f1651'});
        this.worldSizeWidth = 800;
        this.worldSizeHeight = 600;

        // Vars
        this.eventFinished = false;
        this.first_phase = false;
        this.tableros = []; // lista de tableros
        this.tablero_actual = undefined;
        this.good_rounds = 7;
        this.bad_rounds = 7;
        this.fin_del_tuto = false;
        this.bad_flag = false; 
        this.patron_flag = false; 
        this.contador = 0;         

        // Config level
        this.level_config_patron = {
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
    }

    preload () {}

    create () {
        // Background 
        this.bg = this.add.image(400, 300, 'BgNightSky')

        // Emitter
        this.glass_emitter = undefined; 
        this.flag_emitter = true; 

        // Cursor
        this.input.keyboard.on('keydown', this.handle_keydown, this);

        // Emitter
        this.emiter = this.add.particles(0, -10, 'SnowImg', {
            x: { min: 0, max: 800 },
            quantity: 2,
            lifespan: 2500,
            gravityY: 200,
            scale: { start: 0.005, end: 0.001 }
        });


        this.caps = this.add.image(400, 300, 'KeycapImg')
        this.caps.setAlpha(0)

        // Panels 
        this.conversation_panel = this.add.graphics();
        this.conversation_panel.fillStyle(0x000000, 1);
        this.conversation_panel.fillRect(50, 530, 700, 60, 5); // Crea el rectángulo con bordes curvos
        this.conversation_panel.strokeRect(50, 530, 700, 60, 5); // Dibuja los bordes negros
        this.conversation_panel.setDepth(2)
        // Fullscreen bttn 
        new FullScreenBttn(this, 770, 30, 'FullscreenImg'); 

        // Texts
        this.title = this.add.text(305, 20, 'TUTORIAL', { fontFamily: 'TROUBLE', fill: '#ffffff' }).setFontSize(70);
        this.explanation = this.add
            .text(100, 550, 'Bienvenido a flechas congeladas, para jugar utiliza tu teclado', {
                fontFamily: 'TROUBLE',
                fill: '#ffffff'
            })
            .setFontSize(30).setDepth(3);
        this.explanation.setAlpha(0);
        this.aparecer(this.explanation, this);
        this.aparecer(this.caps, this);

        // Button 
        this.play_button = this.add.text(320, 240, 'JUGAR', {
            fontFamily: 'TROUBLE',
            fill: '#ffffff',
          }).setFontSize(80); 
          this.play_button.setVisible(false); 

          this.play_button.setInteractive(); 
        this.play_button.on('pointerdown', () => {
          this.sound.play('StartButtonSound')
          const settings = this.sys.settings.data.settings;
          this.scene.start('FlechasGame', {settings})
        }); 
  
        this.play_button.on('pointerover', () => {
          this.play_button.setColor('#4ca2ba')
            this.tweens.add({
                targets: this.play_button,
                scale: 1.1,
                duration: 100,
                ease: 'Power2'
            }); 
        }); 
        
        this.play_button.on('pointerout', () => {
          this.play_button.setColor('#ffffff')
          this.tweens.add({
              targets: this.play_button,
              scaleX: 1,
              scaleY: 1,
              duration: 100, 
              ease: 'Power2'
            });
        });
    }

    update() {
      if (this.flag) {
        if (this.tablero_actual !== undefined) {
            if (this.tablero_actual !== 'patron_explanation') {
                this.tablero_actual.set_active(false);
            }
        }
        this.pon_tablero();
      }
      if (this.first_phase) {
          this.explanation
              .setText(
                  'FIJATE EN LA FLECHA DIFERENTE A LAS DEMAS'
              )
              .setFontSize(45);
          this.caps.setVisible(false);
          this.createRounds();
          this.first_phase = false;
      }
      
      if (this.patron_flag) {
        this.explanation.setText(' OPRIME LA ORIENTACION QUE NO SE REPITE EN LOS PATRONES DE FLECHAS').setFontSize(28)
        this.title.setVisible(false)
        this.patron_flag = false; 
      }
      if (this.fin_del_tuto) {
          this.explanation.setText('Excelente! Has completado el tutorial, haz click en Jugar!').setFontSize(30)
          this.play_button.setVisible(true); 
          this.fin_del_tuto = false; 
      }
    }

    createRounds() {
        this.contador += 1; 
        this.tableros.push('patron_explanation')
        for (let i = 0; i < this.bad_rounds; i++) {
            this.tableros.push(new Level(this.level_config_patron));
        }
        this.flag = true;
    }

    pon_tablero() {
        if (this.tableros.length != 0) {
            this.tablero_actual = this.tableros.shift();
            if (this.tablero_actual === 'patron_explanation') {
                this.patron_flag = true; 
                
            } else {
                // console.log('tablero_actual:', this.tablero_actual)
                this.tablero_actual.arrows_generated.dance_function(); // pone a bailar las flechas
                this.tablero_actual.set_active(true); // hace visible el siguiente tablero
                this.flag = false;
            }
        } else {
            this.fin_del_tuto = true;
            this.flag = false;
        }
    }
    // custom functions
    aparecer(obj, scene) {
        this.tweens.add({
            targets: obj,
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            onComplete: function () {
                if (!scene.eventFinished) {
                    scene.explanation.setText('       Oprime tecla espacio para continuar con el tutorial');
                    scene.eventFinished = true;
                }
            }
        });
    }

    handle_keydown(event) {
        if (this.eventFinished) {
            if (event.keyCode === 32 && this.contador === 0) {
                this.first_phase = true;
            }
        }
    }

    set_status(val) {
      this.flag = val;
    }

    broke_screen() {
      // emiter
      if (this.flag_emitter) {
          this.glass_emitter = this.add.particles(400, 300, 'GlassImg', {
              speed: { min: 200, max: 400 },
              gravityY: 200,
              scale: { start: 0.1, end: 0.01 },
              lifespan: 1000
          });
          this.glass_emitter.setDepth(0);
          this.flag_emitter = false;
          this.time.delayedCall(300, () => {
              this.glass_emitter.stop();
              this.flag_emitter = true;
          });
      }

      this.tweens.add({
          targets: [this.broken_glass],
          alpha: 1,
          duration: 1000,
          ease: 'Power2',
          onComplete: () => {
              this.repair_screen(this);
          }
      });
  }

  repair_screen(scene) {
    scene.tweens.add({
        targets: [scene.broken_glass],
        alpha: 0,
        duration: 1000,
        ease: 'Power2'
    });
  }
  
  feedback(status) {
    let positions = [
        [600, 500],
        [600, 100],
        [200, 100],
        [200, 500]
    ];
    let selected = positions[Math.floor(Math.random() * positions.length)];
    const feedbackMessage = this.add.text(selected[0], selected[1], '', { fontFamily: 'TROUBLE', fontSize: 30 });
    feedbackMessage.setOrigin(0.5);
    feedbackMessage.setScale(0);
    if (status) {
        feedbackMessage.setText('¡Correcto!');
        feedbackMessage.setTint(0x00ff00);
    } else {
        feedbackMessage.setText('¡Incorrecto!');
        feedbackMessage.setTint(0xff0000);
    }
    // Animación de crecimiento del mensaje
    this.tweens.add({
        targets: feedbackMessage,
        scale: 1,
        duration: 500,
        ease: 'Back',
        onComplete: () => {
            // Animación de ocultamiento del mensaje
            this.tweens.add({
                targets: feedbackMessage,
                alpha: 0,
                duration: 500,
                delay: 100, // Retraso antes de que el mensaje se oculte
                onComplete: () => {
                    // Eliminar el mensaje de retroalimentación
                    feedbackMessage.destroy();
                }
            });
        }
    });
  }
}
