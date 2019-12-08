
//prefab for all answers to quiz questions
//creates the text object and the button to click on that answer
function QuestionMark(x, y, key, text, game) {
	Phaser.Sprite.call(this, game, x, y, key);

    this.inputEnabled = true;
    this.game = game; 

    //use for keeping track in Update()
    this.pointerOver = false; 

    //add textbox image
    this.backRect = game.add.image(x + 35, y + 35, 'textBox');

    //add text
    this.blurbText = game.add.text(x + 45, y + 45, text, textStyle);
    this.blurbText.fontSize = 18;
    this.blurbText.fill = '#EEE8FC';

    //adjust textbox size to text
	this.backRect.width = this.blurbText.width + 20;
	this.backRect.height = this.blurbText.height + 15;
	this.backRect.alpha = .95;

    //initialize
    this.backRect.alpha = 0;
    this.blurbText.alpha = 0;

    //make sure text is always on screen
    if (this.backRect.x + this.backRect.width > game.width) {
    	this.blurbText.x = game.width - this.blurbText.width - 20;
    	this.backRect.x = game.width - this.backRect.width - 10;
    }
    if (this.backRect.y + this.backRect.height > game.height) {
        this.blurbText.y = game.height - this.blurbText.height - 20;
        this.backRect.y = game.height - this.backRect.height - 10;
    }
}

QuestionMark.prototype = Object.create(Phaser.Sprite.prototype);
QuestionMark.prototype.constructor = QuestionMark;

QuestionMark.prototype.update = function() {
    if (this.input.pointerOver())
    {
        this.backRect.alpha = .8;
        this.blurbText.alpha = 1;

        //prevent flickering 
        if (!this.pointerOver) {
            this.backRect.bringToTop();
            this.blurbText.bringToTop();
        }

        this.pointerOver = true; 
    }
    else
    {
    	this.backRect.alpha = 0;
        this.blurbText.alpha = 0;

        this.pointerOver = false; 
    }

}