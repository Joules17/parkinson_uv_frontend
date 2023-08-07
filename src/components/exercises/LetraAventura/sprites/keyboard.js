export default class keyboard {
    constructor(scene, total_width, x, y, keySize, keys, textStyle, onKeyPress) {
        this.scene = scene;
        this.total_width = total_width;
        this.x = x;
        this.y = y;
        this.keySize = keySize;
        this.keys = keys;
        this.textStyle = textStyle;
        this.onKeyPress = onKeyPress;
        this.buttons = [];

        this.createKeyboard();
    }

    createKeyboard() {
        const numRows = Math.ceil(this.keys.length / 10);
        const numKeysFirstRow = 10;
        const numKeysSecondRow = 9;
        const numKeysThirdRow = this.keys.length - (numKeysFirstRow + numKeysSecondRow);

        const totalKeysWidthFirstRow = numKeysFirstRow * this.keySize * 1.5;
        const totalKeysWidthSecondRow = numKeysSecondRow * this.keySize * 1.5;
        const totalKeysWidthThirdRow = numKeysThirdRow * this.keySize * 1.5;

        const startXFirstRow = this.x + (this.total_width - totalKeysWidthFirstRow) / 2;
        const startXSecondRow = this.x + (this.total_width - totalKeysWidthSecondRow) / 2;
        const startXThirdRow = this.x + (this.total_width - totalKeysWidthThirdRow) / 2;

        let currentX, numKeysInRow;

        for (let i = 0; i < numRows; i++) {
            let rowKeys;

            if (i === 0) {
                rowKeys = this.keys.slice(0, numKeysFirstRow);
                numKeysInRow = numKeysFirstRow;
                currentX = startXFirstRow;
            } else if (i === 1) {
                this.y = this.y + this.keySize * 1.5;
                rowKeys = this.keys.slice(numKeysFirstRow, numKeysFirstRow + numKeysSecondRow);
                numKeysInRow = numKeysSecondRow;
                currentX = startXSecondRow;
            } else {
                this.y = this.y + this.keySize * 1.5;
                rowKeys = this.keys.slice(numKeysFirstRow + numKeysSecondRow);
                numKeysInRow = numKeysThirdRow;
                currentX = startXThirdRow;
            }

            for (let j = 0; j < numKeysInRow; j++) {
                const key = rowKeys[j];
                this.scene.add
                    .graphics()
                    .fillCircle(currentX, this.y, this.keySize * 0.7)
                    .fillStyle(0xffffff, 1);
                const button = this.scene.add
                    .text(currentX, this.y, key, this.textStyle)
                    .setOrigin(0.5)
                    .setFontSize(this.keySize)
                    .setInteractive({ useHandCursor: true })
                    .on('pointerdown', () => {
                        if (this.scene.write_flag) {
                            this.onKeyPress(key);
                        }
                    })
                    .on('pointerover', () => {
                        button.setFill('#FF0000');
                    })
                    .on('pointerout', () => {
                        button.setFill('#000000'); 
                    });

                this.buttons.push(button);

                currentX += this.keySize * 1.5;
            }
        }
    }
}
