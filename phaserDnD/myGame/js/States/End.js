var End = function(game) {};
End.prototype = {
	preload: function() 
	{
		
	},
	
	onUpSurvey: function(button, pointer, isOver)
	{
		if (isOver)
		{
			window.open("https://forms.gle/JF27D4gyDng3nSjQ6", "_blank");
		}
	},
	
	//for button to move to next state
	onUpQuizReset: function(button, pointer, isOver)
	{
		if (isOver)
		{
			for (var key in PROPERTIES.CLASS_BUCKETS)
			{
				PROPERTIES.CLASS_BUCKETS[key] = 0;
			}
			
			PROPERTIES.QUESTION = 1;
			PROPERTIES.CLASS = null;
			PROPERTIES.RACE = null;
			PROPERTIES.SKILLS = [];

			for (var key in PROPERTIES.STATS)
			{
				PROPERTIES.STATS[key] = 0;
			}

			game.state.start('Question');
		}
	},
	
	create: function() 
	{
		/*
		//add title text
		title = game.add.text(game.world.centerX, 165, "Your results:", titleTextStyle);
		title.anchor.x = 0.5;
		title.anchor.y = 0.5;
		
		classText = game.add.text(game.world.centerX, 270, "Class: " + PROPERTIES.CLASS, textStyle);
		classText.anchor.x = 0.5;
		classText.anchor.y = 0.5;
		
		raceText = game.add.text(game.world.centerX, 330, "Race: " + PROPERTIES.RACE, textStyle);
		raceText.anchor.x = 0.5;
		raceText.anchor.y = 0.5;
		*/
		
		var surveyButton = game.add.button(game.world.centerX, 290, 'button', this.onUpSurvey, this, 2, 1, 0);
		surveyButton.anchor.x = 0.5;
		surveyButton.anchor.y = 0.5;
		surveyButton.alpha = .5;
		
		var surveyText = game.add.text(game.world.centerX, 290 + 4, "Please fill out our survey!", titleTextStyle);
		surveyText.anchor.x = 0.5;
		surveyText.anchor.y = 0.5;
		
		surveyButton.scale.setTo((surveyText.width/BUTTON_WIDTH) + 0.15, (surveyText.height/BUTTON_HEIGHT) + 0.3);
		
		
		var button = game.add.button(game.world.centerX, 410, 'button', this.onUpQuizReset, this, 2, 1, 0);
		button.anchor.x = 0.5;
		button.anchor.y = 0.5;
		button.alpha = .5;
		
		var text = game.add.text(game.world.centerX, 410 + 4, "Restart quiz", titleTextStyle);
		text.anchor.x = 0.5;
		text.anchor.y = 0.5;
		
		button.scale.setTo((text.width/BUTTON_WIDTH) + 0.15, (text.height/BUTTON_HEIGHT) + 0.3);
	},
	
	update: function()
	{
		
	}
}
