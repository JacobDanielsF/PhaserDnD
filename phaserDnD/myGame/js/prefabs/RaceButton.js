//prefab for all answers to quiz questions
//creates the text object and the button to click on that answer
function RaceButton(game, x, y, key, callbackContext, thisRace) {
	Phaser.Button.call(this, game, x, y, key, onUpRace, callbackContext, 2, 1, 0);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;

	this.thisRace = thisRace;

	this.alpha = .7;
}

RaceButton.prototype = Object.create(Phaser.Button.prototype);
RaceButton.prototype.constructor = RaceButton;

//when button is pressed, call this funct
function onUpRace(button, pointer, isOver)
{
	if (isOver)
	{
		PROPERTIES.RACE = button.thisRace;

		showEnd();
	}
}

//funct to move to results
function showEnd()
{
	game.state.start('End');
}
