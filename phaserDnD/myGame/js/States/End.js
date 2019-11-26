var End = function(game) {};
End.prototype = {
	preload: function() 
	{
		
	},
	
	//for button to move to next state
	onUp: function(button, pointer, isOver)
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
			
			game.state.start('Question');
		}
	},
	
	create: function() 
	{
		//add title text
		title = game.add.text(game.world.centerX, 175, "Your results:", titleTextStyle);
		title.anchor.x = 0.5;
		title.anchor.y = 0.5;
		
		classText = game.add.text(game.world.centerX, 280, "Class: " + PROPERTIES.CLASS, textStyle);
		classText.anchor.x = 0.5;
		classText.anchor.y = 0.5;
		
		raceText = game.add.text(game.world.centerX, 340, "Race: " + PROPERTIES.RACE, textStyle);
		raceText.anchor.x = 0.5;
		raceText.anchor.y = 0.5;
		
		var button = game.add.button(game.world.centerX, standardTitleHeight + (100 * 3.25), 'button', this.onUp, this, 2, 1, 0);
		button.anchor.x = 0.5;
		button.anchor.y = 0.5;
		button.alpha = .5;
		
		var text = game.add.text(game.world.centerX, standardTitleHeight + (100 * 3.25) + 4, "Restart quiz", titleTextStyle);
		text.anchor.x = 0.5;
		text.anchor.y = 0.5;
		
		button.scale.setTo((text.width/BUTTON_WIDTH) + 0.15, (text.height/BUTTON_HEIGHT) + 0.3);
	},
	
	update: function() 
	{
		
	}
}
