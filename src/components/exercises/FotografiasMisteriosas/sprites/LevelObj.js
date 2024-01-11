// custom classes imported
import object_list from 'components/exercises/general_assets/images/objects/object_list.js';
import SteroidObject from './Steroid_Object';
import Panel_Question from './Panel_Question';

export default class LevelObj {
    // Nota: Key: Skin: Imagen a la que hace referencia la fruta
    constructor(config) {
        this.scene = config.scene;
        this.number_objects = config.number_objects;
        this.category = config.category;
        this.actual = config.actual;
        this.objects = object_list;

        // arrays
        this.final_matrix = undefined;
        this.final_not_matrix = undefined;

        // questions
        this.final_questions = undefined;
        this.panel_question_gen_array = [];
        this.sprite_group = this.scene.add.group();
        this.current_index = 0;
        this.crear_matriz();
    }

    gen_objects(category, object_list, number_objects) {
        // Ciclo para buscar categoria
        let mergeCategory = [];

        // Se agregan todos los objetos disponibles
        for (let i = 0; i < category.length; i++) {
            mergeCategory = mergeCategory.concat(Object.values(object_list[category[i]]));
        }

        // revolvemos los objetos
        mergeCategory.sort(() => Math.random() - 0.5);

        // Se obtiene el grupo para el nivel
        this.final_matrix = mergeCategory.slice(0, number_objects);

        // Remaining objects
        this.final_not_matrix = mergeCategory.filter((obj) => !this.final_matrix.includes(obj));

        return {
            final_matrix: this.final_matrix,
            final_not_matrix: this.final_not_matrix
        };
    }

    get_random_object(array, used_objects) {
        let randomObject;
        do {
            randomObject = array[Math.floor(Math.random() * array.length)];
        } while (used_objects.some((item) => item[0] === randomObject));

        return randomObject;
    }

    gen_questions() {
        const final_questions = [];

        for (let i = 0; i < this.final_matrix.length; i++) {
            let questions = [];
            questions.push([this.final_matrix[i], true]);

            while (questions.length < 3) {
                questions.push([this.get_random_object(this.final_not_matrix, questions), false]);
            }

            questions.sort(() => Math.random() - 0.5);
            final_questions.push(questions);
        }

        return final_questions;
    }

    crear_matriz() {
        console.log('genera sprt');
        this.gen_objects(this.category, this.objects, this.number_objects);
        this.final_questions = this.gen_questions(this.final_matrix, this.final_not_matrix);
        const sprites = [];

        // arreglo para ir sacando los objetos
        for (let i = 0; i < this.number_objects; i++) {
            let objetoSacado = this.final_matrix[i];
            console.log(objetoSacado);
            let objSprt = new SteroidObject({
                scene: this.scene,
                posx: 400,
                posy: 300,
                key: objetoSacado['key']
            });

            objSprt.setScale(0.4);
            objSprt.setDepth(5);
            this.sprite_group.add(objSprt);
            sprites.push(objSprt);
        }

        // create questions
        for (let j = 0; j < this.final_questions.length; j++) {
            this.panel_question_gen_array.push(
                new Panel_Question({
                    scene: this.scene,
                    level: this,
                    order: j + 1,
                    questions: this.final_questions[j],
                    active: false
                })
            );
        }
    }

    show_objects() {
        let index = 0;
        const displayedObjects = [];

        // Creamos un temporizador que se ejecutará cada segundo
        const timer = this.scene.time.addEvent({
            delay: 2000,
            callback: () => {
                const objetoActual = this.sprite_group.children.entries[index];
                this.scene.sound.play('CameraSound');
                objetoActual.setVisible(true);
                displayedObjects.push(objetoActual);

                index++;

                this.scene.time.delayedCall(2000, () => {
                    objetoActual.setVisible(false);
                });

                if (index === this.number_objects) {
                    this.scene.time.delayedCall(2000, () => {
                        timer.remove();
                        this.scene.objectsDisplayed(displayedObjects);
                        this.panel_question_gen_array[this.current_index].mostrar();
                    });
                }
            },
            callbackScope: this,
            repeat: this.number_objects - 1
        });
    }

    mostrarSiguientePregunta() {
        if (this.current_index < this.panel_question_gen_array.length - 1) {
            if (this.scene.scene.key === 'FotografiasGame') {
                console.log(this.scene, 'QUE PUTAS PASA');
                // Time Settings
                this.scene.tiempo_rondas.push(this.scene.tiempo_por_ronda);
                this.scene.tiempo_por_ronda = 0;
                this.scene.current_round++;
                // Level Settings
                this.scene.text_level.setText('Nivel: ' + this.scene.current_level + '-' + this.scene.current_round);
                // ---
            }

            this.current_index++;
            this.panel_question_gen_array[this.current_index].mostrar();
        } else {
            console.log('¡No hay más preguntas!');
            this.scene.show_questions(0);
            if (this.scene.scene.key === 'FotografiasGame') {
                this.scene.current_level++;
                if (this.scene.current_level === this.scene.number_levels+1) {
                    this.scene.show_last_message();
                } else {
                    this.scene.levelObj = this.scene.levels[this.scene.current_level-1];
                    this.scene.text_level.setText('Nivel: ' + this.scene.current_level + '-' + this.scene.current_round++);
                    this.scene.shade_circle.setAlpha(1);
                    this.scene.base_circle.setAlpha(1); 
                    this.scene.count_back(3, () => {
                        this.scene.flashScreen();
                        this.scene.levelObj.show_objects();
                    });
                }
            } else {
                this.scene.show_last_message();
            }
        }
    }
}
