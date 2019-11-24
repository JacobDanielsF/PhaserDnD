//prefab for all answers to quiz questions
//creates the text object and the button to click on that answer
function ClassButton(game, x, y, key, callbackContext, thisClass) {
	Phaser.Button.call(this, game, x, y, key, onUp, callbackContext, 2, 1, 0);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;

	this.thisClass = thisClass;

	this.alpha = .7;
}

ClassButton.prototype = Object.create(Phaser.Button.prototype);
ClassButton.prototype.constructor = ClassButton;

//when button is pressed, call this funct
function onUp(button, pointer, isOver)
{
	if (isOver)
	{
		PROPERTIES.CLASS = button.thisClass;

		showClasses();
	}
}

//funct to move to results
function showClasses()
{
	game.state.start('Race');
}
