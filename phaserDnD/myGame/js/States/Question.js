var Question = function(game) {};
Question.prototype = {

	create: function()
	{
		//console.log(PROPERTIES.CLASS_BUCKETS);
		
		//Add question text
		QVal = "Q" + PROPERTIES.QUESTION;
		
		QData = CLASS_QUESTIONS[QVal];
		Q = QData.Q;
		
		QText = game.add.text(game.world.centerX, standardTitleHeight, Q, titleTextStyle);
		QText.anchor.x = 0.5;
		QText.anchor.y = 0.5;

		//iterate through the num of answers for the question
		for (let i = 0; i < Object.keys(QData.A).length; i++) {

			//create button for the answer	
			button = new AnswerButton(game, game.world.centerX, standardTextHeight + (75 * i), 'button',
				this, QData.A[i].REWARD);
			game.add.existing(button);
			
			//put the answer text over the button
			var answerText = game.add.text(game.world.centerX, standardTextHeight + (75 * i) + 3, 
				QData.A[i].TEXT, textStyle);
			answerText.anchor.x = 0.5;
			answerText.anchor.y = 0.5;

			//scale the button to the size of the text
			button.scale.setTo((answerText.width/BUTTON_WIDTH) + 0.15, 
				(answerText.height/BUTTON_HEIGHT) + 0.3);
		}
	},
}