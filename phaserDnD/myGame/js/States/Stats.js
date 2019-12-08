var Stats = function(game) {};
Stats.prototype = {
	preload: function() 
	{
		
	},
	
	onContinue: function(button, pointer, isOver)
	{
		if (isOver)
		{
			game.state.start('Skills');
		}
	},

	create: function() 
	{
		//add input plugin
		game.add.plugin(PhaserInput.Plugin);

		var baseStats = [15, 14, 13, 12, 10, 8];
		
		var baseGuide = STAT_GUIDE[PROPERTIES.CLASS];

		var guide = [];
		
		for (let i = 0; i < baseGuide.length; i++)
		{
			if (typeof(baseGuide[i]) == "object")
			{
				//console.log(baseGuide[i]);
				var temp = Shuffle(baseGuide[i]);
				var newValue = false;
				
				for (let j = 0; j < temp.length; j++)
				{
					if (newValue == false)
					{
						var exists = false;
						
						for (let k = 0; k < guide.length; k++)
						{
							if (guide[k] == temp[j])
							{
								exists = true;
							}
						}
						
						if (exists == false)
						{
							guide.push(temp[j]);
							newValue = true;
						}
					}
				}
			}
			else
			{
				guide.push(baseGuide[i]);
			}
		}
		
		//console.log(guide);
		
		var newStats = [0, 0, 0, 0, 0, 0];
		
		var bonus = ABILITY_SCORE[PROPERTIES.RACE];

		for (let i = 0; i < guide.length; i++)
		{
			newStats[guide[i]] = baseStats[i] + bonus[i];
		}
		
		//console.log(newStats);
		
		var height = 60;
		var text = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
		
		var topText = game.add.text(game.world.centerX, 100, 
			"Your ability scores:", titleTextStyle);
		topText.anchor.x = 0.5;
		topText.anchor.y = 0.5;
		
		for (let i = 0; i < 6; i++)
		{
			var labelText = game.add.text(game.world.centerX - 20, 320 - (height * 2.5) + (i * height), 
				text[i], textStyle);
			labelText.anchor.x = 1;
			labelText.anchor.y = 0.5;
			
			//add in textbox and (+#) text
			var adjustForInputHeight = 25;
			var stat = new StatTextBox(game, game.world.centerX, 320 - (height * 2.5) + (i * height) - adjustForInputHeight,
			 newStats[i], text[i]);
			game.add.existing(stat);
		}
		
		classText = game.add.text(game.world.centerX, 525, "Feel free to edit these stats! (Make sure to ask your Dungeon Master)!", textStyle);
		classText.fontSize = "22px"; 
		classText.fontStyle = "italic";
		classText.anchor.x = 0.5;
		classText.anchor.y = 0.5;

		classText = game.add.text(game.world.centerX - 120, 575, "Class: " + PROPERTIES.CLASS, textStyle);
		classText.anchor.x = 0.5;
		classText.anchor.y = 0.5;
		
		raceText = game.add.text(game.world.centerX + 120, 575, "Race: " + PROPERTIES.RACE, textStyle);
		raceText.anchor.x = 0.5;
		raceText.anchor.y = 0.5;
		
		
		var button = game.add.button(game.world.centerX, 620, 'button', this.onContinue, this, 2, 1, 0);
		button.anchor.x = 0.5;
		button.anchor.y = 0.5;
		button.alpha = .5;
		
		var text = game.add.text(game.world.centerX, 620 + 4, "Continue", titleTextStyle);
		text.anchor.x = 0.5;
		text.anchor.y = 0.5;
		
		button.scale.setTo((text.width/BUTTON_WIDTH) + 0.15, (text.height/BUTTON_HEIGHT) + 0.3);
	},
	
	update: function() 
	{

	}
}
