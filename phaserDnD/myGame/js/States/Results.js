var Results = function(game) {};
Results.prototype = {
	preload: function() 
	{
		
	},
	
	create: function() 
	{
		RText = game.add.text(game.world.centerX, 200, "Your results:", titleTextStyle);
		RText.anchor.x = 0.5;
		RText.anchor.y = 0.5;
		
		var temp = ["Fighter", "Barbarian", "Paladin", "Cleric", "Rogue", "Bard", "Ranger", "Sorcerer", "Warlock", "Wizard", "Monk", "Druid"],
		temp = Shuffle(temp);
		var results = [];
		
		for (var i = 0; i < 4; i++)
		{
			var bestScore = 0;
			var bestClass = null;
			
			for (var c = 0; c < temp.length; c++)
			{
				if (!results.includes(temp[c]))
				{
					var thisBucket = PROPERTIES.CLASS_BUCKETS[temp[c]];
					
					if (thisBucket > bestScore)
					{
						bestScore = thisBucket;
						bestClass = temp[c];
					}
				}
			}
			
			results.push(bestClass);
		}
		
		for (var i = 0; i < results.length; i++)
		{
			var num = i+1;
			var newString = num + ": " + results[i] + " (+" + PROPERTIES.CLASS_BUCKETS[results[i]] + ")";
			
			newText = game.add.text(game.world.centerX - 90, 300 + (50*i), newString, textStyle);
			newText.anchor.x = 0;
			newText.anchor.y = 0.5;
		}
		
		function onUp(button, pointer, isOver)
		{
			for (var key in PROPERTIES.CLASS_BUCKETS)
			{
				PROPERTIES.CLASS_BUCKETS[key] = 0;
			}
			
			if (isOver)
			{
				PROPERTIES.QUESTION = 1;
				game.state.start('Question');
			}
		}
		
		button = game.add.button(game.world.centerX, game.world.centerY + 140, 'button', onUp, this, 2, 1, 0);
		button.anchor.x = 0.5;
		button.anchor.y = 0.5;
		button.alpha = .5;

		buttonText = game.add.text(game.world.centerX, game.world.centerY + 143, 'Restart Quiz', textStyle);
		buttonText.anchor.x = 0.5;
		buttonText.anchor.y = 0.5;
		
		button.scale.setTo((buttonText.width/BUTTON_WIDTH) + 0.15, (buttonText.height/BUTTON_HEIGHT) + 0.3);
	},
	
	update: function() 
	{
		
	}

}

function Shuffle(t){
	var n = t.length-1;
	while (n >= 0) {
		var k = game.rnd.integerInRange(0, n);
		var temp = t[n];
		t[n] = t[k];
		t[k] = temp;
		n--;
	}
	return t;
}