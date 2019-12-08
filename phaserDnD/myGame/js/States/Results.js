var Results = function(game) {};
Results.prototype = {
	preload: function() 
	{
		
	},
	
	create: function() 
	{
		var background = game.add.image(0, 0, "background_texture");
		background.alpha = .4;

		RText = game.add.text(game.world.centerX, standardTitleHeight - 20, "Your class results", titleTextStyle);
		RText.anchor.x = 0.5;
		RText.anchor.y = 0.5;
		
		SText = game.add.text(game.world.centerX, standardTitleHeight + 50, "Please select a class.", textStyle);
		SText.anchor.x = 0.5;
		SText.anchor.y = 0.5;
		
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
			/*
			var num = i+1;
			var newString = num + ": " + results[i] + " (+" + PROPERTIES.CLASS_BUCKETS[results[i]] + ")";
			
			newText = game.add.text(game.world.centerX - 90, standardTextHeight + (50*i), newString, textStyle);
			newText.anchor.x = 0;
			newText.anchor.y = 0.5;
			*/
			
			//create button for the answer	
			button = new ClassButton(game, game.world.centerX - 230, standardTextHeight + (60 * i), 'button',
				this, results[i]);
			game.add.existing(button);
			
			//put the answer text over the button
			var classText = game.add.text(game.world.centerX - 245, standardTextHeight + (60 * i) + 3, 
				results[i], textStyle);
			classText.anchor.x = 1;
			classText.anchor.y = 0.5;

			//scale the button to the size of the text
			button.scale.setTo((classText.width/BUTTON_WIDTH) + 0.15, 
				(classText.height/BUTTON_HEIGHT) + 0.3);
			button.anchor.x = 1;
			button.anchor.y = 0.5;

			var extraText = game.add.text(game.world.centerX - 195, standardTextHeight + (60 * i) + 3, 
				CLASS_DESCRIPTIONS[results[i]], smallTextStyle);
			extraText.anchor.x = 0;
			extraText.anchor.y = 0.5;
		}
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