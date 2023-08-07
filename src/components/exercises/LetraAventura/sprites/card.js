export default class Card {
    constructor(scene, x, y, letter, visible, covered) {
        // variables
        this.scene = scene; 
        this.x = x;
        this.y = y;
        this.letter = letter;
        // visible of the CARD
        this.visible = visible;
        // visible of the LETTER
        this.covered = covered; 

        // fondo de la tarjeta: 
        this.card_width = 70; 
        this.card_height = 80; 
        this.card_radius = 10; 
        this.card_graphics = this.scene.add.graphics();
        this.card_graphics.fillStyle(0xffffff, 1);
        this.card_graphics.fillRoundedRect(this.x, this.y, this.card_width, this.card_height, this.card_radius);

        this.letter_text = this.scene.add.text(this.x + 20, this.y + 15, this.letter, { fontFamily: 'ComicSans', color: "#0000FF"}).setFontSize(50); 
        
        this.letter_text.setVisible(this.covered);
        this.card_graphics.setVisible(this.visible); 
        
    }

    set_letter(letter) {
        this.letter = letter;
        this.letter_text.setText(letter);
    }

    set_covered(val) {
        this.covered = val; 
        this.letter_text.setVisible(val);
    }

    set_visible(val) {
        this.visible = val; 
        this.card_graphics.setVisible(val)
    }
    
}