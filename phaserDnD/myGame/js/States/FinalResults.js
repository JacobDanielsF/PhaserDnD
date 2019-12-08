var FinalResults = function(game) {};
FinalResults.prototype = {
	preload: function() 
	{
		
	},
	
	//for button to move to next state
	onFinish: function(button, pointer, isOver)
	{
		if (isOver)
		{
			game.state.start('End');
		}
	},
	
	create: function() 
	{
		var background = game.add.image(0, 0, "background_texture");
		background.alpha = .4;
		
		var offset = -65;
		var spacing = 60;

		RText = game.add.text(game.world.centerX, standardTitleHeight + offset, "Total results:", titleTextStyle);
		RText.anchor.x = 0.5;
		RText.anchor.y = 0.5;
		
		CText = game.add.text(game.world.centerX, standardTitleHeight + (spacing * 1.4) + offset, "Class: " + PROPERTIES.CLASS, textStyle);
		CText.anchor.x = 0.5;
		CText.anchor.y = 0.5;
		
		RText = game.add.text(game.world.centerX, standardTitleHeight + (spacing * 2.3) + offset, "Race: " + PROPERTIES.RACE, textStyle);
		RText.anchor.x = 0.5;
		RText.anchor.y = 0.5;
		
		SText = game.add.text(game.world.centerX, standardTitleHeight + (spacing * 3.4) + offset, "Stats:", textStyle);
		SText.anchor.x = 0.5;
		SText.anchor.y = 0.5;
		
		var horizSpacing = 110;
		var index = 0;
		var side = -1;
		
		for (stat in PROPERTIES.STATS)
		{
			//console.log(stat);
			
			StatText = game.add.text(game.world.centerX - (side * horizSpacing), standardTitleHeight + (spacing * 4.2) + offset + (index * (spacing * 0.75)), stat + ": " + PROPERTIES.STATS[stat], textStyle);
			StatText.anchor.x = 0.5;
			StatText.anchor.y = 0.5;
			
			index++;
			
			if (index == 3)
			{
				index = 0;
				side = 1;
			}
		}
		
		var skills = "";
		
		for (skill in PROPERTIES.SKILLS)
		{
			skills += PROPERTIES.SKILLS[skill] + ", ";
		}
		
		skills = skills.substring(0, skills.length - 2);
		
		SkillsText = game.add.text(game.world.centerX, standardTitleHeight + (spacing * 6.9) + offset, "Skills: " + skills, textStyle);
		SkillsText.anchor.x = 0.5;
		SkillsText.anchor.y = 0.5;
		
		
		var button = game.add.button(game.world.centerX, standardTitleHeight + (spacing * 8.35) + offset, 'button', this.onFinish, this, 2, 1, 0);
		button.anchor.x = 0.5;
		button.anchor.y = 0.5;
		button.alpha = .5;
		
		var text = game.add.text(game.world.centerX, standardTitleHeight + (spacing * 8.35) + offset, "Continue", titleTextStyle);
		text.anchor.x = 0.5;
		text.anchor.y = 0.5;
		
		button.scale.setTo((text.width/BUTTON_WIDTH) + 0.15, (text.height/BUTTON_HEIGHT) + 0.3);
	},
	
	update: function() 
	{
		
	}

}
