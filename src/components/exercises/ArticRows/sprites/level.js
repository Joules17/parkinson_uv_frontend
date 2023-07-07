// import assets 
import arrow_list from './arrow_list'
// custom classes
import steroid_arrow from './steroid_arrow'
import steroid_group from './steroid_group'
export default class Level {
    constructor(config) {
        this.scene = config.scene; 
        this.difficulty = config.difficulty;
        this.pos_initx = config.pos_initx;
        this.pos_inity = config.pos_inity;
        this.game_width = config.game_width;
        this.game_height = config.game_height;
        this.sprite_width = config.sprite_width; 
        this.sprite_height = config.sprite_height;
        this.sprite_scale = config.sprite_scale;  
        this.actual = config.actual; 
        this.tuto_option = config.tuto_option; 

        this.arrows = arrow_list; 
        this.number_arrows = undefined; 
        if (this.difficulty === 'easy') {
            this.number_arrows = 1; 
        } else if (this.difficulty === 'medium') {
            this.number_arrows = 11;
        } else {
            this.number_arrows = 5;
        }
        this.arrows_generated = new steroid_group({
            scene: this.scene,
            correct_option: undefined, 
            active: this.actual
        });
        this.option_list = ['right', 'up', 'left', 'down']; 
        this.tricky_list = ['good', 'bad']; 

        this.gen_env(); 
    }

    checkOverlap(spriteA, spriteB) {
        const spriteABounds = spriteA.getBounds();
        const spriteBBounds = spriteB.getBounds();
    
        const paddedBoundsA = new Phaser.Geom.Rectangle(spriteABounds.x - this.padding, spriteABounds.y - this.padding, spriteABounds.width + 2 * this.padding, spriteABounds.height + 2 * this.padding);
        return Phaser.Geom.Rectangle.Overlaps(paddedBoundsA, spriteBBounds);
    }

    crear_matriz(key, correct_option) {
        const sprites = []; 
        const total_sprites = this.number_arrows; 
        let retryAttempts = 0; 
        for (let i = 0; i < total_sprites; i++) {
            let valid_position = false; 
            let posx_gen, posy_gen; 
            let attempts = 0; 
            const maxAttempts = 100; 
            
            while (!valid_position) {
                if (attempts >= maxAttempts) {
                    if (retryAttempts >= maxAttempts) {
                        console.log('No se pudo crear la matriz')
                        break; 
                    } else {
                        sprites.forEach(sprite => sprite.destroy());
                        this.arrows_generated = undefined;
                        this.arrows_generated = new steroid_group({
                            scene: this.scene,
                            correct_option: correct_option,
                            active: this.actual
                        }); 
                        sprites.length = 0;
                        attempts = 0;
                        retryAttempts++;
                        i = -1; 
                        break; 
                    }
                }
                posx_gen = this.pos_initx + Math.random() * (this.game_width - this.sprite_width);
                posy_gen = this.pos_inity + Math.random() * (this.game_height - this.sprite_height);
                // overlap? 
                valid_position = true; 
                for (let j = 0; j < sprites.length; j++) {
                    if (this.checkOverlap({ getBounds: () => new Phaser.Geom.Rectangle(posx_gen, posy_gen, this.sprite_width, this.sprite_height)}, sprites[j])) {
                        valid_position = false; 
                        break; 
                    }
                }
                attempts++; 
            }
            if (valid_position) {
                let objSprt = new steroid_arrow({
                    scene: this.scene,
                    posx: posx_gen, 
                    posy: posy_gen, 
                    key: key, 
                    correct_option: correct_option,
                    original_scale: this.sprite_scale, 
                    active: this.actual
                }); 

                objSprt.setDepth(5)
                this.arrows_generated.add(objSprt);
                sprites.push(objSprt); 
            }
        }
    }

    crear_patron(correct_option) {
        var positions = [
            [[(this.game_width)/2, (this.game_height)/2], [(this.game_width)/2, 200], [(this.game_width)/2, 400], [300, (this.game_height)/2], [500, (this.game_height)/2]], 
            [[(this.game_width)/2, (this.game_height)/2], [(this.game_width)/2, 200], [(this.game_width)/2, 100], [(this.game_width)/2, 400], [(this.game_width)/2,500]],
            [[500, (this.game_height)/2], [(this.game_width)/2, 200], [(this.game_width)/2, 400], [300, 100], [300, 500]],
            [[(this.game_width)/2, 400], [300, (this.game_height)/2], [500, (this.game_height)/2], [200, 200], [600, 200]],
            [[300, (this.game_height)/2], [(this.game_width)/2, 200], [(this.game_width)/2, 400], [500, 100], [500, 500]], 
            [[(this.game_width)/2, 200], [300, (this.game_height)/2], [500, (this.game_height)/2], [200, 400], [600, 400]], 
            [[(this.game_width)/2, (this.game_height)/2], [300, (this.game_height)/2], [200, (this.game_height)/2], [500, (this.game_height)/2], [600, (this.game_height)/2]]
        ]

        let selected = positions[Math.floor(Math.random() * positions.length)];

        this.arrows_generated = undefined; 
        this.arrows_generated = new steroid_group({
            scene: this.scene,
            correct_option: correct_option,
            active: this.actual
        });

        let opposite = undefined; 
        opposite = 
        correct_option === 'right' ? 'left' : 
        correct_option === 'left' ? 'right' :
        correct_option === 'up' ? 'down' :
        correct_option === 'down' ? 'up' : undefined;

        for (let i = 0; i < selected.length; i++) {
            if (i === 0) {
                this.arrows_generated.add(
                    new steroid_arrow({
                        scene: this.scene,
                        posx: selected[i][0],
                        posy: selected[i][1],
                        key: 'frozen_'+correct_option,
                        correct_option: correct_option,
                        original_scale: this.sprite_scale
                    }));  
            } else {
                this.arrows_generated.add(
                    new steroid_arrow({
                        scene: this.scene,
                        posx: selected[i][0],
                        posy: selected[i][1],
                        key: 'frozen_'+opposite,
                        correct_option: correct_option,
                        original_scale: this.sprite_scale
                    })); 
            }
        }
    }

    gen_env() {
        var chosen_option = Math.floor(Math.random() * this.option_list.length);
        var tricky_option; 
        if (this.tuto_option === undefined) {
            tricky_option = Math.floor(Math.random() * this.tricky_list.length);
        } else {
            tricky_option = this.tuto_option
        }        
        var correct_option = undefined; 
        if (this.tricky_list[tricky_option] === 'good') {
            correct_option = this.option_list[chosen_option];
        } else {
            if  (chosen_option === 0 || chosen_option === 1) {
                correct_option = this.option_list[chosen_option + 2];
            } else {
                correct_option = this.option_list[chosen_option - 2]; 
            }
        }
        // console.log('key:', this.arrows[this.tricky_list[tricky_option]][this.option_list[chosen_option]]['key'], ' correctOption ', correct_option)
        
        this.arrows_generated.set_correct_option(correct_option)
        if (this.difficulty === 'easy') {
            this.arrows_generated.add(
                new steroid_arrow({
                    scene: this.scene,
                    posx: 400, 
                    posy: 300, 
                    key: this.arrows[this.tricky_list[tricky_option]][this.option_list[chosen_option]]['key'], 
                    correct_option: correct_option,
                    original_scale: this.sprite_scale
                })
            );  
        } else if (this.difficulty === 'medium') {
            this.crear_matriz(this.arrows[this.tricky_list[tricky_option]][this.option_list[chosen_option]]['key'], correct_option)
        } else {
            this.crear_patron(correct_option); 
        }
        
        // console.log('Se ha creado un nivel con las siguientes flechas: ')
        /*
        for (let j = 0; j < this.arrows_generated.getChildren().length; j++) {
            console.log(this.arrows_generated.getChildren()[j]);
        }
        */
        this.arrows_generated.mostrar(this.actual) 
        return this.arrows_generated;

    }

    // Funcion para hacer invisible el nivel / visible el nivel al igual que dormir los listeners de cada nivel
    set_active(bool) {
        this.arrows_generated.mostrar(bool); 
    }
}