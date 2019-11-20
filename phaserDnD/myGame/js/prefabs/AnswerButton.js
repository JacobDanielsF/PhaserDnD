//prefab for all answers to quiz questions
//creates the text object and the button to click on that answer
function AnswerButton(game, x, y, key, callbackContext, rewards) {
	Phaser.Button.call(this, game, x, y, key, onUp, callbackContext, 2, 1, 0);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;

	this.rewards = rewards;
}

AnswerButton.prototype = Object.create(Phaser.Button.prototype);
AnswerButton.prototype.constructor = AnswerButton;

//when button is pressed, call this funct
function onUp(button, pointer, isOver)
{
	console.log("button pressed!");
	console.log(isOver);
	if (isOver)
	{	
		// rewards = rewards;
			console.log(button.rewards);

		for (var k = 0; k < button.rewards.length; k++)
		{
			PROPERTIES.CLASS_BUCKETS[button.rewards[k]]++;
		}

		nextState();
	}

}

//funct to move to results
function nextState()
{
	if (PROPERTIES.QUESTION < Object.keys(CLASS_QUESTIONS).length)
	{
		PROPERTIES.QUESTION++;
		game.state.start('Question');
	}
	else
	{
		PROPERTIES.QUESTION = 0;
		game.state.start('Results');
	}
}
