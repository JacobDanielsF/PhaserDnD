var Race = function(game) {};
Race.prototype = {

	preload: function() 
	{
		game.load.image('tempElf', 'assets/img/temp_elf.png');
		game.load.spritesheet('questionMark', 'assets/img/temp_question_mark.png', 48, 45,2);
		game.load.image('questionMark', 'assets/img/temp_question_mark.png');
		game.load.image('textBox', 'assets/img/textbox.png');
		game.load.atlas('races', 'assets/img/races.png', 'assets/img/races.json');
	},

	create: function()
	{
		//add title text
		QText = game.add.text(game.world.centerX, 75, "Select your character's race!", titleTextStyle);
		QText.anchor.x = 0.5;
		QText.anchor.y = 0.5;
		
		suggestions = RACE_SUGGESTIONS[PROPERTIES.CLASS];

		//add "Class needs ___ stat" text
		tipText = game.add.text(game.world.centerX, 130, suggestions.TIP, textStyle);
		tipText.anchor.x = 0.5;
		tipText.anchor.y = 0.5;
		tipText.fontStyle = "italic";
		
		
		suggestionsLength = Object.keys(suggestions).length - 1; 
		//how far apart each icon group should be
		horizontalSpacing = game.world.width/(suggestionsLength* 2); 
		//actual x position of each icon group
		var xPosition = horizontalSpacing;
		for (var i = 0; i < Object.keys(suggestions).length - 1; i++)
		{
			
			if (i > 0) 
				xPosition += horizontalSpacing*2; 

			//adjust this to move entire icon/text block up or down
			verticalSpacing = 210; 

			var statClasses = suggestions[i];
			
			//add "these classes provide ____ stat!" text
			//game.world.width - xPosition because otherwise the toolTips will overlap strangely (basicaly reverse everything)
			var raceStatText = game.add.text(game.world.width - xPosition, verticalSpacing, statClasses.TEXT, textStyle);
		    raceStatText.anchor.x = 0.5;
		    raceStatText.anchor.y = 0.5;
			raceStatText.wordWrap = true;
			raceStatText.wordWrapWidth = horizontalSpacing*2;		

			var races = statClasses.RACES;
			
			//add race icons in
			raceIcons = game.add.group();
			for (var j = 0; j < races.length; j++)
			{
				race = races[j];
				var icon = new RaceIcon(xPosition, verticalSpacing + 50, 'races', race, game);
				game.add.existing(icon);
				icon.anchor.x = .5;
				icon.anchor.y = .5; 

				raceIcons.add(icon);

			}

			//Hi @Jake I really, really don't understand how groups work, so here is this steaming pile of garbo
			if (suggestionsLength < 3) {
				horizontalIconSpacing = 200;
				verticalToolTipSpacing = 285;
			}
			else {
				horizontalIconSpacing = 150;
				verticalToolTipSpacing = 303;
			} 

			//align row/col of each icon and position the icons
			iconsPerRow = 2;
			if (raceIcons.length == 2 && suggestionsLength == 3)
				iconsPerRow = 1; 
			raceIcons.align(iconsPerRow, -1, horizontalIconSpacing, 210);
			//game.world.width - xPosition because otherwise the toolTips will overlap strangely (basically reverse everything)
			raceIcons.centerX  = game.world.width - xPosition; 
			raceIcons.centerY = verticalSpacing + raceIcons.height/2 + raceStatText.height / 2;
			
			//add tooltip
			//must be added AFTER align because otherwise the tooltip's text appears in wrong position
			raceIcons.children.forEach(function(icon) {
			    var qMark = new QuestionMark(icon.worldPosition.x-70, icon.worldPosition.y+verticalToolTipSpacing,'questionMark', 
				RACE_DESCRIPTIONS[icon.race], game);
				game.add.existing(qMark);
			}, this);
			//when an icon is clicked, send to next scene and save race
		}
	},
}