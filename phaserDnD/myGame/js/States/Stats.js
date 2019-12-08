var Stats = function(game) {};
Stats.prototype = {
	preload: function() 
	{
				game.load.image('textBox', 'assets/img/textbox.png');

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
		var background = game.add.image(0, 0, "background_texture");
		background.alpha = .4;

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
		
		var text = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
		
		var topText = game.add.text(game.world.centerX, 60, 
			"Your ability scores:", titleTextStyle);
		topText.anchor.x = 0.5;
		topText.anchor.y = 0.5;
		
		var statsText = game.add.text(game.world.centerX, 125, 
			"Stats describe your character's physical and mental prowess.\nStats range from 0-20, with 20 meaning your character is godly at that skill!", textStyle);
		statsText.anchor.x = 0.5;
		statsText.anchor.y = 0.5;
    	statsText.fontSize = 26;

		var statsText = game.add.text(game.world.centerX, 203, 
			"The parenthesis next to each stat represent how much that stat helps\n(a positive number) " +
			"or hinders (a negative number) your character.", textStyle);
		statsText.anchor.x = 0.5;
		statsText.anchor.y = 0.5;
    	statsText.fontSize = 26;

		statsText = game.add.text(game.world.centerX, 270, "Feel free to edit these stats! (Make sure to ask your Dungeon Master)!", textStyle);
		statsText.fontSize = "22px"; 
		statsText.fontStyle = "italic";
		statsText.anchor.x = 0.5;
		statsText.anchor.y = 0.5;

		var height = 90;
		numCols = 2; 
		colWidth = 300; 
		startX = 300;
		for (let i = 0; i < 6; i++)
		{
			var labelText = game.add.text(startX + (colWidth * (i % numCols)) - 15, 330 + (height * Math.floor(i / numCols)), 
				text[i] + ":", textStyle);
			labelText.anchor.x = 1;
			labelText.anchor.y = 0.5;
			
			//add in textbox and (+#) text
			var adjustForInputHeight = 25;
			var stat = new StatTextBox(game, startX + (colWidth * (i % numCols)), 330 + (height * Math.floor(i / numCols)) - adjustForInputHeight,
			 newStats[i], text[i]);
			game.add.existing(stat);

			//add in tooltip on hover
			var tooltip = new QuestionMark(startX + (colWidth * (i % numCols)) - labelText.width - 15, 330 + (height * Math.floor(i / numCols)) - 20,
				'textBox', STAT_DESCRIPTIONS[text[i]], game);
			tooltip.width = labelText.width;
			tooltip.height = labelText.height;
			tooltip.alpha = 0;
			game.add.existing(tooltip);

		}
		

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
		
		var text = game.add.text(game.world.centerX, 620 + 8, "Continue", titleTextStyle);
		text.anchor.x = 0.5;
		text.anchor.y = 0.5;
		
		button.scale.setTo((text.width/BUTTON_WIDTH) + 0.15, (text.height/BUTTON_HEIGHT) + 0.3);
	},
	
	update: function() 
	{

	}
}
