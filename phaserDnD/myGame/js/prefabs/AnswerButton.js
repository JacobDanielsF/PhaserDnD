//prefab for all answers to quiz questions
//creates the text object and the button to click on that answer
function AnswerButton(game, x, y, key, callbackContext, rewards) {
	Phaser.Button.call(this, game, x, y, key, onUpAnswer, callbackContext, 2, 1, 0);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;

	this.rewards = rewards;

	this.alpha = .7;
}

AnswerButton.prototype = Object.create(Phaser.Button.prototype);
AnswerButton.prototype.constructor = AnswerButton;

//when button is pressed, call this funct
function onUpAnswer(button, pointer, isOver)
{
	if (isOver)
	{	
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
