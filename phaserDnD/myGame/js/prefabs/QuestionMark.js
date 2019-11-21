//prefab for all answers to quiz questions
//creates the text object and the button to click on that answer
function QuestionMark(x, y, key, text, game) {
	Phaser.Sprite.call(this, game, x, y, key, 0);

    this.inputEnabled = true;

    this.text = game.add.group();

    //add textbox image
    var backRect = game.add.image(x + 35, y + 35, 'textBox');
    this.text.add(backRect)

    //add text
    var blurbText = game.add.text(x + 45, y + 45, text, textStyle);
    blurbText.fontSize = 18;
    blurbText.fill = '#EEE8FC';

    //adjust textbox size to text
	backRect.width = blurbText.width + 20;
	backRect.height = blurbText.height + 15;
	backRect.alpha = .6;

	//group it!!
    this.text.add(blurbText);
    this.text.alpha = 0;

    //make sure text is always on screen
    if (backRect.x + backRect.width > game.width) {
    	blurbText.x = game.width - blurbText.width - 20;
    	backRect.x = game.width - backRect.width - 10;
    }
}

QuestionMark.prototype = Object.create(Phaser.Sprite.prototype);
QuestionMark.prototype.constructor = QuestionMark;

QuestionMark.prototype.update = function() {
    if (this.input.pointerOver())
    {
        this.text.alpha = 1;
        this.frame = 1;
    }
    else
    {
    	this.text.alpha = 0;
    	this.frame = 0;
    }

}